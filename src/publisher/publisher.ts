import axios from "axios";
import logger from "@youtoken/logger";

export async function post(serviceUrl: string, sessionId: string, topicId: string, msg: string) {
  logger.info("Publishing message to service bus...", {
    sessionId,
    topicId,
    msg_length: msg.length
  });

  const url = `${serviceUrl}/publish?topicId=${topicId}`;
  logger.debug(`Used url for posting a message: ${url}`);

  const composeMsg = JSON.stringify([{headers: [], base64Message: `${msg}`}]);

  await axios.post(
    url,
    composeMsg,
    {
      headers: {
        authorization: sessionId
      }
    }
  )
    .then(resp => logger.info(resp.status, resp.data))
    .catch(err => logger.error(err.status, err.data));
}
