const express = require('express')

const DataCtrl = require('../controllers/data-ctrl')

const router = express.Router()

router.post('/data', DataCtrl.createData)
router.delete('/data', DataCtrl.deleteData)
router.get('/data', DataCtrl.getData)

module.exports = router