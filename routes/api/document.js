const documentSchema = require("../../schemas/document");
const express = require("express");
const routes = express.Router();
const multer = require("multer");
const fs = require("fs");
const jwtVerify = require("../../Midlewares/Auth");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

routes.post("/", jwtVerify, upload.single("document"), async (req, res) => {
  console.log(
    req.file.filename,
    req.file.mimetype,
    req.file.size / (1024 * 1024)
  );
  // console.log(req.file)
  // console.log(req.file.buffer.toString('base64'))
  // console.log(req.user._id)
  try {
    // console.log(fs.readFileSync(path.join('uploads/' + req.file.filename)))
    console.log(18);
    const obj = {
      title: req.file.filename,
      document: {
        data: req.file.buffer.toString("base64"),
        contentType: req.file.mimetype,
      },
      user: req.user._id,
    };
    const response = await documentSchema.create(obj);
    console.log(29);
    // res.json({ message: response });
    res.json({url:`${process.env.BASE_URL}/api/document/${response._id}`})
    console.log(response);
  } catch (error) {
    res.json({ error: error });
  }
});

routes.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const response = await documentSchema.findOne({ _id: req.params.id });
    if (!response) {
      res.json({ message: "document not found" });
      return;
    }
    console.log(response.document.contentType);
    var buf = Buffer.from(response.document.data, "base64");
    // res.setHeader('Content-Length', buf.data.length);
    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', 'inline; filename=file.pdf');
    //   console.log(buf)
    // res.type('application/pdf');
    // res.header('Content-Disposition', 'attachment; filename="file.pdf"');
    // res.send(`data:application/pdf;base64,${response.document.data}`);
    res.send(
      `<embed style="width: 100vw; height: 100vh;" src='data:${response.document.contentType};base64,${response.document.data}'/>`
    );
    // res.set('Content-Type', response.document.contentType);
    // res.send(response.document.data.buffer);
    return;
  } catch (error) {
    console.log(error);
    res.json({ error: error });
    return;
  }
});

module.exports = routes;
