const asyncHandler = require('express-async-handler')
const Entry = require('../models/entryModel')

const getEntries = asyncHandler(async (req, res) => {
  const entries = await Entry.find()
  res.status(200).json(entries)
})


const createEntry = asyncHandler(async (req, res) => {
  const { dataURL, title } = req.body
  const entry = await Entry.create({ dataURL, title })

  // Created
  res.status(201).json(entry)
})

module.exports = { getEntries, createEntry }