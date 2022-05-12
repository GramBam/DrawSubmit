const express = require('express')
const router = express.Router()
const { getEntries, createEntry } = require('../controllers/entryController')

router.route('/').get(getEntries).post(createEntry)

module.exports = router