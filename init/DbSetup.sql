SET
    SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
    time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `bookshelf` DEFAULT CHARACTER SET utf8mb4;

USE `bookshelf`;

CREATE TABLE IF NOT EXISTS `user` (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    email VARCHAR(64) NOT NULL,
    role_type INT NOT NULL,
    status_type INT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (email)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `book` (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(64) NOT NULL,
    publisher VARCHAR(64) NOT NULL,
    author_id INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES `user`(id)
) ENGINE = InnoDB;