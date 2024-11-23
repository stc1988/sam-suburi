import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

export async function putItem(tableName, item) {
  const params = {
    TableName: tableName,
    Item: item,
  };
  const result = await client.send(new PutCommand(params));
}

export async function deleteItem(tableName, userName) {
  const params = {
    TableName: tableName,
    Key: { user_name: userName },
  };
  const result = await client.send(new DeleteCommand(params));
}

// TTLが一定以上(アクティブ)なアイテム(user_name, project_id)を抽出
export async function queryUserNamesByMinTTL(tableName, areaId, minTTL) {
  const params = {
    TableName: tableName,
    IndexName: "TtlIndex",
    KeyConditionExpression: "area_id = :areaId AND #ttl >= :minTTL",
    ExpressionAttributeNames: {
      "#ttl": "ttl",
    },
    ExpressionAttributeValues: {
      ":areaId": areaId,
      ":minTTL": minTTL,
    },
    ProjectionExpression: "user_name, project_id",
  };

  const result = await client.send(new QueryCommand(params));
  console.log(result.Items)
  // return result.Items.map((item) => item.user_name);
}

// TTLが一定以下(悲アクティブ)なアイテムのuser_nameを抽出
export async function queryUserNamesByMaxTTL(tableName, areaId, maxTTL) {
  const params = {
    TableName: tableName,
    IndexName: "TtlIndex",
    KeyConditionExpression: "area_id = :areaId AND #ttl <= :maxTTL",
    ExpressionAttributeNames: {
      "#ttl": "ttl",
    },
    ExpressionAttributeValues: {
      ":areaId": areaId,
      ":maxTTL": maxTTL,
    },
    ProjectionExpression: "user_name",
  };

  const result = await client.send(new QueryCommand(params));
  return result.Items.map((item) => item.user_name);
}

// 1WCU未満のレコードサイズのため毎回putすればよいので不要
export async function updateTTL(tableName, userName, newTTL) {
  const params = {
    TableName: tableName,
    Key: { user_name: userName },
    UpdateExpression: "SET ttl = :newTTL",
    ExpressionAttributeValues: {
      ":newTTL": newTTL,
    },
  };

  const result = await client.send(new UpdateCommand(params));
}
