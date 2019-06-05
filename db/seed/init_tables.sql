DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS users;

CREATE TABLE "comments" (
  "id" int PRIMARY KEY,
  "project_id" int NOT NULL,
  "author_id" int NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT NOW(),
  "comment_body" varchar
);

CREATE TABLE "users" (
  "id" int PRIMARY KEY,
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100),
  "avatar_url" varchar(255),
  "email" varchar UNIQUE,
  "created_at" timestamp NOT NULL DEFAULT NOW()
);

ALTER TABLE "comments" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");