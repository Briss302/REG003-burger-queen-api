DROP DATABASE IF EXISTS bq_database;

CREATE DATABASE bq_database;

USE bq_database;

-- USERS TABLE
CREATE TABLE users(
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  rolesAdmin TINYINT default 0 NOT NULL
);

-- PRODUCT TABLE
CREATE TABLE product(
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  price FLOAT(4,2) NOT NULL,
  image VARCHAR(200) NULL,
  type VARCHAR(20) NOT NULL,
  dateEntry timestamp NOT NULL default current_timestamp
);

-- ORDER TABLE
CREATE TABLE order(
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT(11),
  client VARCHAR(20) NOT NULL,
  status VARCHAR(20) default 'pending' NOT NULL,
  dateEntry timestamp NOT NULL default current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);