import path from "path";
import fs from "fs";
import protobuf from "protobufjs";

import {BidAsk, BidAskCollection} from "./bid_ask";

const PROTO_PATH = fs.existsSync(path.join(__dirname, "proto", "askbid.proto")) 
  ? path.join(__dirname, "proto", "askbid.proto")
  : path.join(__dirname, "askbid.proto")
const PROTO_TYPE_BID_ASK = "bidask_package.BidAsk";
const PROTO_TYPE_COLLECTION = "bidask_package.Collection";

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

export function makeSlice(rate: any): BidAsk {
  const id = `${rate.toTicker}/${rate.fromTicker}`;
  return {id, bid: rate.bid, ask: rate.ask, markup: rate.markup, datetime: rate.date};
}

export async function serializeToBase64(rate: any): Promise<string> {
  const buff = await serialize(makeSlice(rate));
  return generateBase64String(buff);
}

export async function serializeArrayToBase64(rates: any[]): Promise<string> {
  const data = rates.map(r => makeSlice(r));
  const wrapper = {objects: data};
  const buff = await serializeArray(wrapper);
  return generateBase64String(buff);
}

function generateBase64String(buff_data: any): string {
  return buff_data.toString("base64");
}
