import sqlite from 'better-sqlite3';
import path from 'node:path';
import fs from 'fs';
import { shell } from 'electron';
import os from 'os';
import { exec } from 'child_process';

const db = sqlite('src/db/database.db', { verbose: console.log });

export function addProduct({ name, categoryId }) {
  const insertProductSQL = `
        INSERT INTO products (name, category_id)
        VALUES (?, ?);
    `;
  return db.prepare(insertProductSQL).run(name, categoryId);
}

export function getProductByName(name) {
  const getProductSQL = `
        SELECT * FROM products WHERE name = ?;
    `;
  return db.prepare(getProductSQL).get(name);
}

export function updateProductName({ id, newName }) {
  const updateProductSQL = `
        UPDATE products
        SET name = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?;
    `;
  return db.prepare(updateProductSQL).run(newName, id);
}

export function updateProductCategory({ id, categoryId }) {
  const updateProductCategorySQL = `
        UPDATE products
        SET category_id = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?;
    `;
  return db.prepare(updateProductCategorySQL).run(categoryId, id);
}

export function deleteProduct(id) {
  const deleteProductSQL = `
        DELETE FROM products WHERE id = ?;
    `;
  db.prepare(deleteProductSQL).run(id);
}

export function getProductById({ id }) {
  const getProductSQL = `
        SELECT p.*, c.name AS category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.id = ?;
    `;

  const product = db.prepare(getProductSQL).get(id);

  const characteristicQuery = db.prepare(`
    SELECT
      pc.product_id,
      pc.characteristic_id,
      ch.name AS characteristic_name,
      pc.subcharacteristic_id,
      sch.name AS subcharacteristic_name
    FROM product_characteristics pc
    JOIN characteristics ch ON pc.characteristic_id = ch.id
    LEFT JOIN subcharacteristics sch ON pc.subcharacteristic_id = sch.id
    WHERE pc.product_id = ?
  `);

  const imageQuery = db.prepare(`
    SELECT
      pi.*
    FROM product_images pi
    JOIN products p ON p.id = pi.product_id
    WHERE p.id = ?
  `);

  const chars = characteristicQuery.all(product.id);
  product.characteristics = chars.map((c) => ({
    characteristicId: c.characteristic_id,
    characteristicName: c.characteristic_name,
    subcharacteristicId: c.subcharacteristic_id,
    subcharacteristicName: c.subcharacteristic_name,
  }));

  const images = imageQuery.all(product.id);
  product.images = images;

  return product;
}

export function addProductImageWithUrl({ productId, imageUrl }) {
  const insertImageSQL = `
        INSERT INTO product_images (product_id, image_url)
        VALUES (?, ?);
    `;
  db.prepare(insertImageSQL).run(productId, imageUrl);
}

export function addProductImage({ productId, imageFile }) {
  const imageFileName = `${Date.now()}.png`;
  const imageFilePath = path.join('public', 'images', imageFileName);
  fs.writeFileSync(imageFilePath, imageFile);

  const insertImageSQL = `
        INSERT INTO product_images (product_id, image_url)
        VALUES (?, ?);
    `;
  return db
    .prepare(insertImageSQL)
    .run(productId, path.join('images', imageFileName));
}

export function getProductImages(productId) {
  const getImagesSQL = `
        SELECT * FROM product_images WHERE product_id = ?;
    `;
  return db.prepare(getImagesSQL).all(productId);
}

export async function shareImages({ productsIds }) {
  const getImagesSQL = `
        SELECT pi.image_url
        FROM product_images pi
        JOIN products p ON p.id = pi.product_id
        WHERE p.id IN (${productsIds.map(() => '?').join(', ')});
    `;
  const images = db.prepare(getImagesSQL).all(...productsIds);

  // copy images to a temporary directory
  const tempDir = path.join('public', 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  } else {
    // clear the temp directory
    fs.readdirSync(tempDir).forEach((file) => {
      fs.unlinkSync(path.join(tempDir, file));
    });
  }

  images.map((image) => {
    const sourcePath = path.join('public', image.image_url);
    const destPath = path.join(tempDir, path.basename(image.image_url));
    fs.copyFileSync(sourcePath, destPath);
    return destPath;
  });

  const isWSL = os.release().toLowerCase().includes('microsoft');

  if (isWSL) {
    const winPath = '.\\' + tempDir.replaceAll('/', '\\');

    exec(`explorer.exe "${winPath}"`);
  } else {
    await shell.openPath(tempDir);
  }
}

