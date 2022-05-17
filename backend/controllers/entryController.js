const asyncHandler = require('express-async-handler')
const Entry = require('../models/entryModel')

const getEntries = asyncHandler(async (req, res) => {
  const entries = await Entry.find().limit(req.query._limit).skip(req.query.from).sort({ createdAt: 'desc' }).allowDiskUse(true)
  res.status(200).json(entries)
})

const getOne = asyncHandler(async (req, res) => {
  if (req.query.from < 0) {
    return res.status(500)
  }
  const entry = await Entry.findOne({}, {}).allowDiskUse(true).skip(req.query.from)

  res.status(200).json(entry)
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
  // let entry = await Entry.findOne({ createdAt: req.query.createdAt })
  // console.log(entry);
  // entry.remove()
  // let entries = await Entry.find({ title: '' })
  // let x = entries.filter((e) => new Date(e.createdAt).toLocaleTimeString().includes('12:20'))
  // console.log(x);
  // // const entries = await Entry.find({ title: req.body.title })
  // for (let i = 0; i < x.length; i++) {
  //   const element = x[i];
  //   await element.remove()
  //   console.log('REMOVED: ', element.title, element.createdAt);
  // }
})

module.exports = { getEntries, createEntry, getLatest, deleteEntry, getAmount, getOne }