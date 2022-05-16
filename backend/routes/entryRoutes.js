const express = require('express')
const router = express.Router()
const { getEntries, createEntry, getLatest, deleteEntry } = require('../controllers/entryController')

router.route('/').get(getEntries).post(createEntry)
router.route('/latest').get(getLatest)
// router.route('/delete').delete(deleteEntry)

module.exports = router