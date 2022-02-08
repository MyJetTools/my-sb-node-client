const axios = require('axios');
var protobuf = require("protobufjs");

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
        //this.getSessionId();

        this.generateProtoMessage({id: "111", bid: 123.45, ask: 248.54, datetime: 123432534534535}).catch(err => console.log(err));

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

    public async generateProtoMessage(rate: any) {
        const root = await protobuf.load('./src/protos/askbid.proto');
        const data = root.lookupType('bidask_package.Data');
        const buff = Buffer.from(data.encode(rate).finish());
        const buff_as_base64 = buff.toString('base64');

        console.log(buff);
        console.log(buff_as_base64);
        console.log(Buffer.from(buff_as_base64, 'base64'));
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

