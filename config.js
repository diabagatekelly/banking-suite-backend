/** Shared config for application; can be req'd many places. */
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "test";

const PORT = +process.env.PORT || 3000;

// database is:
//
// - on Heroku, get from env var DATABASE_URL
// - in testing, 'jobly-test'
// - else: 'jobly'

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "banking-test";
} else {
  DB_URI = process.env.DATABASE_URL || "banking";
}

let eBayConfig = {
  "PRODUCTION": {
      "clientId": "DazzleBe-1de2-4d9f-a9a3-384f7d8b954d",
      "clientSecret": "18729826-2add-4cb0-bed0-94ae5ae6c8d9",
      "devid": "2f104d04-6217-441b-bceb-93cd1f3d7c84",
      "redirectUri": "",
      "baseUrl": "api.sandbox.ebay.com" 
  },
  "SANDBOX": {
      "clientId": "DazzleBe-1093-4e35-a783-9d23825d841c",
      "clientSecret": "80ce4032-6e58-4b68-b772-bb3ab60fed50",
      "devid": "2f104d04-6217-441b-bceb-93cd1f3d7c84",
      "redirectUri": "",
      "baseUrl": "api.ebay.com"
  }
}

module.exports = {
  SECRET_KEY,
  PORT,
  DB_URI,
  eBayConfig
};
