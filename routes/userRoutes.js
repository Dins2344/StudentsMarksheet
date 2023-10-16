const express = require("express");
const controller = require("../controllers/controllers");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }
    if (!fs.existsSync("public/csv")) {
      fs.mkdirSync("public/csv");
    }
    cb(null, "public/csv");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== ".csv") {
      return cb(new Error("only csv files allowed"));
    }
    cb(null, true);
  },
});

const router = express.Router();

router.post("/upload", upload.single("csvFile"), controller.createData);

router.get("/students/:id/result", controller.resultStatus);
router.get("/students", controller.getStudents);

module.exports = router;
