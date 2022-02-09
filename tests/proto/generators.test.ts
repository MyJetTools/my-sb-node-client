import { serializeToBase64, serializeArrayToBase64, makeSlice } from '../../src/proto/generator';
import { expect, assert } from 'chai';
import { Ticker } from '@youtoken/types';
import { BidAsk } from '../../src/proto';

describe('Protobuf Generators', () => {
    
    it('can serialize to base64 string', async () => {
        let rate = {id: "111", bid: 123.45, ask: 248.54, datetime: new Date(2022, 2, 1)};
        let msg = await serializeToBase64(rate);
        expect(msg).to.equal("ChN1bmRlZmluZWQvdW5kZWZpbmVkEc3MzMzM3F5AGeF6FK5HEW9A");
    });

    it('can serialize an array to base64 string', async () => {
        let rate = [{id: "111", bid: 123.45, ask: 248.54, datetime: new Date(2022, 2, 1)}];
        let msg = await serializeArrayToBase64(rate);
        expect(msg).to.equal("CicKE3VuZGVmaW5lZC91bmRlZmluZWQRzczMzMzcXkAZ4XoUrkcRb0A=");
    });

    it('should prepare data before serialization', async () => {
        let data = {toTicker: Ticker.Fiat.AUD, fromTicker: Ticker.Fiat.USD, bid: 123.45, ask: 248.54, date: new Date(2022, 1, 1).getTime(), markup: 10};
        let preparedData = makeSlice(data);

        let expected: BidAsk = {id: 'aud/usd', bid: 123.45, ask: 248.54, markup: 10, datetime: 1643662800000};
        
        assert.deepStrictEqual(expected, preparedData);
    });

})