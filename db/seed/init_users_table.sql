DROP TABLE IF EXISTS users;

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100),
  "avatar_url" varchar(255),
  "email" varchar(255),
  "created_at" timestamp NOT NULL DEFAULT NOW()
);
