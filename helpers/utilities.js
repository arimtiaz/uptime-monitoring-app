// dependencies
const crypto = require(crypto);
const environments = require("../helpers/environments");

// module scaffolding
const utilities = {};

// parse JSON string to Object

utilities.parseJSON = (jsonString) => {
  let output;

  try {
    output = JSON.parse(jsonString);
  } catch {
    output = {};
  }

  return output;
};

utilities.hashPassword = (str) => {
  if (typeof str === "string" && str.length > 0) {
    const hash = crypto
      .createHmac("sha256", environments[process.env.NODE_ENV].secretKey)
      .update(str)
      .digest("hex");
    return hash;
  } else{
    return false;
  }
};

module.exports = utilities;
