const express = require('express');
const router = express.Router();
const usedSparePartsController = require('../controllers/usedSpareParts.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const multer = require('multer');
const path = require('path');

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// GET all spare parts
router.get('/', usedSparePartsController.getAll);
// GET by ID
router.get('/:id', usedSparePartsController.getById);
// CREATE (admin only)
router.post('/', verifyToken, isAdmin, upload.single('image'), usedSparePartsController.create);
// UPDATE (admin only)
router.put('/:id', verifyToken, isAdmin, upload.single('image'), usedSparePartsController.update);
// DELETE (admin only)
router.delete('/:id', verifyToken, isAdmin, usedSparePartsController.remove);

module.exports = router; 