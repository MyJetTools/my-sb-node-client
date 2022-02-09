import {serializeToBase64} from '../../src/proto/generator';
import { expect } from 'chai';

describe('Protobuf Generators', () => {
    it('can serialize to base64 string', () => {
        let rate = {id: "111", bid: 123.45, ask: 248.54, datetime: Date.now()};
        let msg = serializeToBase64(rate);
        expect(msg).to.equal("sdfsf");
    });
})