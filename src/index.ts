import { SbHttpsClient } from "./sb_http_client/sb_client";

let client = new SbHttpsClient("http://127.0.0.1:6123", "local-test", "bid-ask");

let data = {id: "111", bid: 123.45, ask: 248.54, datetime: Date.now()};
client.publishMessage(data);

//client.startPing();