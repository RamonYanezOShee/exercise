CREATE DATABASE mydb;
CREATE USER 'userdb'@'%' IDENTIFIED BY 'userdb';
GRANT ALL PRIVILEGES ON mydb.* TO 'userdb'@'%';

-- we don't need create tables structures because TYPEORM will do for us