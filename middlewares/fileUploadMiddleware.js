const bodyParser = require("body-parser");
const Busboy = require("busboy");
const getRawBody = require("raw-body");
const contentType = require("content-type");

module.exports = (path, app) => {
       app.use(bodyParser.json());
       app.use(bodyParser.urlencoded({
              extended: true
       }));
       app.use((req, res, next) => {
              if (req.rawBody === undefined && req.method === "POST" && req.headers["content-type"]) {
                     if (req.headers["content-type"].startsWith("multipart/form-data")) {
                            getRawBody(req, {
                                   length: req.headers["content-length"],
                                   limit: "10mb",
                                   encoding: contentType.parse(req).parameters.charset
                            }, function (err, string) {
                                   if (err) return next(err)
                                   req.rawBody = string;
                                   next();
                            })
                     }
                     next();
              } else {
                     next();
              }
       })

       app.use((req, res, next) => {
              console.log('busboy middleware processing uploaded file')
              if (req.method === "POST" && req.headers["content-type"]) {
                     if (req.headers["content-type"].startsWith("multipart/form-data")) {
                            const busboy = Busboy({
                                   headers: req.headers
                            });
                            let buffer = Buffer.from("");
                            req.files = {
                                   file: []
                            };

                            busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
                                   file.on("data", (data) => {
                                          buffer = Buffer.concat([buffer, data]);
                                   });

                                   file.on("end", () => {
                                          const file_object = {
                                                 fieldname,
                                                 originalname: filename,
                                                 encoding,
                                                 mimetype,
                                                 buffer
                                          };
                                          // req.files.file = file_object
                                          req.files.file = file_object;
                                          next();
                                   });
                            });

                            busboy.end(req.rawBody);
                     }
                     next();
              } else {
                     next();
              }
       })
}