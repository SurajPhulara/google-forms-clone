import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./ViewForm.css"
import axios from 'axios'
import { FormControlLabel } from '@mui/material'
// import { Input } from '@mui/material'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ViewForm = () => {
    const { form_id } = useParams({});
    const [state, setState] = useState()
    const [answer, setAnswer] = useState([])
    const navigate = useNavigate()

    // async function show_form() {
    //     axios.get(`https://nice-pleat-crow.cyclic.app/getform/${form_id}`)
    //         .then(response => {
    //             // console.log("loaded form : ", {...response.data.questions_array})
    //             if (response.data) {
    //                 setState(response.data)
    //                 const abc = response.data.questions_array.map((ele, i) => {
    //                     return " "
    //                 })
    //                 const obj = Object.assign({}, abc);
    //                 setAnswer(obj)
    //             }
    //         })
    // }

    useEffect(() => {
        axios.get(`https://nice-pleat-crow.cyclic.app/getfinalform/${form_id}`)
            .then(response => {
                // console.log("loaded form : ", {...response.data.questions_array})
                if (response.data) {
                    setState(response.data)
                    const abc = response.data.questions_array.map((ele, i) => {
                        return " "
                    })
                    const obj = Object.assign({}, abc);
                    setAnswer(obj)
                }
            })
    }, [form_id])

    const save_answer = (i, value) => {
        // console.log(answer)
        const temp = { ...answer, [`${i}`]: value }
        // console.log(temp)
        setAnswer(temp)
    }

    const save_checkbox_answer = (i, value, add) => {
        if (add) {
            const temp = { ...answer, [`${i}`]: [...answer[`${i}`], value] }
            setAnswer(temp)
            // console.log(temp[`${i}`])
        }
        else {
            const temp = answer
            temp[`${i}`] = temp[`${i}`].filter((element) => (element !== value))
            setAnswer(temp)
            // console.log(temp[`${i}`])
        }
    }

    async function submit_form() {
        // console.log("called")
        axios.post(`https://nice-pleat-crow.cyclic.app/saveresponse/${form_id}`, { ...answer })
            .then(navigate(`/form/${form_id}/formResponse`, { state: { a: state.form_title } }))
    }

    return (
        <div>
            <div className="questionFormContainer" style={{ backgroundColor: 'rgb(240,235,248)', height: 'auto', minHeight: '100vh' }}>
                <div className='blankForm'>
                    <div className="viewform__header">
                        {/* <input type="text" className="form__header_title" value={state?.form_title} placeholder='Form title' /> */}
                        <div className="form__header_title" style={{ textTransform: 'none' }}> {state?.form_title} </div>
                        <div className="form__header_desc" style={{ marginTop: '10px' }}>{state?.form_desc} </div>
                        {/* <input type="text" className="form__header_desc" defaultValue={state?.form_desc} placeholder='Form description' /> */}
                    </div>
                    <div className="">
                        {
                            state?.questions_array.map((this_question, i) => (
                                <div key={i} className='viewform_questionBox'>
                                    <div className='qusetionBox__question'> {((this_question.questionStatement === "") ? "Untitled Question" : this_question.questionStatement)} {((this_question.required === true) ? (<span style={{ fontSize: '1.2rem', color: 'red' }}>*</span>) : "")} </div>

                                    {(this_question.questionType === "text") ?
                                        (
                                            <FormControlLabel sx={{ marginLeft: '0px', marginTop: '15px', marginBottom: '18px', width: '80%', borderBottom: "1px dotted rgb(158,158,158)" }} control={<div style={{ display: 'none' }}></div>} label={<input style={{ fontSize: '1rem' }} type="text" onChange={e => save_answer(i, e.target.value)} placeholder='Type your answer here' />} />
                                        ) : (
                                            (this_question.questionType === "checkbox") ?
                                                (this_question.options.map((this_option, j) =>
                                                    <div key={j} className='option_row'>
                                                        <FormControlLabel onChange={e => save_checkbox_answer(i, this_option.option, e.target.checked)} sx={{ paddingLeft: '3px', marginBottom: '8px' }} control={<input style={{ margin: '8px' }} type="checkbox" name={i} />} label={this_option.option} />
                                                    </div>
                                                )) : (
                                                    this_question.options.map((this_option, j) =>
                                                        <div key={j} className='option_row'>
                                                            <FormControlLabel onChange={e => save_answer(i, this_option.option)} sx={{ paddingLeft: '3px', marginBottom: '8px' }} control={<input style={{ margin: '8px' }} type={this_question.questionType} name={i} />} label={this_option.option} />
                                                        </div>
                                                    ))
                                        )
                                    }
                                </div>
                            ))
                        }
                        {(state) ?
                            <Button variant="contained" sx={{ mr: '10px', ml: '15px', pr: '25px', pl: '25px', textTransform: 'none', background: 'rgb(103,58,183)', '&:hover': { backgroundColor: 'rgb(113, 73, 182)' } }} className="formHeader__sendButton" onClick={e => submit_form()} >Submit</Button>
                            :
                            <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewForm
