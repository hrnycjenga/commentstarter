DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS users;

CREATE TABLE "comments" (
  "id" SERIAL PRIMARY KEY,
  "project_id" int NOT NULL,
  "author_id" int NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT NOW(),
  "comment_body" varchar
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100),
  "avatar_url" varchar(255),
  "email" varchar(255),
  "created_at" timestamp NOT NULL DEFAULT NOW()
);

ALTER TABLE "comments" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");

SELECT create_distributed_table('comments', 'project_id');
SELECT create_distributed_table('users', 'id');