const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '300bcc1443f94b7cb205ce17da62b8f5'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('Error'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(data => { res.json(data[0]) })
        .catch(err => res.status(400).json('Error'));
}

module.exports = {
    handleImage, handleApiCall
}