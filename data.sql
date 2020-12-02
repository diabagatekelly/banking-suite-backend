CREATE TABLE users(
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    is_admin BOOLEAN NOT NULL default FALSE,
    first_time BOOLEAN NOT NULL default TRUE,
    last_login TIMESTAMP DEFAULT current_timestamp,
    business BOOLEAN NOT NULL default FALSE,
    banking BOOLEAN NOT NULL default FALSE,
    islamic BOOLEAN NOT NULL default FALSE
);

CREATE TABLE ebay (
    id SERIAL PRIMARY KEY,
    user_token TEXT NOT NULL,
    user_token_exp_date TIMESTAMP,
    refresh_token TEXT NOT NULL,
    refresh_token_exp_date TIMESTAMP,
    user_handle TEXT NOT NULL REFERENCES users ON DELETE CASCADE
);