// handler module scaffolding
const handler = {};
const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");
const { parseJSON } = require("../../helpers/utilities");
// const {queryStringObject} = require('../../helpers/handleReqRes')

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
  const phone =
  typeof requestProperties.queryStringObject.phone === 'string' &&
  requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;
  if (phone) {
    // search for user
    data.read('users', phone, (err, u) => {
      const user = { ...parseJSON(u) };
      if (!err && user) {
        delete user.password;
        callback(200, user);
      }else {
        callback(404, { error: "User not found" });
      }
    });
  } else {
    callback(404, { error: "User not found" });
  }
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
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean" &&
    requestProperties.body.tosAgreement
      ? requestProperties.body.tosAgreement
      : false;

  if (firstName && lastName && password && phone && tosAgreement) {
    // making sure that user doesnt already exists
    data.read("users", phone, (err1) => {
      if (err1) {
        const userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosAgreement,
        };
        // store the user to db
        data.create("users", phone, userObject, (err2) => {
          if (!err2) {
            callback(200, {
              message: "User created successfully",
            });
          } else {
            callback(500, {
              error: "Could not create user!",
            });
          }
        });
      } else {
        callback(400, {
          error: "You have a problem in your request",
        });
      }
    });
  }
};
// put Method
handler._user.put = (requestProperties, callback) => {
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
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  if(phone){
    if(firstName || lastName || password){
      data.read('users', phone, (err, uData) =>{
        const userData = {...parseJSON(uData)}
        if(!err && userData){
          if(firstName){
            userData.firstName = firstName;
          }
          if(lastName){
            userData.lastName = lastName;
          }
          if(password){
            userData.password = hash(password);
          }
          data.update('users', phone, userData, (err) =>{
            if(!err){
              callback(200, {
                message: 'User updated successfully'
              })
            }else{
              callback(500, {
                error:'There was problem in the server side'
              })
            }
          })
        }
      })
    }else{
      callback(400, {
        error: 'Invalid phone number'
      })
    }
  }else{
    callback(400, {
      error: 'You have a problem in your request'
    })
  }
};
// delete Method
handler._user.delete = (requestProperties, callback) => {
  const phone =
  typeof requestProperties.queryStringObject.phone === 'string' &&
  requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;
  if (phone) {
    // search for user
    data.read('users', phone, (err, userData) => {
      if(!err && userData){
        data.delete('users',  phone, (err) =>{
          if(!err){
            callback(200, {
              'message':'User deleted successfully'
            })
          }else{
            callback(500, { error: "Server side error" });
          }
        })
      }
    });
  } else {
    callback(500, { error: "Server side error" });
  }
};

module.exports = handler;
