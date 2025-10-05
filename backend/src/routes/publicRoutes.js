const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, createApplication } = require('../controllers/publicController');

router.get('/courses', getCourses);
router.get('/courses/:id', getCourseById);
router.post('/applications', createApplication);

module.exports = router;