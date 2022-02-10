import SbHttpClient from "./sb_http_client/sb_client";


export default SbHttpClient;

void async function main() {
    let client = new SbHttpClient("http://127.0.0.1:6123", "local-test", "raw-bid-ask");

    let data = [{id: "111", bid: 123.45, ask: 248.54, datetime: Date.now()}];
    console.log("publish a message ... ");
    await client.publishMessage(data[0]);

    console.log("publish an array of messages ... ");
    await client.publishArrayMessages(data);

    //client.startPing();
}()

