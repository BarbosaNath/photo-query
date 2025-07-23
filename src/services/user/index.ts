import sqlite from "better-sqlite3";

const db = sqlite("src/db/database.db", { verbose: console.log });

export function addUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const insertUserSQL = `
        INSERT INTO users (email, password)
        VALUES (?, ?);
    `;
  db.prepare(insertUserSQL).run(email, password);
}

export function getUserByEmail(email: string) {
  const getUserSQL = `
        SELECT * FROM users WHERE email = ?;
    `;
  return db.prepare(getUserSQL).get(email);
}

export function updateUserPassword({
  email,
  newPassword,
}: {
  email: string;
  newPassword: string;
}) {
  const updatePasswordSQL = `
        UPDATE users
        SET password = ?, updated_at = CURRENT_TIMESTAMP
        WHERE email = ?;
    `;
  db.prepare(updatePasswordSQL).run(newPassword, email);
}

export function deleteUser(email: string) {
  const deleteUserSQL = `
        DELETE FROM users WHERE email = ?;
    `;
  db.prepare(deleteUserSQL).run(email);
}

export function getAllUsers() {
  const getAllUsersSQL = `
        SELECT * FROM users;
    `;
  return db.prepare(getAllUsersSQL).all();
}
