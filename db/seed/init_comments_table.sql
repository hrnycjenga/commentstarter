DROP TABLE IF EXISTS comments;

CREATE TABLE "comments" (
  "id" int PRIMARY KEY,
  "project_id" int NOT NULL,
  "parent_id" int NOT NULL,
  "author_id" int NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT NOW(),
  "comment_body" varchar
);