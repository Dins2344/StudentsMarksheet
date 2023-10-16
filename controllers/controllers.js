const { error } = require("console");
const helpers = require("../helpers/userHelpers");
const csv = require("fast-csv");
const fs = require("fs");
const path = require("path");

module.exports = {
  createData: (req, res) => {
    try {
      fs.createReadStream(
        path.join(__dirname, "../", "/public/csv/" + req.file.filename)
      )
        .pipe(csv.parse({ headers: true }))
        .on("error", (err) => console.log(err))
        .on("data", async (row) => {
          try {
            const response = await helpers.addUser(row);
            if (!response) {
              throw new error("adding details failed");
            }
          } catch (err) {
            console.log(err);
            res.json({ ok: false, message: "adding data failed" });
          }
        })
        .on("end", async (rowCount) => {
          console.log(`${rowCount} rows has parsed`);
          res.json({ ok: true, message: "all data added successfully" });
        });
    } catch (err) {}
  },
  getStudents: async (req, res) => {
    const query = req.query;
    try {
      if (query) {
        const students = await helpers.getStudents(query.resultStatus);
        if (students.length) {
          res.json({ ok: true, students });
        } else {
          res.json({ ok: false, message: "there are no students" });
        }
      } else {
        res.json({ ok: false, message: "query not find" });
      }
    } catch (err) {
      console.log(err);
    }
  },

  resultStatus: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await helpers.getResultStatus(id);
      if (response) {
        res.json({ ok: true, response });
      } else {
        res.json({ ok: false, message: "could not find the result" });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
