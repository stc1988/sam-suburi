

const SECRET_PARAM_NAME = process.env.SECRET_PARAM_NAME;
const CLIENT_ID_PARAM_NAME = process.env.CLIENT_ID_PARAM_NAME;
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
