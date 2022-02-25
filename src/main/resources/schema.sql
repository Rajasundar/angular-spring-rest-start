/* SQL Query*/
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id  INTEGER PRIMARY KEY auto_increment,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL);