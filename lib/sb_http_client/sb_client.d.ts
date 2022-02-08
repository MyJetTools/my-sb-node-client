export declare class SbHttpsClient {
    baseUrl: string;
    serviceName: string;
    topicId: string;
    sessionId: string;
    constructor(baseUrl: string, serviceName: string, topicId: string);
    start: () => Promise<void>;
    startPingTimer: () => void;
    getSessionId(): Promise<void>;
    generateProtoMessage(rate: any): Promise<void>;
    sendPing(): Promise<void>;
}
