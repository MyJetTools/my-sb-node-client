import axios from "axios";
import logger from "@youtoken/logger";

import {serializeToBase64, serializeArrayToBase64} from "./proto";
import {post} from "./publisher";

export default class SbHttpClient {
  baseUrl: string;

  serviceName: string;

  topicId: string;

  sessionId: string;

  constructor(baseUrl: string, serviceName: string, topicId: string) {
    this.baseUrl = baseUrl;
    this.serviceName = serviceName;
    this.topicId = topicId;
    this.sessionId = "";
  }

  public async getNewSessionId() {
    const url = `${this.baseUrl}/greeting`;

    const result = await axios.post(
      url,
      null,
      {params:
                {
                  name: this.serviceName,
                  version: "node-1.0.0"
                }
      }
    );
    logger.info(`New SessionId is ${result.data}`);

    this.sessionId = result.data.session;
  }

  public async publishMessage(data: any) {
    if (!await this._pingAndRetrieveSession()) { return; }

    await serializeToBase64(data)
      .then(msg => this._publish(msg))
      .catch((err) => {
        err.message = `Service Bus client serialization generates an error: ${err.message}`;
        logger.error(err);
      });
  }

  public async publishArrayMessages(data: any[]) {
    if (!await this._pingAndRetrieveSession()) { return; }

    await serializeArrayToBase64(data)
    .then(msg => this._publish(msg))
    .catch((err) => {
      err.message = `Service Bus client serialization generates an error: ${err.message}`;
      logger.error(err);
    });
  }

  private async _pingAndRetrieveSession(): Promise<boolean> {
    // check if session id exists and not stale
    // ping and try to get new session id
    const pingOk = await this.sendPing(true);

    // no ok connection
    if (!pingOk) {
      logger.error("Cannot get Session ID from the server!");
      return false;
    }

    return true;
  }

  private async _publish(msg: string) {
    if (!msg) {
      logger.warn("Message serialized as empty string for Service Bus client to publish. Nothing to send.");
      return;
    }

    await post(this.baseUrl, this.sessionId, this.topicId, msg);
  }

  public async sendPing(needRetriveSessionIdOnFail: boolean): Promise<boolean> {
    const url = `${this.baseUrl}/greeting/ping`;
    logger.debug(`Ping a service bus instance: ${url}`);

    let result = true;
    await axios.post(
      url,
      {},
      {
        headers: {
          authorization: this.sessionId
        }
      }
    )
      .catch(async (err) => {
        if (typeof err.response === "undefined") {
          // something unexpected
          err.message = `Unexpected error occured when connecting to a service bus: ${err.message}`;
          logger.error(err);

          result = false;
          return;
        }

        if (err.response.status === 401 && needRetriveSessionIdOnFail) {
          logger.info("Session ID is not setup. Try to get new session ID.");
          await this.getNewSessionId();

          result = true;
          return;
        }

        // another type of error
        err.message = `Not possible to fix connection to Service Bus: ${err.message}`;
        logger.error(err);

        result = false;
      });

    return result;
  }
}
