import {
  SSMClient,
  GetParameterCommand,
  GetParametersCommand,
  PutParameterCommand,
} from "@aws-sdk/client-ssm";

const ssmClient = new SSMClient({ region: process.env.AWS_REGION });

// nameに対応するパラメータが無いと例外
export async function getParamterFromSSM(name, withDecryption) {
  const command = new GetParameterCommand({
    Name: name,
    withDecryption: withDecryption,
  });

  const reponse = await ssmClient.send(command);

  return reponse.Parameter.Value;
}

export async function getParamtersFromSSM(parameterNames, withDecryption) {
  const command = new GetParametersCommand({
    Names: parameterNames,
    WithDecryption: withDecryption,
  });

  const reponse = await ssmClient.send(command);
  return reponse.Parameters.reduce((acc, param) => {
    acc[param.Name] = param.Value;
    return acc;
  }, {});
}

export async function putParamterFromSSM(name, value, type, overWrite) {
  const command = new PutParameterCommand({
    Name: name,
    Value: value,
    Type: type,
    Overwrite: overWrite,
  });

  await ssmClient.send(command);
}
