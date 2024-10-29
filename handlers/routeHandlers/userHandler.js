// handler module scaffolding
const handler = {};
const data = require('../../lib/data')
const {hash} = require('../../helpers/utilities')
handler.userHandler = (requestProperties, callback) => {
  const acceptedMethod = ["get", "put", "post", "delete"];

  if (acceptedMethod.indexOf(requestProperties.method) > -1) {
    handler._user[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

// user module scaffolding
handler._user = {};

// get Method
handler._user.get = (requestProperties, callback) => {
  callback(200);
};
// post Method
handler._user.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.lastName.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean" &&
    requestProperties.body.tosAgreement.trim().length > 0
      ? requestProperties.body.tosAgreement
      : false;

 if(firstName && lastName && phone && tosAgreement){
    // make sure user doesn't already exists
    data.read('users', phone, (err, user) =>{
        if(err){
            let userObject = {
                firstName,
                lastName,
                phone,
                password:hash(password),
                tosAgreement,
            }

            // store the user to db
        }else{
            callback(500,{
                error: 'There was a problem in server side!',
            })
        }
    })

 } else{
    callback(400, {

    })
 }
};
// put Method
handler._user.put = (requestProperties, callback) => {};
// delete Method
handler._user.delete = (requestProperties, callback) => {};

module.exports = handler;
