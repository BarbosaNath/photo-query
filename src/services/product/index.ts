import sqlite from "better-sqlite3";

const db = sqlite("src/db/database.db", { verbose: console.log });

export function addProduct({
  name,
  categoryId,
}: {
  name: string;
  categoryId: number;
}) {
  const insertProductSQL = `
        INSERT INTO products (name, category_id)
        VALUES (?, ?);
    `;
  db.prepare(insertProductSQL).run(name, categoryId);
}

export function getProductByName(name: string) {
  const getProductSQL = `
        SELECT * FROM products WHERE name = ?;
    `;
  return db.prepare(getProductSQL).get(name);
}

export function updateProductName({
  id,
  newName,
}: {
  id: number;
  newName: string;
}) {
  const updateProductSQL = `
        UPDATE products
        SET name = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?;
    `;
  db.prepare(updateProductSQL).run(newName, id);
}

export function deleteProduct(id: number) {
  const deleteProductSQL = `
        DELETE FROM products WHERE id = ?;
    `;
  db.prepare(deleteProductSQL).run(id);
}

export function getAllProducts() {
  const getAllProductsSQL = `
        SELECT * FROM products;
    `;
  return db.prepare(getAllProductsSQL).all();
}

export function getProductById(id: number) {
  const getProductSQL = `
        SELECT * FROM products WHERE id = ?;
    `;
  return db.prepare(getProductSQL).get(id);
}

export function getProductsByCategoryId(categoryId: number) {
  const getProductsSQL = `
        SELECT * FROM products WHERE category_id = ?;
    `;
  return db.prepare(getProductsSQL).all(categoryId);
}

export function addProductImage({
  productId,
  imageUrl,
}: {
  productId: number;
  imageUrl: string;
}) {
  const insertImageSQL = `
        INSERT INTO product_images (product_id, image_url)
        VALUES (?, ?);
    `;
  db.prepare(insertImageSQL).run(productId, imageUrl);
}

export function getProductImages(productId: number) {
  const getImagesSQL = `
        SELECT * FROM product_images WHERE product_id = ?;
    `;
  return db.prepare(getImagesSQL).all(productId);
}

export function deleteProductImage(id: number) {
  const deleteImageSQL = `
        DELETE FROM product_images WHERE id = ?;
    `;
  db.prepare(deleteImageSQL).run(id);
}

