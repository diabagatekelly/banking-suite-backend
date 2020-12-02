const {eBayConfig} = require("../config");
const qs = require('qs')
const btoa = require('btoa');

class Ebay {
    /** authenticate user with username, password. Returns user or throws err. */
  
    static openEbayAuthWindow() {
        res.redirect('https://auth.ebay.com/oauth2/authorize?client_id=DazzleBe-1de2-4d9f-a9a3-384f7d8b954d&response_type=code&redirect_uri=Dazzle_Beauty_S-DazzleBe-1de2-4-atwsed&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly')
    }

    static async getUserAccessToken(code) {
    console.log(code)

    let tokenHeaders = {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : "Basic " + btoa(`${eBayConfig["PRODUCTION"].clientId}:${eBayConfig["PRODUCTION"].clientSecret}`)
    }

    let tokenBody = qs.stringify({
        "grant_type" : "authorization_code",
        "code" : `${code}`,
        "redirect_uri" : `${eBayConfig["PRODUCTION"].redirectUri}`
    })

    try {
        let data = await axios.post('https://api.ebay.com/identity/v1/oauth2/token', tokenBody, {headers: tokenHeaders} ).then((res) => {
            console.log(res.data.access_token)
            const token = res.data.access_token;

            return token

    })
 } catch(e) {
    console.error(e)
}
}

static async getEbayInventory(token) {
    let ebayURL = "https://api.ebay.com/ws/api.dll";

    let body = `
       <?xml version="1.0" encoding="utf-8"?>
       <GetMyeBaySellingRequest xmlns="urn:ebay:apis:eBLBaseComponents">
         <RequesterCredentials>
           <eBayAuthToken>${token}</eBayAuthToken>
         </RequesterCredentials>
       <ErrorLanguage>en_US</ErrorLanguage>
       <WarningLevel>High</WarningLevel>
       <ActiveList>
         <Include>true</Include>
         <Sort>TitleDescending</Sort>
         <Pagination>
           <EntriesPerPage>200</EntriesPerPage>
           <PageNumber>1</PageNumber>
         </Pagination>
         <DetailLevel>ReturnAll</DetailLevel>
       </ActiveList>
       <SoldList>
        <Include>true</Include>
        <DurationInDays>60</DurationInDays>
        <Pagination>
          <EntriesPerPage>200</EntriesPerPage>
          <PageNumber>1</PageNumber>
        </Pagination>
        <Sort>Title</Sort>
      </SoldList>
      </GetMyeBaySellingRequest>`;
    
      let headers = {
        'X-EBAY-API-COMPATIBILITY-LEVEL': '967',
        'X-EBAY-API-CALL-NAME': 'GetMyeBaySelling',
        'X-EBAY-API-SITEID': '0',
        'Content-Type': 'application/xml'
      }

      try {
      
        let inventory = axios.post(ebayURL, body, {headers: headers}).then((data) => {
            console.log(data.data)
        })
    
        // res.json(inventory)
      
      } catch (error) {
        console.error(error)
      }
}

  
    /** Register user with data. Returns new user data. */
  
    static async register(data) {
      const duplicateCheck = await db.query(
        `SELECT username 
          FROM users 
          WHERE username = $1`,
        [data.username]
      );
  
      if (duplicateCheck.rows[0]) {
        throw new ExpressError(
          `There already exists a user with username '${data.username}`,
          400
        );
      }
  
      const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
  
      const result = await db.query(
        `INSERT INTO users 
            (username, 
              password, 
              first_name, 
              last_name, 
              email, 
              is_admin,
              first_time,
              last_login,
              business,
              banking,
              islamic
              ) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
          RETURNING username, password, first_name, last_name, email, id_admin, first_time, last_login, business, banking, islamic`,
        [
          data.username, 
          data.password, 
          data.first_name, 
          data.last_name, 
          data.email,
          data.is_admin,
          data.first_time,
          data.last_login,
          data.business,
          data.banking,
          data.islamic
        ]
      );
  
      return result.rows[0];
    }
  
  
    /** Update user data with `data`.
     *
     * This is a "partial update" --- it's fine if data doesn't contain
     * all the fields; this only changes provided ones.
     *
     * Return data for changed user.
     *
     */
  
    static async update(username, data) {
      if (data.password) {
        data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
      }
  
      let { query, values } = partialUpdate("users", data, "username", username);
  
      const result = await db.query(query, values);
      const user = result.rows[0];
  
      if (!user) {
        throw new ExpressError(`There exists no user '${username}'`, 404);
      }
  
      delete user.password;
      delete user.is_admin;
  
      return result.rows[0];
    }
  
    /** Delete given user from database; returns undefined. */
  
    static async remove(username) {
      let result = await db.query(
        `DELETE FROM users 
          WHERE username = $1
          RETURNING username`,
        [username]
      );
  
      if (result.rows.length === 0) {
        throw new ExpressError(`There exists no user '${username}'`, 404);
      }
    }
  }
  
  module.exports = Ebay;
  