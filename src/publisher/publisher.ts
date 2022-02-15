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

  await axios.post(
    url,
    [
      {
        headers: [], 
        base64Message: msg
      }
    ],
    {
      headers: {
        authorization: sessionId
      }
    }
  )
    .then(resp => logger.info(`Successfuly sent data to Service Bus : ${resp.data}`))
    .catch((err) => {
      err.message = `Error when POST message to Service Bus: ${err.message}`;
      logger.error(err);
    });
}
