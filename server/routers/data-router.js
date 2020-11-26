const express = require('express')

const DataCtrl = require('../controllers/data-ctrl')

const router = express.Router()

router.post('', DataCtrl.createData)
router.delete('', DataCtrl.deleteData)
router.get('', DataCtrl.getData)

module.exports = router