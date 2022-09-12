// importing
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Form from "./forms_schema.js"
import dotenv from "dotenv";
dotenv.config();
// dotenv.config()

// app config
const app = express()
const PORT = process.env.PORT || 9000


// middleware
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})


// DB config
const database_url = process.env.DATABASE
mongoose.connect(database_url, { useUnifiedTopology: true })
    .then(() => console.log("connected to database"))
    .catch((e) => console.log("error occured when connecting to database "))

// abcd.save()
    // .then(doc => {
    //     console.log(doc)
    // })
// .catch(err => {
//     console.error(err)
// })

const Response = mongoose.model('Response', {
    form_id: String,
    responses : [
        { },
    ]
})

// routes
app.get("/getform/:form_id", (req, res) => {
    Form.findOne({ form_id: `${req.params.form_id}` }, (err, docs) => {
        if (err) console.log("error finding")
        else {
            res.send(docs)
            // console.log("retrived data : ",docs)
        }
    })
})

app.get("/getfinalform/:form_id", (req, res) => {
    Form.findOne({ form_id: `${req.params.form_id}` }, (err, docs) => {
        if (err) console.log("error finding")
        else {
            if(docs)
            {
                res.send(docs)
            }
            else{
                const docs = {
                    form_title: "looks like the form doesn't exist or the admin didn't saved the form"
                  }
                res.send(docs)
            }
            // console.log("retrived data : ",docs)
        }
    })
})

app.get("/getallforms", (req, res) => {
    Form.find({}, (err, docs) => {
        if (err) console.log("error finding")
        else {
            res.send(docs)
            // console.log("retrived data : ",docs)
        }
    }).sort({ updatedAt: -1 })
})

app.get("/getAllResponses/:form_id", (req, res) => {
    Response.findOne({ form_id: `${req.params.form_id}` }, (err, docs) => {
        if (err) console.log("error finding")
        else {
            res.send(docs)
            // console.log("retrived data : ",docs)
        }
    })
} )

app.post("/saveform/:form_id", function (req, res) {
    Form.findOneAndUpdate({ form_id: `${req.params.form_id}` }, { ...req.body }, { new: true, upsert: true }, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            // console.log("saved form with id : "+ `${req.params.form_id}`);
        }
    })
})

app.post("/saveresponse/:form_id", (req, res) => {
    // console.log("ppppooooooooooo")

    Response.findOneAndUpdate({ form_id: `${req.params.form_id}` }, { $push:{responses : {...req.body }}}, { new: true, upsert: true }, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            // console.log("saved form with id : ", docs );
        }
    })


    // console.log("pppppppppp", req.body)
    // const received_response = new Response({
    //     form_id: `${req.params.form_id}`,
    //     responses : [
    //         {...req.body},
    //     ]
    // })
    // console.log(received_response)
    // received_response.save()
    //     .catch(err => {
    //         console.error(err)
    //     })
})

// listening
app.listen(PORT, () => console.log("connected"))