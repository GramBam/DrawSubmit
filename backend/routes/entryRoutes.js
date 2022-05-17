const express = require('express')
const router = express.Router()
const { getEntries, createEntry, getLatest, deleteEntry, getAmount, getOne } = require('../controllers/entryController')

router.route('/').get(getEntries).post(createEntry)
router.route('/amount').get(getAmount)
router.route('/latest').get(getLatest)
router.route('/getOne').get(getOne)
router.route('/delete').delete(deleteEntry)

module.exports = router