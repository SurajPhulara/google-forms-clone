import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Form from "./forms_schema.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

const database_url = process.env.DATABASE;

const connectDB = async () => {
  try {
    await mongoose.connect(database_url, { useUnifiedTopology: true });
    console.log("Connected to the database");

    const Response = mongoose.model("Response", {
      form_id: String,
      responses: [{}],
    });

    app.get("/getform/:form_id", (req, res) => {
      Form.findOne({ form_id: `${req.params.form_id}` }, (err, docs) => {
        if (err) console.log("error finding");
        else {
          res.send(docs);
        }
      });
    });

    app.get("/getfinalform/:form_id", (req, res) => {
      Form.findOne({ form_id: `${req.params.form_id}` }, (err, docs) => {
        if (err) console.log("error finding");
        else {
          if (docs) {
            res.send(docs);
          } else {
            const docs = {
              form_title:
                "looks like the form doesn't exist or the admin didn't save the form",
              form_desc: "",
              quizQuestion: true,
              questions_array: [],
            };
            res.send(docs);
          }
        }
      });
    });

    app.get("/getallforms", (req, res) => {
      Form.find({}, (err, docs) => {
        if (err) console.log("error finding");
        else {
          res.send(docs);
        }
      }).sort({ updatedAt: -1 });
    });

    app.get("/getAllResponses/:form_id", (req, res) => {
      Response.findOne({ form_id: `${req.params.form_id}` }, (err, docs) => {
        if (err) console.log("error finding");
        else {
          res.send(docs);
        }
      });
    });

    app.post("/saveform/:form_id", function (req, res) {
      Form.findOneAndUpdate(
        { form_id: `${req.params.form_id}` },
        { ...req.body },
        { new: true, upsert: true },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            // console.log("saved form with id : "+ `${req.params.form_id}`);
          }
        }
      );
    });

    app.post("/saveresponse/:form_id", (req, res) => {
      Response.findOneAndUpdate(
        { form_id: `${req.params.form_id}` },
        { $push: { responses: { ...req.body } } },
        { new: true, upsert: true },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            // console.log("saved form with id : ", docs );
          }
        }
      );
    });

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error occurred when connecting to the database:", error);
  }
};

connectDB();
