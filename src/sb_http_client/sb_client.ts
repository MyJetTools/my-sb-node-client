import axios from "axios";
import logger from "@youtoken/logger";

import {serializeToBase64, serializeArrayToBase64} from "../proto";
import {post} from "../publisher";

export default class SbHttpClient {
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
        const url = `${this.baseUrl}/greeting`;
        
        const result = await axios.post(
            url, null, 
            {params: 
                { 
                    name: this.serviceName,
                    version: "node-1.0.0"  
                }
            });
        logger.info(`New SessionId is ${result.data}`);

        this.sessionId = result.data.session;
    }

    public async publishMessage(data: any) {
        if (!await this._pingAndRetrieveSession())
            return;

        const msg = await serializeToBase64(data).catch(err => logger.error(err));
        await this._publish(msg);
    }

    public async publishArrayMessages(data: any[]) {
        if (!this._pingAndRetrieveSession())
            return;

        const msg = await serializeArrayToBase64(data).catch(err => logger.error(err));
        await this._publish(msg);
    }

    private async _pingAndRetrieveSession(): Promise<boolean> {
        // check if session id exists and not stale 
        // ping and try to get new session id 
        const ping_ok = await this.sendPing(true);

        // no ok connection
        if (!ping_ok)
        {
            logger.error("Cannot get Session ID from the server!");
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
        const url = `${this.baseUrl}/greeting/ping`;
        logger.debug(`Ping a service bus instance: ${url}`);

        let result = true;
        await axios.post(
            url, 
            {}, 
            {
                headers: {
                  "Authorization": `${this.sessionId}` 
                }
            })
            .catch(async (err) => {
                if (typeof err.response === "undefined")
                {
                    // something unexpected
                    err.message = `Unexpected error occured when connecting to a service bus: ${err.message}`;
                    logger.error(err);

                    result = false;
                    return;
                }

                if (err.response.status === 401 && needRetriveSessionIdOnFail)
                {
                    logger.info("Session ID is not setup. Try to get new session ID.");
                    await this.getNewSessionId();

                    result = true;
                    return;
                }
        
                // another type of error
                err.message = `Unexpected error occured when connecting to a service bus: ${err.message}`;
                logger.warn(err.message, `${err.response.status}, ${err.response.data}`);

                result = false;
            });

        return result;
    }
}