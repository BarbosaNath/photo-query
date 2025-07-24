import sqlite from "better-sqlite3";

const db = sqlite("src/db/database.db", { verbose: console.log });

export function addProduct({ name, categoryId }) {
  const insertProductSQL = `
        INSERT INTO products (name, category_id)
        VALUES (?, ?);
    `;
  db.prepare(insertProductSQL).run(name, categoryId);
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
  db.prepare(updateProductSQL).run(newName, id);
}

export function deleteProduct(id) {
  const deleteProductSQL = `
        DELETE FROM products WHERE id = ?;
    `;
  db.prepare(deleteProductSQL).run(id);
}

export function getProductById(id) {
  const getProductSQL = `
        SELECT * FROM products WHERE id = ?;
    `;
  return db.prepare(getProductSQL).get(id);
}

export function addProductImage({ productId, imageUrl }) {
  const insertImageSQL = `
        INSERT INTO product_images (product_id, image_url)
        VALUES (?, ?);
    `;
  db.prepare(insertImageSQL).run(productId, imageUrl);
}

export function getProductImages(productId) {
  const getImagesSQL = `
        SELECT * FROM product_images WHERE product_id = ?;
    `;
  return db.prepare(getImagesSQL).all(productId);
}

export function deleteProductImage(id) {
  const deleteImageSQL = `
        DELETE FROM product_images WHERE id = ?;
    `;
  db.prepare(deleteImageSQL).run(id);
}

export function addProductCharacteristic({
  productId,
  characteristicId,
  subcharacteristicId,
}) {
  const insertCharacteristicSQL = `
        INSERT INTO product_characteristics (product_id, characteristic_id, subcharacteristic_id)
        VALUES (?, ?, ?);
    `;
  db.prepare(insertCharacteristicSQL).run(
    productId,
    characteristicId,
    subcharacteristicId,
  );
}

export function getProductCharacteristics(productId) {
  const getCharacteristicsSQL = `
        SELECT * FROM product_characteristics WHERE product_id = ?;
    `;
  return db.prepare(getCharacteristicsSQL).all(productId);
}

export function deleteProductCharacteristic(id) {
  const deleteCharacteristicSQL = `
        DELETE FROM product_characteristics WHERE id = ?;
    `;
  db.prepare(deleteCharacteristicSQL).run(id);
}

export function filterProductsByMultipleCriteria(body) {
  const categoryId = body?.categoryId;
  const characteristics = body?.characteristics || [];

  let query = `
        SELECT p.*
        FROM products p
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

  for (const product of products) {
    const chars = characteristicQuery.all(product.id);
    product.characteristics = chars.map((c) => ({
      characteristicId: c.characteristic_id,
      characteristicName: c.characteristic_name,
      subcharacteristicId: c.subcharacteristic_id,
      subcharacteristicName: c.subcharacteristic_name,
    }));
  }

  return products;
}
