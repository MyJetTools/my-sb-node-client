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

    public start = async () => {
        
        // get session id first
        await this.getSessionId();

        // generate data to publish 
        let data = {id: "111", bid: 123.45, ask: 248.54, datetime: Date.now()};
        let msg = await serializeToBase64(data).catch(err => console.log(err));
        
        console.log(msg);

        // publish
        await post(this.baseUrl, this.sessionId, this.topicId, msg);

        //this.startPingTimer();
    }

    public startPingTimer = () => {
        setInterval(() => this.sendPing(), 1000)
    }

    public async getSessionId() {
        let url = `${this.baseUrl}/greeting?name=${this.serviceName}&version=node-1.0.0`;
        
        let result = await axios.post(url);
        console.log(result.data);

        this.sessionId = result.data.session;
    }

    public async sendPing(){
        // let url = `${this.baseUrl}/greeting/ping`;
        // let formData = new FormData();
        // formData.append("sessionId", this.sessionId);
        // let result = await axios.post(
        //     url, 
        //     {}, 
        //     {
        //         headers: {
        //           'Authorization': `${this.sessionId}` 
        //         }
        //     });
        // return result.data;
    }
}

