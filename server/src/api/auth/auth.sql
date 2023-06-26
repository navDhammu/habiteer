/* @name getUserByEmail */
SELECT * FROM users WHERE email = :email LIMIT 1;

/* @name createNewUser */
INSERT INTO users (email, password) VALUES (:email, :password);