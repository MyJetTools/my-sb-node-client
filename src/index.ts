import { SbHttpsClient } from "./sb_http_client/sb_client";

let client = new SbHttpsClient("http://127.0.0.1:6123", "local-test", "bid-ask");

client.start();