const QUERY = {

  SELECT_titles:        'SELECT * FROM titles',
  SELECT_contents:      'SELECT * FROM contents',
  SELECT_sentiments:    'SELECT * FROM sentiments',

  SELECT_titles_url:    'SELECT title, url FROM titles WHERE titleId = ?',
  SELECT_content:       'SELECT content FROM contents WHERE titleId = ?',
  SELECT_sentiment:     'SELECT score FROM sentiments WHERE sentimentsId = ?',

  ADD_titles:           'INSERT INTO titles(title, url) VALUES(?, ?)',
  ADD_contents:         'INSERT INTO contents(titleId, content) VALUES(?, ?)',
  ADD_sentiments:       'INSERT INTO sentiments(titleId, score) VALUES(?, ?)',

  TRUNCATE_sentiments:      'TRUNCATE TABLE sentiments',

  //DELETE_SENTIMENT:     'DELETE FROM sentiments WHERE sentimentId = ?',

  //SELECT_MAX_CONTENTID: 'SELECT MAX(contentId) AS latestId FROM contents',

  //AVG_SCORE_MAGNITUDE:  'SELECT AVG(sentiments.score) AS SCORE, AVG(sentiments.magnitude) AS MAGNITUDE FROM sentiments INNER JOIN contents ON contents.contentId = sentiments.contentId INNER JOIN keywords ON keywords.keywordId = contents.keywordId WHERE keywords.keywordId = ?',
  
  
};

export default QUERY;
