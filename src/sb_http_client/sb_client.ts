import { Console } from "console";

const axios = require('axios');


export class SbHttpsClient {
    baseUrl: string;
    serviceName: string;
    sessionId: string;

    constructor(baseUrl: string, serviceName: string){
        this.baseUrl = baseUrl;
        this.serviceName = serviceName;
    }

    public start = async () => {
        let url = `${this.baseUrl}/greeting?name=${this.serviceName}&version=node-1.0.0`;
        let result = await axios.post(url);
        console.log(result.data);
        this.sessionId = result.data.session;
        this.startPingTimer();
    }

    public startPingTimer = () => {
        setInterval(() => this.sendPing(), 1000)
    }


    public async sendPing(){
        let url = `${this.baseUrl}/greeting/ping`;
        // let formData = new FormData();
        // formData.append("sessionId", this.sessionId);
        let result = await axios.post(
            url, 
            {}, 
            {
                headers: {
                  'Authorization': `${this.sessionId}` 
                }
            });
        return result.data;
    }

}

