import {
  getParamterFromSSM
} from "./ssm.js";

const TOKEN_PARAM_NAME = process.env.TOKEN_PARAM_NAME;

export const lambdaHandler = async (event, context) => {

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "hello world",
    }),
  };

  return response;
};
