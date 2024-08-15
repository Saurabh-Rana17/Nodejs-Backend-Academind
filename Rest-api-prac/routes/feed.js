const express = require('express')
const { getPosts } = require('../controllers/feed')


const router = express.Router()

router.get('/posts',getPosts)

module.exports = router