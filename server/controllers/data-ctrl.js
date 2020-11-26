const Data = require('../models/data-model')

createData = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide data',
        })
    }

    const data = new Data(body)

    if (!data) {
        return res.status(400).json({ success: false, error: err })
    }

    data
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: data._id,
                message: 'Data created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Data not created!',
            })
        })
}


deleteData = async (req, res) => {
    await Data.remove({}, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404)
                .json({ success: false, error: `Data not found` })
        }

        return res.status(200).json({ success: true, data: data })
    }).catch(err => console.log(err))
}


getData = async (req, res) => {
    await Data.find({}, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!data.length) {
            return res
                .status(404)
                .json({ success: false, error: `Data not found` })
        }
        return res.status(200).json({ success: true, data: data })
    }).catch(err => console.log(err))
}

module.exports = {
    createData,
    deleteData,
    getData,
}