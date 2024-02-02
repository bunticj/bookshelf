SET
    SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
    time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `bookshelf` DEFAULT CHARACTER SET utf8mb4;

USE `bookshelf`;

CREATE TABLE IF NOT EXISTS `user` (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(64) NOT NULL,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    role_type ENUM('admin', 'author') NOT NULL,
    status_type ENUM('active', 'inactive') NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (email)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `book` (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(32) NOT NULL,
    publisher VARCHAR(32) NOT NULL,
    author_id INT NOT NULL,
    status_type ENUM('active', 'inactive') NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (author_id) REFERENCES `user`(id)
) ENGINE = InnoDB;