DROP DATABASE IF EXISTS shopping;

CREATE DATABASE shopping;

USE shopping;

CREATE TABLE users (
  id INT AUTO_INCREMENT,
  username VARCHAR(50),
  email VARCHAR(50),
  pswd VARCHAR(50),
  cc_num VARCHAR(20),
  expiration DATETIME,
  cvv VARCHAR(5),
  zip VARCHAR(10),
  userid INT,
  address1 VARCHAR (30),
  address2 VARCHAR (30),
  city VARCHAR (30),
  state VARCHAR (30),
  billing_zip VARCHAR(10),
  phone VARCHAR (15),
  PRIMARY KEY (id)
);