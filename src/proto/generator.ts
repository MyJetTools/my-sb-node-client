import path from "path";
import {BidAsk, BidAskCollection} from "../proto";

var protobuf = require("protobufjs");

const PROTO_PATH = path.join(__dirname, 'askbid.proto');
const PROTO_TYPE_BID_ASK = 'bidask_package.BidAsk';
const PROTO_TYPE_COLLECTION = 'bidask_package.Collection';

export async function serializeToBase64(rate: any): Promise<any> {
    let buff = await serialize(makeSlice(rate));
    return generateBase64String(buff);
}
 
export async function serializeArrayToBase64(rates: any[]): Promise<any> {
    let data = rates.map(r => makeSlice(r)) 
    let wrapper = { objects: data}; 
    let buff = await serializeArray(wrapper);
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
    return buff_data.toString('base64');
}

export function makeSlice(rate: any): BidAsk {
    let id: string = `${rate.toTicker}/${rate.fromTicker}`;
    return {id: id, bid: rate.bid, ask: rate.ask, markup: rate.markup, datetime: rate.date};
}