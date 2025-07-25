import sqlite from "better-sqlite3";

const db = sqlite("src/db/database.db", { verbose: console.log });

export function addCategory({ name }) {
  const insertCategorySQL = `
        INSERT INTO categories (name)
        VALUES (?);
    `;
  return db.prepare(insertCategorySQL).run(name);
}

export function getCategoryByName(name) {
  const getCategorySQL = `
        SELECT * FROM categories WHERE name = ?;
    `;
  return db.prepare(getCategorySQL).get(name);
}

export function updateCategoryName({ id, newName }) {
  const updateCategorySQL = `
        UPDATE categories
        SET name = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?;
    `;
  db.prepare(updateCategorySQL).run(newName, id);
}

export function deleteCategory({ id }) {
  const deleteCategorySQL = `
        DELETE FROM categories WHERE id = ?;
    `;
  return db.prepare(deleteCategorySQL).run(id);
}

export function getAllCategories() {
  const getAllCategoriesSQL = `
        SELECT * FROM categories;
    `;
  return db.prepare(getAllCategoriesSQL).all();
}

export function getCategoryById(id) {
  const getCategorySQL = `
        SELECT * FROM categories WHERE id = ?;
    `;
  return db.prepare(getCategorySQL).get(id);
}

export function getCategoryWithProducts(id) {
  const getCategoryWithProductsSQL = `
        SELECT c.*, p.*
        FROM categories c
        LEFT JOIN products p ON c.id = p.category_id
        WHERE c.id = ?;
    `;
  return db.prepare(getCategoryWithProductsSQL).get(id);
}
