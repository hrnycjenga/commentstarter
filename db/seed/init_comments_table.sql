DROP TABLE IF EXISTS comments;

CREATE TABLE "comments" (
  "id" int PRIMARY KEY,
  "project_id" int NOT NULL,
  "parent_id" int NOT NULL,
  "author_id" int NOT NULL,
  "created_at" timestamp with time zone NOT NULL DEFAULT NOW(),
  "comment_body" varchar
);

CREATE SEQUENCE comments_id_seq OWNED BY comments.id;

ALTER TABLE comments ALTER COLUMN id 
SET DEFAULT nextval('comments_id_seq');

SELECT setval('comments_id_seq', (SELECT MAX(id) FROM comments));