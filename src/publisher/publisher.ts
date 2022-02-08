const axios = require('axios');

export async function post(serviceUrl: string, sessionId: string, topicId: string, msg: string) {
    console.log('publish...');
    console.log({sessionId, topicId, msg});

    let url = `${serviceUrl}/publish?topicId=${topicId}`;

    let composeMsg = `[{"headers":[], "base64Message": "${msg}"}]`;

    await axios.post(
        url, 
        composeMsg, 
        {
            headers: {
              'Authorization': `${sessionId}` 
            }
        })
        .then(resp => {console.log(resp.status, resp.data)})
        .catch(err => {console.log(err.status, err.data)});
}