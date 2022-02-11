const axios = require('axios');
const logger = require("@youtoken/logger");

export async function post(serviceUrl: string, sessionId: string, topicId: string, msg: string) {
    logger.info(`Publishing message to service bus : ${{sessionId, topicId, msg_length: msg.length}}`);

    let url = `${serviceUrl}/publish?topicId=${topicId}`;
    logger.debug(`Used url for posting a message: ${url}`);

    let composeMsg = JSON.stringify([{'headers':[], 'base64Message': `${msg}`}])

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