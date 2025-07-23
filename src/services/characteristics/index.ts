import sqlite from "better-sqlite3";

const db = sqlite("src/db/database.db", { verbose: console.log });

export function addCharacteristic({ name }: { name: string }) {
  const insertCharacteristicSQL = `
        INSERT INTO characteristics (name)
        VALUES (?);
    `;
  db.prepare(insertCharacteristicSQL).run(name);
}

export function addSubcharacteristic({
  characteristicId,
  name,
}: {
  characteristicId: number;
  name: string;
}) {
  const insertSubcharacteristicSQL = `
        INSERT INTO subcharacteristics (characteristic_id, name)
        VALUES (?, ?);
    `;
  db.prepare(insertSubcharacteristicSQL).run(characteristicId, name);
}

export function updateSubcharacteristic({
  id,
  characteristicId,
  name,
}: {
  id: number;
  characteristicId: number;
  name: string;
}) {
  const updateSubcharacteristicSQL = `
        UPDATE subcharacteristics
        SET characteristic_id = ?, name = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?;
    `;
  db.prepare(updateSubcharacteristicSQL).run(characteristicId, name, id);
}

export function getCharacteristicByName(name: string) {
  const getCharacteristicSQL = `
        SELECT * FROM characteristics WHERE name = ?;
    `;
  return db.prepare(getCharacteristicSQL).get(name);
}

export function updateCharacteristicName({
  id,
  newName,
}: {
  id: number;
  newName: string;
}) {
  const updateCharacteristicSQL = `
        UPDATE characteristics
        SET name = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?;
    `;
  db.prepare(updateCharacteristicSQL).run(newName, id);
}

export function deleteCharacteristic(id: number) {
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

export function getCharacteristicById(id: number) {
  const getCharacteristicSQL = `
        SELECT * FROM characteristics WHERE id = ?;
    `;
  return db.prepare(getCharacteristicSQL).get(id);
}

export function getCharacteristicWithSubcharacteristics(id: number) {
  const getCharacteristicWithSubcharacteristicsSQL = `
        SELECT ch.*, sub.*
        FROM characteristics ch
        LEFT JOIN subcharacteristics sub ON ch.id = sub.characteristic_id
        WHERE ch.id = ?;
    `;
  return db.prepare(getCharacteristicWithSubcharacteristicsSQL).get(id);
}

export function getSubcharacteristicsByCharacteristicId(
  characteristicId: number,
) {
  const getSubcharacteristicsSQL = `
        SELECT * FROM subcharacteristics WHERE characteristic_id = ?;
    `;
  return db.prepare(getSubcharacteristicsSQL).all(characteristicId);
}