export function deleteProductImage({ id }) {
  const image = db
    .prepare(
      `
        SELECT * FROM product_images WHERE id = ?;
    `,
    )
    .get(id);

  if (!image) {
    throw new Error(`Image with id ${id} not found`);
  }
  const imagePath = path.join('public', image.image_url);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }

  const deleteImageSQL = `
        DELETE FROM product_images WHERE id = ?;
    `;
  return db.prepare(deleteImageSQL).run(id);
}

export function addProductCharacteristic({
  productId,
  characteristicId,
  subcharacteristicId,
}) {
  console.log('Adding product characteristic:', {
    productId,
    characteristicId,
    subcharacteristicId,
  });
  const insertCharacteristicSQL = subcharacteristicId
    ? `
        INSERT INTO product_characteristics (product_id, characteristic_id, subcharacteristic_id)
        VALUES (?, ?, ?);
    `
    : `
        INSERT INTO product_characteristics (product_id, characteristic_id)
        VALUES (?, ?);
    `;

  if (subcharacteristicId) {
    return db
      .prepare(insertCharacteristicSQL)
      .run(productId, characteristicId, subcharacteristicId);
  }

  return db.prepare(insertCharacteristicSQL).run(productId, characteristicId);
}

export function getProductCharacteristics(productId) {
  const getCharacteristicsSQL = `
        SELECT * FROM product_characteristics WHERE product_id = ?;
    `;
  return db.prepare(getCharacteristicsSQL).all(productId);
}

export function deleteProductCharacteristic({
  productId,
  characteristicId,
  subcharacteristicId,
}) {
  let deleteCharacteristicSQL = `
        DELETE FROM product_characteristics WHERE product_id = ? AND characteristic_id = ?
    `;
  if (subcharacteristicId) {
    deleteCharacteristicSQL += ` AND subcharacteristic_id = ?`;
    return db
      .prepare(deleteCharacteristicSQL)
      .run(productId, characteristicId, subcharacteristicId);
  }
  return db.prepare(deleteCharacteristicSQL).run(productId, characteristicId);
}

export function filterProductsByMultipleCriteria(body) {
  const categoryId = body?.categoryId;
  const characteristics = body?.characteristics || [];

  let query = `
        SELECT p.*, c.name AS category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
    `;

  const params = [];

  if (categoryId) {
    query += `
            WHERE p.category_id = ?
          `;
    params.push(categoryId);
  }

  if (!characteristics) return db.prepare(query).all(...params);

  characteristics.forEach((characteristic) => {
    if (params.length === 0) {
      query += `
            WHERE
        `;
    } else {
      query += `
            AND
        `;
    }
    query += `
            EXISTS (
                SELECT 1
                FROM product_characteristics pc
                WHERE pc.product_id = p.id
        `;
    if (characteristic.id) {
      query += `
                AND pc.characteristic_id = ?
        `;
      params.push(characteristic.id);
    }

    if (characteristic.subId) {
      query += `
                AND pc.subcharacteristic_id = ?
        `;
      params.push(characteristic.subId);
    }

    query += `
            )
        `;
  });

  const products = db.prepare(query).all(...params);

  const characteristicQuery = db.prepare(`
    SELECT
      pc.product_id,
      pc.characteristic_id,
      ch.name AS characteristic_name,
      pc.subcharacteristic_id,
      sch.name AS subcharacteristic_name
    FROM product_characteristics pc
    JOIN characteristics ch ON pc.characteristic_id = ch.id
    LEFT JOIN subcharacteristics sch ON pc.subcharacteristic_id = sch.id
    WHERE pc.product_id = ?
  `);

  const imageQuery = db.prepare(`
    SELECT
      pi.*
    FROM product_images pi
    JOIN products p ON p.id = pi.product_id
    WHERE p.id = ?
  `);

  for (const product of products) {
    const chars = characteristicQuery.all(product.id);
    product.characteristics = chars.map((c) => ({
      characteristicId: c.characteristic_id,
      characteristicName: c.characteristic_name,
      subcharacteristicId: c.subcharacteristic_id,
      subcharacteristicName: c.subcharacteristic_name,
    }));

    const images = imageQuery.all(product.id);
    product.images = images;
  }

  return products;
}
