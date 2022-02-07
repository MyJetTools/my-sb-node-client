"use strict";
exports.__esModule = true;
var sb_client_1 = require("./sb_http_client/sb_client");
var client = new sb_client_1.SbHttpsClient("http://127.0.0.1:6123", "local-test");
client.start();
