import sqlite from 'better-sqlite3';

const db = sqlite('src/db/database.db', { verbose: console.log });

export function addCharacteristic({ name }) {
  const insertCharacteristicSQL = `
        INSERT INTO characteristics (name)
        VALUES (?);
    `;
  return db.prepare(insertCharacteristicSQL).run(name);
}

export function addSubcharacteristic({ characteristicId, name }) {
  const insertSubcharacteristicSQL = `
        INSERT INTO subcharacteristics (characteristic_id, name)
        VALUES (?, ?);
    `;
  return db.prepare(insertSubcharacteristicSQL).run(characteristicId, name);
}

export function updateSubcharacteristic({ id, characteristicId, name }) {
  const updateSubcharacteristicSQL = `
        UPDATE subcharacteristics
        SET characteristic_id = ?, name = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?;
    `;
  return db.prepare(updateSubcharacteristicSQL).run(characteristicId, name, id);
}

export function getCharacteristicByName(name) {
  const getCharacteristicSQL = `
        SELECT * FROM characteristics WHERE name = ?;
    `;
  return db.prepare(getCharacteristicSQL).get(name);
}

export function updateCharacteristicName({ id, newName }) {
  const updateCharacteristicSQL = `
        UPDATE characteristics
        SET name = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?;
    `;
  db.prepare(updateCharacteristicSQL).run(newName, id);
}

export function deleteCharacteristic({ id }) {
  const deleteCharacteristicSQL = `
        DELETE FROM characteristics WHERE id = ?;
    `;
  db.prepare(deleteCharacteristicSQL).run(id);
}

export function getAllCharacteristics() {
  const getAllCharacteristicsSQL = `
        SELECT * FROM characteristics;
    `;
  return db.prepare(getAllCharacteristicsSQL).all();
}

export function getCharacteristicById({ id }) {
  const getCharacteristicSQL = `
        SELECT * FROM characteristics WHERE id = ?;
    `;
  return db.prepare(getCharacteristicSQL).get(id);
}

export function getSubcharacteristicsByCharacteristicId({ characteristicId }) {
  const getSubcharacteristicsSQL = `
        SELECT * FROM subcharacteristics WHERE characteristic_id = ?;
    `;
  return db.prepare(getSubcharacteristicsSQL).all(characteristicId);
}

export function deleteSubcharacteristic({ id }) {
  const deleteSubcharacteristicSQL = `
        DELETE FROM subcharacteristics WHERE id = ?;
    `;
  return db.prepare(deleteSubcharacteristicSQL).run(id);
}
