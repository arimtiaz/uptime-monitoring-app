// handler module scaffolding
const handler = {};
const { hash, createRandomString } = require("../../helpers/utilities");
const { parseJSON } = require("../../helpers/utilities");

handler.tokenHandler = (requestProperties, callback) => {
  const acceptedMethod = ["get", "put", "post", "delete"];

  if (acceptedMethod.indexOf(requestProperties.method) > -1) {
    handler._token[requestProperties.method](requestProperties, callback);
    const phone =
      typeof requestProperties.body.phone === "string" &&
      requestProperties.body.phone.trim().length === 11
        ? requestProperties.body.phone
        : false;

    const password =
      typeof requestProperties.body.password === "string" &&
      requestProperties.body.password.trim().length > 0
        ? requestProperties.body.password
        : false;
    if (phone && password) {
      data.read("users", phone, (err1, userData) => {
        let hashedPassword = hash(password);
        if (hashedPassword === parseJSON(userData).password) {
          let tokenId = createRandomString(20);
          let expires = Data.now() + 60 * 60 * 100;
          let tokenObject = {
            phone,
            id: tokenId,
            expires,
          };

          data.create("tokens", tokenId, tokenObject, (err2) => {
            if (!err2) {
              callback(200, tokenObject);
            } else {
              callback(500, {
                error: "There was a problem on the server side",
              });
            }
          });
        } else {
          callback(400, {
            error: "Wrong password",
          });
        }
      });
    } else {
      callback(400, {
        error: "You have a problem in your request",
      });
    }
  } else {
    callback(405);
  }
};

// user module scaffolding
handler._token = {};

// get Method
handler._token.get = (requestProperties, callback) => {};
// post Method
handler._token.post = (requestProperties, callback) => {};
// put Method
handler._token.put = (requestProperties, callback) => {};

module.exports = handler;
