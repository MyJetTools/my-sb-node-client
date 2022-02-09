import path from "path";
import {BidAsk} from "../proto";

var protobuf = require("protobufjs");

const PROTO_PATH = path.join(__dirname, 'proto', 'askbid.proto');
const PROTO_TYPE = 'bidask_package.Data';

export async function serialize(rate: BidAsk): Promise<any> {
    const root = await protobuf.load(PROTO_PATH);
    return root
        .lookupType(PROTO_TYPE)
        .encode(rate)
        .finish();
}

export async function serializeToBase64(rate: any): Promise<any> {
   let buff = await serialize(rate);
   return generateBase64String(buff);
}

export function generateBase64String(buff_data: any): string {
    return buff_data.toString('base64');
}