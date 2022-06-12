const gcsBucket = require("./cloudStorage")

exports.saveImage = (image) => new Promise((resolve, reject) => {
       console.log("uploading " + image.originalname.filename + " to " + gcsBucket.name)
       const date = new Date().getTime();
       const file = gcsBucket.file(date + '_' + image.originalname.filename.replace(/ /g, "_"));
       const fileStream = file.createWriteStream({
              resumable: false
       });
       let url
       fileStream.on('finish', () => {
              url = `https://storage.googleapis.com/${gcsBucket.name}/${file.name}`;
              console.log('file stream finish ' + url);
              resolve(url);
       })
              .on('error', (error) => {
                     reject(`[error gcs upload] : ${error} upload image failed, problem occur `);
              })
              .end(image.buffer);
});