/*const upload = require('../services/file-upload.js');

const singleUpload = upload.single('avatar');

module.exports = app => {

  let User = app.models.usuario;
    app.patch('/avatar/:id', (req, res) => {
      singleUpload(req, res, err => {
        if (err) {
          return res.status(412).json({ msg: 'Erro ao enviar imagem' })
        } else {
          let url = `${req.file.location}?versionId=${req.file.versionId}`;
          User.findByIdAndUpdate(req.params.id, { $set: { avatar: url } })
          .then(result => res.json(url))
          .catch(error => res.json(error))
        }
        //return console.log({'imageUrl': req.file.location})
      })
    })

}*/