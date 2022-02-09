export interface BidAsk {
    id: string, 
    bid: number,
    ask: number,
    markup: number,
    date: number
}

export interface BidAskCollection {
    objects: BidAsk[]
}