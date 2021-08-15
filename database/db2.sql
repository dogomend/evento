CREATE DATABASE database_event;

USE database_event;

-- TABLE USER
-- all pasword wil be encrypted using SHA1
CREATE TABLE users (
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

INSERT INTO users (id, username, password, fullname) 
  VALUES (1, 'john', 'john123', 'John Carter');

SELECT * FROM users;

-- Event TABLE
CREATE TABLE event (
  id INT(11) NOT NULL,
  title VARCHAR(150) NOT NULL,
  url VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  lugar VARCHAR(150) NOT NULL,
  precio DECIMAL(20,2) NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT current_timestamp,
  destacado CHAR(0) DEFAULT NULL,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id));


ALTER TABLE event
  ADD PRIMARY KEY (id);

ALTER TABLE event
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE event;