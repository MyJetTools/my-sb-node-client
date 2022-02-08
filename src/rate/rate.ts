export function prepareDataForSb(data: any): any {
    let id = data.id;
    let bid = data.bid;
    let ask = data.ask;
    let date = new Date(data.date);

    return { id: id, bid: bid, ask: ask, date: convertDateToUnixFormat(date)};
}

function convertDateToUnixFormat(dt: Date) {
    // UNIX Micro MS
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#get_the_number_of_seconds_since_the_ecmascript_epoch
    return Math.floor(dt.getTime() / 1000); 
}