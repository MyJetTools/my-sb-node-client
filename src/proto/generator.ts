import path from "path";

import { prepareDataForSb } from "../rate";

var protobuf = require("protobufjs");

const PROTO_PATH = path.join(__dirname, 'proto', 'askbid.proto');
const PROTO_TYPE = 'bidask_package.Data';

export async function serialize(rate: any): Promise<any> {
    const data = prepareDataForSb(rate);
    
    const root = await protobuf.load(PROTO_PATH);
    return root
        .lookupType(PROTO_TYPE)
        .encode(data)
        .finish();

}

export async function serializeToBase64(rate: any): Promise<any> {
   let buff = await serialize(rate);
   return generateBase64String(buff);
}

export function generateBase64String(buff_data: any): string {
    return buff_data.toString('base64');
}