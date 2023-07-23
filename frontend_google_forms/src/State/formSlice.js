import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  form_title: 'Untitled form',
  form_desc: '',
  quizQuestion: true,
  questions_array: [{
    questionStatement: "Untitled Question",
    questionType: "radio",
    options: [
      { option: "Option 1" }
    ],
    open: true,
    required: false,
  }]
}

// const sleep = ms => new Promise(res => setTimeout(res, ms));

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    new_form_create: (state, action) => {
      state.form_desc = initialState.form_desc
      state.form_title = initialState.form_title
      state.open = initialState.open
      state.required = initialState.required
      state.questions_array = [...initialState.questions_array]
    },
    load_form: (state, action) => {
      if (action.payload) {
        state.form_desc = action.payload.form_desc
        state.form_title = action.payload.form_title
        state.open = action.payload.open
        state.required = action.payload.required
        state.questions_array = [...action.payload.questions_array]
      }
      else { }
    },
    save_form: (state, action) => {
      // console.log("save is called")
      axios.post(`https://googleformsclone-suraj66171.b4a.run/saveform/${action.payload}`, { ...state })
    },
    save_form2: (state, action) => {
      // console.log("save 2 is called")
      axios.post(`https://googleformsclone-suraj66171.b4a.run/saveform/${action.payload}`, { ...initialState })
    },
    change_form_title: (state, action) => {
      state.form_title = action.payload;
    },
    change_form_desc: (state, action) => {
      // console.log(action.payload)
      state.form_desc = action.payload;
    },
    add_option: (state, action) => {
      state.questions_array[action.payload].options = [...state.questions_array[action.payload].options, { option: "Option " + (state.questions_array[action.payload].options.length + 1) }]
    },
    toggle_expanded: (state, action) => {
      // console.log(action)
      state.questions_array.forEach((q, i) => {
        state.questions_array[i].open = false
      })
      state.questions_array[action.payload].open = true;
    },
    change_question_text: (state, action) => {
      state.questions_array[action.payload[1]].questionStatement = action.payload[0]
      // console.log(state.questions_array[action.payload[1]].questionStatement)
    },
    change_question_type: (state, action) => {
      state.questions_array[action.payload[1]].questionType = action.payload[0]
      // console.log(state.questions_array[action.payload[1]].questionType)
    },
    change_option_text: (state, action) => {
      state.questions_array[action.payload[1]].options[action.payload[2]].option = action.payload[0]
      // console.log(state.questions_array[action.payload[1]].options[action.payload[2]].option)
    },
    delete_option: (state, action) => {
      state.questions_array[action.payload[0]].options.splice(action.payload[1], 1);
      // console.log("a state is successfully")
    },
    duplicate_question: (state, action) => {
      state.questions_array.splice(action.payload, 0, { ...state.questions_array[action.payload], open: false })
    },
    delete_question: (state, action) => {
      state.questions_array.splice(action.payload, 1)
      if (action.payload > 0)
        state.questions_array[action.payload - 1].open = true;
      else if (state.questions_array.length > 0)
        state.questions_array[0].open = true;
    },
    toggle_required: (state, action) => {
      state.questions_array[action.payload].required = !state.questions_array[action.payload].required
      console.log(state.questions_array[action.payload].required)
    },
    add_question: (state, action) => {
      if (action.payload >= 0) {
        state.questions_array[action.payload].open = false
        state.questions_array.splice(action.payload + 1, 0, {
          questionStatement: "Untitled Question",
          questionType: "radio",
          options: [
            { option: "Option 1" },
          ],
          open: true,
          required: false,
        })
      }
      else {
        state.questions_array = [{
          questionStatement: "",
          quizQuestion: true,
          questionType: "radio",
          options: [
            { option: "Option 1" },
          ],
          open: true,
          required: false,
        }]
      }
      // console.log("a state is successfully")
    },
    handle_drag_drop: (state, action) => {
      const [temp] = state.questions_array.splice(action.payload[0], 1)
      state.questions_array.splice(action.payload[1], 0, temp)
      console.log("a state is successfully")
    },

  },
})

// Action creators are generated for each case reducer function
export const { new_form_create, load_form, save_form, save_form2, change_form_title, change_form_desc, toggle_expanded, change_question_text, change_question_type, change_option_text, duplicate_question, delete_question, toggle_required, delete_option, add_question, handle_drag_drop, add_option, } = formSlice.actions

export default formSlice.reducer
