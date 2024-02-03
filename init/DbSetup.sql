SET
    SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
    time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `bookshelf` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

USE `bookshelf`;

CREATE TABLE IF NOT EXISTS `user` (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(64) NOT NULL,
    firstName VARCHAR(32) NOT NULL,
    lastName VARCHAR(32) NOT NULL,
    role ENUM('admin', 'author') NOT NULL,
    status ENUM('active', 'inactive') NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (email)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `book` (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(32) NOT NULL,
    publisher VARCHAR(32) NOT NULL,
    authorId INT NOT NULL,
    status ENUM('active', 'inactive') NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (authorId) REFERENCES `user`(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `user_token` (
    id INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    refreshToken VARCHAR(32) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES `user`(id) ON DELETE CASCADE
) ENGINE = InnoDB;