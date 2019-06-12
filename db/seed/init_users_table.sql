DROP TABLE IF EXISTS users;

CREATE TABLE "users" (
  "id" int PRIMARY KEY,
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100),
  "avatar_url" varchar(255),
  "email" varchar(255),
  "created_at" timestamp with time zone NOT NULL DEFAULT NOW()
);


CREATE SEQUENCE users_id_seq OWNED BY users.id;

ALTER TABLE users ALTER COLUMN id 
SET DEFAULT nextval('users_id_seq');

SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));