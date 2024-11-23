import {
  IoTDataPlaneClient,
  PublishCommand,
} from "@aws-sdk/client-iot-data-plane";

const iotEndpoint = process.env.MQTT_ENDPOINT;
const client = new IoTDataPlaneClient({ endpoint: `https://${iotEndpoint}` });

export const lambdaHandler = async (event, context) => {
  const topic = event.path.slice(1); //先頭の/は不要
  const payload = event.body;

  const params = {
    topic,
    payload: payload,
    qos: 0,
  };

  try {
    const command = new PublishCommand(params);
    await client.send(command);
    console.log(`Message published to topic "${topic}" successfully.`);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Message sent successfully" }),
    };
  } catch (error) {
    console.error("Error publishing message:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send message" }),
    };
  }
};
