import sqlite from "better-sqlite3";

const db = sqlite("src/db/database.db", { verbose: console.log });

export function createUserTable() {
  const createTableSQL = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
  db.prepare(createTableSQL).run();
}

export function createCategoriesTable() {
  const createTableSQL = `
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
  db.prepare(createTableSQL).run();
}

export function createCharacteristicsTable() {
  const createTableSQL = `
        CREATE TABLE IF NOT EXISTS characteristics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
  db.prepare(createTableSQL).run();
}

export function createSubcharacteristicsTable() {
  const createTableSQL = `
        CREATE TABLE IF NOT EXISTS subcharacteristics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            characteristic_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (characteristic_id) REFERENCES characteristics(id)
        );
    `;
  db.prepare(createTableSQL).run();
}

export function createProductsTable() {
  const createTableSQL = `
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                category_id INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES categories(id)
            );
        `;
  db.prepare(createTableSQL).run();
}

export function createProductCharacteristicsTable() {
  const createTableSQL = `
        CREATE TABLE IF NOT EXISTS product_characteristics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            characteristic_id INTEGER NOT NULL,
            subcharacteristic_id INTEGER,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (characteristic_id) REFERENCES characteristics(id),
            FOREIGN KEY (subcharacteristic_id) REFERENCES subcharacteristics(id)
        );
    `;
  db.prepare(createTableSQL).run();
}

export function createProductImagesTable() {
  const createTableSQL = `
        CREATE TABLE IF NOT EXISTS product_images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            image_url TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (product_id) REFERENCES products(id)
        );
    `;
  db.prepare(createTableSQL).run();
}

export function initializeDatabase() {
  createUserTable();
  createCategoriesTable();
  createCharacteristicsTable();
  createSubcharacteristicsTable();
  createProductsTable();
  createProductCharacteristicsTable();
  createProductImagesTable();
}
