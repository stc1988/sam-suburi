import {
  putItem,
  deleteItem,
  updateTTL,
  queryUserNamesByMaxTTL,
  queryUserNamesByMinTTL
} from "./dynamo.js";

const CLIENT_TABLE_NAME = process.env.CLIENT_TABLE_NAME;

export const lambdaHandler = async (event, context) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const ttl = currentTimestamp + 100 * 60;
  await putItem(CLIENT_TABLE_NAME,
    {
    user_name: "john_doe",
    project_id: "project_123",
    area_id: "area_456",
    ttl: ttl}
   )

  // await deleteItem(CLIENT_TABLE_NAME, "john_doe");

  // const users = await queryUserNamesByPrjIdAndMinTTL(
  //   CLIENT_TABLE_NAME,
  //   "area_456",
  //   currentTimestamp
  // );
  console.log(users);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "hello world",
    }),
  };

  return response;
};
