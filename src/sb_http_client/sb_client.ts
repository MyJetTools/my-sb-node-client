const axios = require('axios');

import {serializeToBase64, serializeArrayToBase64} from '../proto';
import {post} from '../publisher';

export class SbHttpClient {
    baseUrl: string;
    serviceName: string;
    topicId: string;
    sessionId: string;

    constructor(baseUrl: string, serviceName: string, topicId: string){
        this.baseUrl = baseUrl;
        this.serviceName = serviceName;
        this.topicId = topicId;
        this.sessionId = "";
    }

    public async getNewSessionId() {
        let url = `${this.baseUrl}/greeting?name=${this.serviceName}&version=node-1.0.0`;
        
        let result = await axios.post(url);
        console.log(result.data);

        this.sessionId = result.data.session;
    }

    public async publishMessage(data: any) {
        if (!await this._pingAndRetrieveSession())
            return;

        let msg = await serializeToBase64(data).catch(err => console.log(err));
        this._publish(msg);
    }

    public async publishArrayMessages(data: any[]) {
        if (!this._pingAndRetrieveSession())
            return;

        let msg = await serializeArrayToBase64(data).catch(err => console.log(err));
        this._publish(msg);
    }

    private async _pingAndRetrieveSession(): Promise<boolean> {
        // check if session id exists and not stale 
        // ping and try to get new session id 
        let ping_ok = await this.sendPing(true);

        // no ok connection
        if (!ping_ok)
        {
            console.log("Cannot get Session ID from the server!");
            return false;
        }

        return true;
    }

    private async _publish(msg: string) {
        await post(this.baseUrl, this.sessionId, this.topicId, msg);
    }
 
    public startPing = async () => { 
        await this.getNewSessionId();
        this.startPingTimer();        
    }

    public startPingTimer = () => {
        setInterval(() => this.sendPing(false), 10000)
    }

    public async sendPing(needRetriveSessionIdOnFail: boolean): Promise<boolean> {
        let url = `${this.baseUrl}/greeting/ping`;

        let result = true;
        await axios.post(
            url, 
            {}, 
            {
                headers: {
                  'Authorization': `${this.sessionId}` 
                }
            })
            .catch(async err => {
                if (typeof err.response === 'undefined')
                {
                    // something unexpected
                    console.log(err);
                    result = false;
                    return;
                }

                console.log(err.response.status, err.response.data);
                if (err.response.status === 401 && needRetriveSessionIdOnFail)
                {
                    console.log(`TRY TO AUTO FIX! Get new session...`);
                    await this.getNewSessionId();

                    result = true;
                    return;
                }
        
                // another type of error
                result = false;
            });

        return result;
    }
}

