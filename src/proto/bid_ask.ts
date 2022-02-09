export interface BidAsk {
    id: string, 
    bid: number,
    ask: number,
    markup: number,
    datetime: number
}

export interface BidAskCollection {
    objects: BidAsk[]
}