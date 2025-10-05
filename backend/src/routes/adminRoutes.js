const express = require('express');
const router = express.Router();
const { login, getApplications, updateApplicationStatus, getDashboardStats } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', login);
router.get('/applications', protect, getApplications);
router.put('/applications/:id', protect, updateApplicationStatus);
router.get('/dashboard', protect, getDashboardStats);


module.exports = router;