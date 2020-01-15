const { config } = require('dotenv');

function loadEnv(nodeENV) {
  const isDevelopment = nodeENV !== 'production';

  if (isDevelopment) {
    nodeENV = 'development';
    config({
      path: require.resolve('../.env.dev')
    });
  } else {
    nodeENV = 'production';
    config({
      path: require.resolve('../.env.prod')
    });
  }

  const raw = Object.keys(process.env)
    .filter(key => {
      return /^ELECTRON_TB_/i.test(key);
    })
    .reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {
      NODE_ENV: nodeENV
    });
  const stringified = {
    'process.env': Object.keys(raw)
      .reduce((env, key) => {
        env[key] = JSON.stringify(raw[key]);
        return env;
      }, {})
  }
  return { raw, stringified }
}

let env;
module.exports = function(nodeENV) {
  if (env && nodeENV) {
    if (env.raw.NODE_ENV !== nodeENV) {
      throw new Error(`env has already loaded with NODE_ENV: ${env.raw.NODE_ENV}`);
    }
    return env;
  } else if (env && !nodeENV) {
    return env;
  } else {
    return env = loadEnv(nodeENV);
  }
};
