const axios = require('axios');
const logger = require("@youtoken/logger");

export async function post(serviceUrl: string, sessionId: string, topicId: string, msg: string) {
    logger.info({sessionId, topicId, msg_length: msg.length});

    let url = `${serviceUrl}/publish?topicId=${topicId}`;
    logger.debug({url});

    let composeMsg = `[{"headers":[], "base64Message": "${msg}"}]`;

    await axios.post(
        url, 
        composeMsg, 
        {
            headers: {
              'Authorization': `${sessionId}` 
            }
        })
        .then(resp => {logger.info(resp.status, resp.data)})
        .catch(err => {logger.error(err.status, err.data)});
}