CREATE DATABASE IF NOT EXISTS maindb;

ALTER DATABASE maindb DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE maindb;

DROP TABLE IF EXISTS titles;
DROP TABLE IF EXISTS contents;
DROP TABLE IF EXISTS sentiments;


CREATE TABLE titles (
  titleId   INT UNSIGNED NOT NULL AUTO_INCREMENT,

  source    TEXT(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  title     TEXT(2048) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  url       TEXT(2048) CHARACTER SET utf8 COLLATE utf8_unicode_ci,

  CONSTRAINT pk_titles PRIMARY KEY (titleId)
);

CREATE TABLE contents (
  contentId   INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titleId     INT UNSIGNED NOT NULL,

  content     TEXT(2048) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,

  CONSTRAINT pk_contents PRIMARY KEY (contentId),
  CONSTRAINT fk_contentstitles FOREIGN KEY (titleId)
  REFERENCES titles(titleId)
);

CREATE TABLE sentiments (
  sentimentId INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titleId     INT UNSIGNED NOT NULL,

  score       FLOAT NOT NULL,

  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT pk_sentiments PRIMARY KEY (sentimentId),
  CONSTRAINT fk_sentimentstitles FOREIGN KEY (titleId)
  REFERENCES titles(titleId)
);

DELIMITER //
CREATE PROCEDURE get_sentiments()
BEGIN
  SELECT COUNT(*) AS count FROM sentiments;
  SELECT * FROM sentiments INNER JOIN titles ON titles.titleId = sentiments.titleId WHERE titles.source = 'PTT';
  SELECT * FROM sentiments INNER JOIN titles ON titles.titleId = sentiments.titleId WHERE titles.source = 'DCARD';
  SELECT * FROM sentiments INNER JOIN titles ON titles.titleId = sentiments.titleId WHERE titles.source = 'GAMER';
  SELECT * FROM sentiments INNER JOIN titles ON titles.titleId = sentiments.titleId WHERE titles.source = 'FB';
  TRUNCATE TABLE sentiments;
END //

DELIMITER //
CREATE PROCEDURE test()
BEGIN
  SELECT * FROM titles;
END //


DELIMITER //
CREATE PROCEDURE insert_title_content(IN source TEXT(32), IN title TEXT(2048) CHARACTER SET utf8 COLLATE utf8_unicode_ci, IN content TEXT(2048) CHARACTER SET utf8 COLLATE utf8_unicode_ci, IN url TEXT(256))
BEGIN
  INSERT INTO titles(source, title, url) VALUES(source, title, url);
  SET @LAST_ID = LAST_INSERT_ID();
  INSERT INTO contents(titleId, content) VALUES(@LAST_ID, content);
END //
DELIMITER;
