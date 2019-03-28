CREATE TABLE messages (
  id INTEGER PRIMARY KEY,
  username VARCHAR(30),
  posted_at VARCHAR(25),
  avatar_url VARCHAR(50),
  body VARCHAR(250),
  proj_id INTEGER
);

CREATE TABLE replies (
  id INTEGER PRIMARY KEY,
  username VARCHAR(30),
  posted_at VARCHAR(25),
  avatar_url VARCHAR(50),
  body VARCHAR(250),
  reply_to INTEGER
);

-- CREATE TABLE projects (
--   id INTEGER PRIMARY KEY,
--   proj_name VARCHAR(30)
-- );