export function addProductCharacteristic({
  productId,
  characteristicId,
  subcharacteristicId,
}: {
  productId: number;
  characteristicId: number;
  subcharacteristicId?: number;
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

export function getProductCharacteristics(productId: number) {
  const getCharacteristicsSQL = `
        SELECT * FROM product_characteristics WHERE product_id = ?;
    `;
  return db.prepare(getCharacteristicsSQL).all(productId);
}

export function deleteProductCharacteristic(id: number) {
  const deleteCharacteristicSQL = `
        DELETE FROM product_characteristics WHERE id = ?;
    `;
  db.prepare(deleteCharacteristicSQL).run(id);
}

export function getProductWithCharacteristics(productId: number) {
  const getProductWithCharacteristicsSQL = `
        SELECT p.*, pc.characteristic_id, pc.subcharacteristic_id
        FROM products p
        LEFT JOIN product_characteristics pc ON p.id = pc.product_id
        WHERE p.id = ?;
    `;
  return db.prepare(getProductWithCharacteristicsSQL).get(productId);
}

export function getProductsWithCharacteristics() {
  const getProductsWithCharacteristicsSQL = `
        SELECT p.*, pc.characteristic_id, pc.subcharacteristic_id
        FROM products p
        LEFT JOIN product_characteristics pc ON p.id = pc.product_id;
    `;
  return db.prepare(getProductsWithCharacteristicsSQL).all();
}

export function getProductsWithImages() {
  const getProductsWithImagesSQL = `
        SELECT p.*, pi.image_url
        FROM products p
        LEFT JOIN product_images pi ON p.id = pi.product_id;
    `;
  return db.prepare(getProductsWithImagesSQL).all();
}

export function getProductsWithCategories() {
  const getProductsWithCategoriesSQL = `
        SELECT p.*, c.name AS category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id;
    `;
  return db.prepare(getProductsWithCategoriesSQL).all();
}

export function getProductWithCategoryAndImages(productId: number) {
  const getProductWithCategoryAndImagesSQL = `
        SELECT p.*, c.name AS category_name, pi.image_url
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN product_images pi ON p.id = pi.product_id
        WHERE p.id = ?;
    `;
  return db.prepare(getProductWithCategoryAndImagesSQL).get(productId);
}

export function getProductsWithCharacteristicsAndImages() {
  const getProductsWithCharacteristicsAndImagesSQL = `
        SELECT p.*, pc.characteristic_id, pc.subcharacteristic_id, pi.image_url
        FROM products p
        LEFT JOIN product_characteristics pc ON p.id = pc.product_id
        LEFT JOIN product_images pi ON p.id = pi.product_id;
    `;
  return db.prepare(getProductsWithCharacteristicsAndImagesSQL).all();
}

export function getProductsWithCharacteristicsAndCategories() {
  const getProductsWithCharacteristicsAndCategoriesSQL = `
        SELECT p.*, pc.characteristic_id, pc.subcharacteristic_id, c.name AS category_name
        FROM products p
        LEFT JOIN product_characteristics pc ON p.id = pc.product_id
        LEFT JOIN categories c ON p.category_id = c.id;
    `;
  return db.prepare(getProductsWithCharacteristicsAndCategoriesSQL).all();
}

export function getProductsWithAllDetails() {
  const getProductsWithAllDetailsSQL = `
        SELECT p.*, c.name AS category_name, pi.image_url, pc.characteristic_id, pc.subcharacteristic_id
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN product_images pi ON p.id = pi.product_id
        LEFT JOIN product_characteristics pc ON p.id = pc.product_id;
    `;
  return db.prepare(getProductsWithAllDetailsSQL).all();
}

export function getProductWithCharacteristicsAndSubcharacteristics(
  productId: number,
) {
  const getProductWithCharacteristicsAndSubcharacteristicsSQL = `
        SELECT p.*, pc.characteristic_id, pc.subcharacteristic_id, sub.name AS subcharacteristic_name
        FROM products p
        LEFT JOIN product_characteristics pc ON p.id = pc.product_id
        LEFT JOIN subcharacteristics sub ON pc.subcharacteristic_id = sub.id
        WHERE p.id = ?;
    `;
  return db
    .prepare(getProductWithCharacteristicsAndSubcharacteristicsSQL)
    .get(productId);
}

export function getProductsWithCharacteristicsAndSubcharacteristics() {
  const getProductsWithCharacteristicsAndSubcharacteristicsSQL = `
        SELECT p.*, pc.characteristic_id, pc.subcharacteristic_id, sub.name AS subcharacteristic_name
        FROM products p
        LEFT JOIN product_characteristics pc ON p.id = pc.product_id
        LEFT JOIN subcharacteristics sub ON pc.subcharacteristic_id = sub.id;
    `;
  return db
    .prepare(getProductsWithCharacteristicsAndSubcharacteristicsSQL)
    .all();
}

export function getProductsWithCharacteristicsAndSubcharacteristicsByCategory(
  categoryId: number,
) {
  const getProductsWithCharacteristicsAndSubcharacteristicsByCategorySQL = `
        SELECT p.*, pc.characteristic_id, pc.subcharacteristic_id, sub.name AS subcharacteristic_name
        FROM products p
        LEFT JOIN product_characteristics pc ON p.id = pc.product_id
        LEFT JOIN subcharacteristics sub ON pc.subcharacteristic_id = sub.id
        WHERE p.category_id = ?;
    `;
  return db
    .prepare(getProductsWithCharacteristicsAndSubcharacteristicsByCategorySQL)
    .all(categoryId);
}

export function getProductWithCategoryAndCharacteristics(productId: number) {
  const getProductWithCategoryAndCharacteristicsSQL = `
        SELECT p.*, c.name AS category_name, pc.characteristic_id, pc.subcharacteristic_id
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN product_characteristics pc ON p.id = pc.product_id
        WHERE p.id = ?;
    `;
  return db.prepare(getProductWithCategoryAndCharacteristicsSQL).get(productId);
}

export function filterProductsByMultipleCriteria({
  categoryId,
  characteristicIds: characteristicId,
  subcharacteristicIds: subcharacteristicId,
}: {
  categoryId?: number;
  characteristicIds?: number[];
  subcharacteristicIds?: number[];
}) {
  let query = `
        SELECT p.*, c.name AS category_name, pc.characteristic_id, pc.subcharacteristic_id
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN product_characteristics pc ON p.id = pc.product_id
        WHERE 1=1
    `;

  const params: (string | number)[] = [];

  if (categoryId !== undefined) {
    query += " AND p.category_id = ?";
    params.push(categoryId);
  }

  if (characteristicId && characteristicId.length > 0) {
    query += ` AND pc.characteristic_id IN (${characteristicId.map(() => "?").join(", ")})`;
    params.push(...characteristicId);
  }
  if (subcharacteristicId && subcharacteristicId.length > 0) {
    query += ` AND pc.subcharacteristic_id IN (${subcharacteristicId.map(() => "?").join(", ")})`;
    params.push(...subcharacteristicId);
  }

  query += ` GROUP BY p.id HAVING COUNT(DISTINCT pc.characteristic_id || '-' || IFNULL(pc.subcharacteristic_id, '')) = ?`;
  const totalCombinacoes =
    (characteristicId?.length || 0) * (subcharacteristicId?.length || 1);
  params.push(totalCombinacoes);

  return db.prepare(query).all(...params);
}
