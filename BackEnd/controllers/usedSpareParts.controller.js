const usedSparePartsService = require('../services/usedSpareParts.service');
const path = require('path');
const { default: translate } = require('@vitalets/google-translate-api');

// Helper to auto-translate fields
async function autoTranslateFields(data) {
  // If both EN and IT are present, do nothing
  // If only one is present, translate to the other
  const result = { ...data };
  // Name
  if (data.name_en && !data.name_it) {
    const tRes = await translate(data.name_en, { to: 'it' });
    result.name_it = tRes.text;
  } else if (data.name_it && !data.name_en) {
    const tRes = await translate(data.name_it, { to: 'en' });
    result.name_en = tRes.text;
  }
  // Category
  if (data.category_en && !data.category_it) {
    const tRes = await translate(data.category_en, { to: 'it' });
    result.category_it = tRes.text;
  } else if (data.category_it && !data.category_en) {
    const tRes = await translate(data.category_it, { to: 'en' });
    result.category_en = tRes.text;
  }
  // Description
  if (data.description_en && !data.description_it) {
    const tRes = await translate(data.description_en, { to: 'it' });
    result.description_it = tRes.text;
  } else if (data.description_it && !data.description_en) {
    const tRes = await translate(data.description_it, { to: 'en' });
    result.description_en = tRes.text;
  }
  return result;
}

// Get all spare parts
async function getAll(req, res) {
  try {
    const parts = await usedSparePartsService.getAll();
    res.json(parts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch spare parts.' });
  }
}

// Get by ID
async function getById(req, res) {
  try {
    const part = await usedSparePartsService.getById(req.params.id);
    if (!part) return res.status(404).json({ error: 'Not found' });
    res.json(part);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch spare part.' });
  }
}

// Create new spare part
async function create(req, res) {
  try {
    let data = req.body;
    if (req.file) {
      data.image_url = `/uploads/${req.file.filename}`;
    }
    // data = await autoTranslateFields(data); // Temporarily disabled
    const created = await usedSparePartsService.create(data);
    console.log('Spare part created:', created);
    res.status(201).json(created);
  } catch (err) {
    console.error('Failed to create spare part:', err);
    res.status(500).json({ error: 'Failed to create spare part.' });
  }
}

// Update spare part
async function update(req, res) {
  try {
    let data = req.body;
    if (req.file) {
      data.image_url = `/uploads/${req.file.filename}`;
    }
    // data = await autoTranslateFields(data); // Temporarily disabled
    const updated = await usedSparePartsService.update(req.params.id, data);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    console.error('Failed to update spare part:', err);
    res.status(500).json({ error: 'Failed to update spare part.' });
  }
}

// Delete spare part
async function remove(req, res) {
  try {
    const deleted = await usedSparePartsService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete spare part.' });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}; 