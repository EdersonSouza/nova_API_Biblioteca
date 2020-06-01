/*import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
const Usuario = require('../models/usuario');
AWS.config.loadFromPath('./libs/avatar.config.json');

  let s3 = new AWS.S3();
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'papaleguas-avatars',
      acl: 'public-read',
      metadata: function(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `${req.params.id}`)
      }
    })
  });

  module.exports = upload;*/