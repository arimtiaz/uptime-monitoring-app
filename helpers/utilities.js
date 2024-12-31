// dependencies
const crypto = require("crypto");
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

utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    const hash = crypto
      .createHmac("sha256", environments.secretKey)
      .update(str)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

utilities.createRandomString = (strlen) => {
  let length = strlen;
  length = typeof strlen === "number" && strlen > 0 ? strlen : false;

  if (length) {
    const possibleCharacters = "abcdefghijklmnopqrstuvwxyz1234567890";
    const output = "";
    for (let i = 1; i <= length; i += 1) {
      const randomCharacters = possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );
      output += randomCharacters;
    }
    return output;
  }
  return false
};

module.exports = utilities;
