import mongoose from "mongoose";

const form_schema = new mongoose.Schema({
    form_id: String,
    form_title: String,
    form_desc: String,
    questions_array: [{
        questionStatement: String,
        quizQuestion: Boolean,
        questionType: String,
        options: [
            { option: String },
        ],
        open: Boolean,
        required: Boolean,
    }]
},{ timestamps: {type: Date().toLocaleString() } })

export default mongoose.model('Form', form_schema )