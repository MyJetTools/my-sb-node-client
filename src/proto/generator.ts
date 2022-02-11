import path from "path";
import {BidAsk, BidAskCollection} from "../proto";

import protobuf from "protobufjs";

const PROTO_PATH = path.join(__dirname, "proto", "askbid.proto");
const PROTO_TYPE_BID_ASK = "bidask_package.BidAsk";
const PROTO_TYPE_COLLECTION = "bidask_package.Collection";

export async function serializeToBase64(rate: any): Promise<any> {
    const buff = await serialize(makeSlice(rate));
    return generateBase64String(buff);
}
 
export async function serializeArrayToBase64(rates: any[]): Promise<any> {
    const data = rates.map(r => makeSlice(r)) 
    const wrapper = {objects: data}; 
    const buff = await serializeArray(wrapper);
    return generateBase64String(buff);
}
 
export async function serialize(rate: BidAsk): Promise<any> {
    const root = await protobuf.load(PROTO_PATH);
    return root
        .lookupType(PROTO_TYPE_BID_ASK)
        .encode(rate)
        .finish();
}

export async function serializeArray(rates: BidAskCollection): Promise<any> {
    const root = await protobuf.load(PROTO_PATH);
    return root
        .lookupType(PROTO_TYPE_COLLECTION)
        .encode(rates)
        .finish();
}

function generateBase64String(buff_data: any): string {
    return buff_data.toString("base64");
}

export function makeSlice(rate: any): BidAsk {
    const id = `${rate.toTicker}/${rate.fromTicker}`;
    return {id: id, bid: rate.bid, ask: rate.ask, markup: rate.markup, datetime: rate.date};
}