'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var axios = require('axios');
var protobuf = require("protobufjs");
var SbHttpsClient = /** @class */ (function () {
    function SbHttpsClient(baseUrl, serviceName, topicId) {
        var _this = this;
        this.start = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //this.getSessionId();
                this.generateProtoMessage({ id: "111", bid: 123.45, ask: 248.54, datetime: 123432534534535 }).catch(function (err) { return console.log(err); });
                return [2 /*return*/];
            });
        }); };
        this.startPingTimer = function () {
            setInterval(function () { return _this.sendPing(); }, 1000);
        };
        this.baseUrl = baseUrl;
        this.serviceName = serviceName;
        this.topicId = topicId;
        this.sessionId = "";
    }
    SbHttpsClient.prototype.getSessionId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.baseUrl, "/greeting?name=").concat(this.serviceName, "&version=node-1.0.0");
                        return [4 /*yield*/, axios.post(url)];
                    case 1:
                        result = _a.sent();
                        console.log(result.data);
                        this.sessionId = result.data.session;
                        return [2 /*return*/];
                }
            });
        });
    };
    SbHttpsClient.prototype.generateProtoMessage = function (rate) {
        return __awaiter(this, void 0, void 0, function () {
            var root, data, buff, buff_as_base64;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protobuf.load('./src/protos/askbid.proto')];
                    case 1:
                        root = _a.sent();
                        data = root.lookupType('bidask_package.Data');
                        buff = Buffer.from(data.encode(rate).finish());
                        buff_as_base64 = buff.toString('base64');
                        console.log(buff);
                        console.log(buff_as_base64);
                        console.log(Buffer.from(buff_as_base64, 'base64'));
                        return [2 /*return*/];
                }
            });
        });
    };
    SbHttpsClient.prototype.sendPing = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return SbHttpsClient;
}());

var client = new SbHttpsClient("http://127.0.0.1:6123", "local-test", "test_topic");
client.start();
