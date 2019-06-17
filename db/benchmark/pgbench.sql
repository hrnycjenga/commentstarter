\set project random(1, 10000000)
BEGIN;
  SELECT c.*, u.first_name, u.last_name, u.avatar_url, u.email
  FROM comments c INNER JOIN users u ON c.author_id = u.id
  WHERE c.project_id = :project;
END;