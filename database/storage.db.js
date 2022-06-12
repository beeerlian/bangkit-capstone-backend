const gcsBucket = require("./cloudStorage")

exports.saveImage = (image) => new Promise((resolve, reject) => {
       console.log("uploading " + image.originalname + " to " + gcsBucket.name)
       try {
              const date = new Date().getTime();
              const file = gcsBucket.file(date + '_' + image.originalname.replace(/ /g, "_"));
              const fileStream = file.createWriteStream({
                     resumable: false
              });
              let url
              fileStream.on('finish', () => {
                     url = `https://storage.googleapis.com/${gcsBucket.name}/${file.name}`;
                     console.log('file stream finish ' + url);
                     resolve(url);
              })
                     .on('error', () => {
                            reject(`upload image failed, problem occur`);
                     })
                     .end(image.buffer);
       } catch (error) {
              console.log("[error gcs upload] : " + error.message)
       }
});