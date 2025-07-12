const db = require('../config/db.config');

// Get all spare parts
async function getAll() {
  const [rows] = await db.query('SELECT * FROM used_spare_parts ORDER BY created_at DESC');
  return rows;
}

// Get spare part by ID
async function getById(id) {
  const [rows] = await db.query('SELECT * FROM used_spare_parts WHERE id = ?', [id]);
  return rows[0];
}

// Create new spare part
async function create(data) {
  const {
    name_en, name_it, category_key,
    description_en, description_it, price, image_url,
    part_number, condition, compatible_models, vehicle_type
  } = data;
  const [result] = await db.query(
    `INSERT INTO used_spare_parts 
      (name_en, name_it, category_key, description_en, description_it, price, image_url, part_number, \
        \`condition\`, compatible_models, vehicle_type)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name_en ?? null,
      name_it ?? null,
      category_key ?? null,
      description_en ?? null,
      description_it ?? null,
      price,
      image_url,
      part_number ?? null,
      condition ?? null,
      compatible_models ?? null,
      vehicle_type ?? null
    ]
  );
  return { id: result.insertId, ...data };
}

// Update spare part
async function update(id, data) {
  const fields = [];
  const values = [];
  for (const key in data) {
    if (["category_en", "category_it"].includes(key)) continue; // skip legacy fields
    if (key === 'condition') {
      fields.push('`condition` = ?');
    } else {
      fields.push(`${key} = ?`);
    }
    values.push(data[key]);
  }
  values.push(id);
  const [result] = await db.query(
    `UPDATE used_spare_parts SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  return result.affectedRows > 0;
}

// Delete spare part
async function remove(id) {
  const [result] = await db.query('DELETE FROM used_spare_parts WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}; 