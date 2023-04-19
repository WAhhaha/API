CREATE DATABASE IF NOT EXISTS maindb;

ALTER DATABASE maindb DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE maindb;

DROP TABLE IF EXISTS titles;
DROP TABLE IF EXISTS contents;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS sentiments;

CREATE TABLE titles (
  titleId   INT UNSIGNED NOT NULL AUTO_INCREMENT,

  title     TEXT(2048) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  url       TEXT(2048) CHARACTER SET utf8 COLLATE utf8_unicode_ci,

  CONSTRAINT pk_titles PRIMARY KEY (titleId)
);

CREATE TABLE sentiments (
  sentimentId INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titleId     INT UNSIGNED NOT NULL,

  score       FLOAT NOT NULL,

  CONSTRAINT pk_sentiments PRIMARY KEY (sentimentId),
  CONSTRAINT fk_sentimentstitles FOREIGN KEY (titleId)
  REFERENCES titles(titleId)
);

CREATE TABLE contents (
  contentId   INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titleId     INT UNSIGNED NOT NULL,

  content     TEXT(2048) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,

  CONSTRAINT pk_contents PRIMARY KEY (contentId),
  CONSTRAINT fk_contentstitles FOREIGN KEY (titleId)
  REFERENCES titles(titleId)
);

CREATE TABLE messages (
  messageId   INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titleId     INT UNSIGNED NOT NULL,

  message     TEXT(2048) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,

  CONSTRAINT pk_messages PRIMARY KEY (messageId),
  CONSTRAINT fk_messtitles FOREIGN KEY (titleId)
  REFERENCES titles(titleId)
);
--INSERT INTO titles(titleId, title, url) VALUES(0, 'example', 'http:/example');
--INSERT INTO contents(contentId, titleId, content) VALUES(0, 0, 'example contents');
--INSERT INTO sentiments(sentimentId, titleId, score) VALUES(0, 0, 2.5);
