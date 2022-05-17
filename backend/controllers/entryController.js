const asyncHandler = require('express-async-handler')
const Entry = require('../models/entryModel')

const getEntries = asyncHandler(async (req, res) => {
  const entries = await Entry.find().sort({ createdAt: 'desc' }).skip(req.query.from).limit(req.query._limit)
  res.status(200).json(entries)
})

const getLatest = asyncHandler(async (req, res) => {
  const entry = await Entry.findOne({}, {}, { sort: { 'createdAt': -1 } })
  res.status(200).json(entry)
})

const getAmount = asyncHandler(async (req, res) => {
  const amount = await Entry.count()
  res.status(200).json(amount)
})


const createEntry = asyncHandler(async (req, res) => {
  const { dataURL, title } = req.body

  if (!dataURL.includes('data:image/png;base64') || title.length > 12) {
    return res.status(400).json({ message: 'Nice try' })
  }
  const entry = await Entry.create({ dataURL, title })

  // Created
  res.status(201).json(entry)
})

const deleteEntry = asyncHandler(async (req, res) => {
  const entries = await Entry.find({ title: req.body.title })
  for (let i = 0; i < entries.length; i++) {
    const element = entries[i];
    await element.remove()
    console.log('REMOVED: ', element.title, element.createdAt);
  }
})

module.exports = { getEntries, createEntry, getLatest, deleteEntry, getAmount }