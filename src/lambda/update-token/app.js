import {
  getParamterFromSSM,
  getParamtersFromSSM,
  putParamterFromSSM,
} from "./ssm.js";

const SECRET_PARAM_NAME = process.env.SECRET_PARAM_NAME;
const CLIENT_ID_PARAM_NAME = process.env.CLIENT_ID_PARAM_NAME;
const TOKEN_PARAM_NAME = process.env.TOKEN_PARAM_NAME;

export const lambdaHandler = async (event, context) => {
  // const values = await getParamtersFromSSM(
  //   [SECRET_PARAM_NAME, CLIENT_ID_PARAM_NAME],
  //   true
  // );

  // console.log(values[SECRET_PARAM_NAME], values[CLIENT_ID_PARAM_NAME]);

  // await putParamterFromSSM(TOKEN_PARAM_NAME, "12345", "String", true);

  const res = await fetch("https://httpbin.org/get");
  const json = await res.json()
  console.log(json)


  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "hello world",
    }),
  };

  return response;
};
