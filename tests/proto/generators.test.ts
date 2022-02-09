import {serializeToBase64, serializeArrayToBase64} from '../../src/proto/generator';
import { expect } from 'chai';

describe('Protobuf Generators', () => {
    
    it('can serialize to base64 string', async () => {
        let rate = {id: "111", bid: 123.45, ask: 248.54, datetime: new Date(2022, 2, 1)};
        let msg = await serializeToBase64(rate);
        expect(msg).to.equal("CgMxMTERzczMzMzcXkAZ4XoUrkcRb0AgAA==");
    });

    it('can serialize an array to base64 string', async () => {
        let rate = [{id: "111", bid: 123.45, ask: 248.54, datetime: new Date(2022, 2, 1)}];
        let msg = await serializeArrayToBase64(rate);
        expect(msg).to.equal("ChkKAzExMRHNzMzMzNxeQBnhehSuRxFvQCAA");
    });

})