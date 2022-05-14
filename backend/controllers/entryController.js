const asyncHandler = require('express-async-handler')
const Entry = require('../models/entryModel')

const getEntries = asyncHandler(async (req, res) => {
  console.log(req.query);
  const entries = await Entry.find().sort({ createdAt: 'desc' }).skip(req.query.from).limit(req.query._limit)
  res.status(200).json(entries)
})

const getLatest = asyncHandler(async (req, res) => {
  console.log(req);
  const entry = await Entry.findOne({}, {}, { sort: { 'createdAt': -1 } })
  res.status(200).json(entry)
})


const createEntry = asyncHandler(async (req, res) => {
  const { dataURL, title } = req.body

  if (!dataURL.includes('data:image/png;base64')) {
    return res.status(400).json({ message: 'Nice try' })
  }
  const entry = await Entry.create({ dataURL, title })

  // Created
  res.status(201).json(entry)
})

module.exports = { getEntries, createEntry, getLatest }