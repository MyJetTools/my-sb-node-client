const axios = require('axios');

import {serializeToBase64} from '../proto';
import {post} from '../publisher';

export class SbHttpsClient {
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
        // check if session id exists and not stale 
        // ping and try to get new session id 
        await this.sendPing(true);

        // prepare message to send to SB
        let msg = await serializeToBase64(data).catch(err => console.log(err));
        console.log(msg);

        // publish the message to SB
        await post(this.baseUrl, this.sessionId, this.topicId, msg);
    }

    public startPing = async () => { 
        await this.getNewSessionId();
        this.startPingTimer();        
    }

    public startPingTimer = () => {
        setInterval(() => this.sendPing(false), 10000)
    }

    public async sendPing(needRetriveSessionIdOnFail: boolean){
        let url = `${this.baseUrl}/greeting/ping`;

        await axios.post(
            url, 
            {}, 
            {
                headers: {
                  'Authorization': `${this.sessionId}` 
                }
            })
            .catch(async err => {
                console.log(err.response.status, err.response.data);

                if (err.response.status === 401 && needRetriveSessionIdOnFail)
                {
                    console.log(`TRY TO AUTO FIX! Get new session...`);
                    await this.getNewSessionId();
                }
        
            });
    }
}

