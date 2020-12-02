const db = require("../db");
const bcrypt = require("bcrypt");
const partialUpdate = require("../helpers/partialUpdate");
const ExpressError = require("../helpers/ExpressError");

const BCRYPT_WORK_FACTOR = 10;
let now = new Date();

/** Related functions for users. */

class User {
  /** authenticate user with username, password. Returns user or throws err. */
  static async findAll() {
    const result = await db.query(
      `SELECT * from users`
    );

    return result.rows;
  }

  static async login(data) {
    // try to find the user first
    const result = await db.query(
      `SELECT username, password, first_name, last_name, email, is_admin, first_time, last_login, business, banking, islamic
        FROM users 
        WHERE username = $1`,
      [data.username]
    );

    const user = result.rows[0];

    if (user) {
      console.log(user)
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(data.password, user.password);
      if (isValid) {
        return user;
      }
    }

    throw ExpressError("Invalid Password", 401);
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
        RETURNING username, first_name, last_name, email, is_admin, first_time, last_login, business, banking, islamic`,
      [
        data.username, 
        hashedPassword,
        data.first_name, 
        data.last_name, 
        data.email,
        false,
        true,
        now,
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

module.exports = User;
