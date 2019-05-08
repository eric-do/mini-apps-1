DROP DATABASE IF EXISTS shopping;

CREATE DATABASE shopping;

USE shopping;

CREATE TABLE users (
  id INT AUTO_INCREMENT,
  username VARCHAR(50),
  email VARCHAR(50),
  pswd VARCHAR(50),
  PRIMARY KEY (id)
);

CREATE TABLE creditcards (
  id INT AUTO_INCREMENT,
  num VARCHAR(20),
  expiration DATETIME,
  cvv VARCHAR(5),
  zip VARCHAR(10),
  userid INT,
  PRIMARY KEY (id),
  FOREIGN KEY (userid) REFERENCES users(id)
);

CREATE TABLE addresses (
  id INT AUTO_INCREMENT,
  address1 VARCHAR (30),
  address2 VARCHAR (30),
  city VARCHAR (30),
  state VARCHAR (30),
  zip VARCHAR(10),
  phone VARCHAR (15),
  userid INT,
  PRIMARY KEY (id),
  FOREIGN KEY (userid) REFERENCES users(id)
);