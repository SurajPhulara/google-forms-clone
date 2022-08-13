import React, { useEffect, useRef, useState } from 'react'
import "./QuestionForm.css"
import { Divider, Tooltip, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import { AccordionSummary, AccordionDetails } from '@mui/material';
import { Input } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import { IconButton } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import SubjectIcon from '@mui/icons-material/Subject';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Switch } from '@mui/material';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useSelector, useDispatch } from 'react-redux'
import { save_form2, new_form_create, load_form, save_form, change_form_desc, change_form_title, toggle_expanded, change_question_text, add_option, change_question_type, change_option_text, duplicate_question, delete_question, toggle_required, delete_option, add_question, handle_drag_drop, } from '../../State/formSlice';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuestionForm = () => {
    const { form_id } = useParams();
    const questions_state = useSelector((state) => state.form);
    const dispatch = useDispatch()
    const didMount = useRef(0);
    useEffect(()=>{
        dispatch(new_form_create("blank"))
    },[form_id])

    async function abc(){
        axios.get(`https://googleformsclone.herokuapp.com/getform/${form_id}`)
        .then(response =>{
            // console.log("loaded form : ",response.data)
            if(response.data) {
                dispatch(load_form(response.data))
            }
            else{
                // dispatch(save_form2(form_id))
            }
        })
    }

    useEffect(()=>{
        abc()
    },[form_id])

    // useEffect(()=>{
    //     if(didMount.current > 1)
    //     {
    //         dispatch(save_form(form_id))
    //     }
    //     else
    //     {
    //         didMount.current++
    //     }
    // },[questions_state])

    function handleDragDrop(result) {
        if (!result.destination) return;
        dispatch(handle_drag_drop([result.source.index, result.destination.index]))
    }
    const Question = () => {
        return (<>
            <DragDropContext onDragEnd={handleDragDrop} >
                <Droppable droppableId='questions_list'>
                    {(provided) => (
                        <div {...provided.divoppableProps} ref={provided.innerRef} >
                            {questions_state.questions_array.map((this_question, i) => {

                                return (
                                    <Draggable key={i} draggableId={"o".concat(i)} index={i}>
                                        {(provided) => (
                                            <Accordion ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} elevation={0} className={((this_question.open) ? "questionBox__active" : "").concat(" questionBox")} sx={{ marginBottom: '18px', borderRadius: "8px", "&.MuiAccordion-root:before": { opacity: '0' }, height: 'fitContent' }} expanded={questions_state.questions_array[i].open}>
                                                {(questions_state.questions_array[i].open) ? (
                                                    <AccordionSummary sx={{ "&.Mui-focusVisible": { background: 'none' } }}>
                                                        <DragIndicatorIcon className='dragIcon' />
                                                        <div className='questionBox__contents'>
                                                            <div className="questionBox__contents__header">
                                                                <Input sx={{ ':after': { borderBottomColor: 'rgb(103, 58, 183)' } }} className='qusetionBox__question_expanded' type="text" placeholder='Question' value={this_question.questionStatement} onChange={event => dispatch(change_question_text([event.target.value, i]))} />

                                                                <Tooltip title="Add image">
                                                                    <IconButton sx={{ margin: '0 10px' }}>
                                                                        <CropOriginalIcon sx={{ padding: '5px' }} area-label="Add image" />
                                                                    </IconButton>
                                                                </Tooltip>

                                                                <Select MenuProps={{ anchorOrigin: { vertical: -30, horizontal: 'center' } }} className='question_type_selection_box' value={this_question.questionType} onChange={e => dispatch(change_question_type([e.target.value, i]))} sx={{ width: '230px', height: '3.2rem', }}>
                                                                    <MenuItem id="text" value="text" sx={{ backgroundColor: 'white', width: '100%', height: '2.8rem', }}> <div className="question_type"><SubjectIcon sx={{ paddingRight: '15px' }} /> Paragraph </div></MenuItem>
                                                                    <MenuItem id="radio" value="radio" sx={{ backgroundColor: 'white', width: '100%', height: '2.8rem', }}> <div className="question_type"><RadioButtonCheckedIcon sx={{ paddingRight: '15px' }} /> Multiple choice </div></MenuItem>
                                                                    <MenuItem id="checkbox" value="checkbox" sx={{ backgroundColor: 'white', width: '100%', height: '2.8rem', }}> <div className="question_type"><CheckBoxIcon sx={{ paddingRight: '15px' }} /> Checkboxes </div></MenuItem>
                                                                </Select>
                                                            </div>
                                                            {(this_question.questionType === "text") ?
                                                                <FormControlLabel sx={{ marginLeft: '0px', marginBottom: '20px', width: '80%', borderBottom: "1px dotted rgb(158,158,158)" }} control={<div style={{ display: 'none' }}></div>} label={<input disabled style={{ fontSize: '1rem' }} type="text" placeholder='Type your answer here' />} />
                                                                : (
                                                                    <>
                                                                        {this_question.options.map((this_option, j) =>
                                                                            <div key={j} className="option_row">
                                                                                <FormControlLabel sx={{ flex: 1, paddingLeft: '3px' }} control={<input style={{ margin: '8px', marginTop: '3px' }} type={this_question.questionType} name="abcdef" />} label={<Typography sx={{ flex: 1, paddingBottom: '5px', ':hover': { borderBottom: '1px solid rgb(208, 209, 211)' } }}> <input style={{ fontSize: '1rem' }} type='text' placeholder='Option' value={this_option.option} onChange={e => dispatch(change_option_text([e.target.value, i, j]))} /> </Typography>} />
                                                                                <Tooltip title="Add image" className='editOption'>
                                                                                    <IconButton sx={{ margin: '0 5px' }}>
                                                                                        <CropOriginalIcon sx={{ padding: '5px' }} area-label="Add image" />
                                                                                    </IconButton>
                                                                                </Tooltip>
                                                                                {(this_question.options.length > 1) ? (
                                                                                    <Tooltip title="Remove">
                                                                                        <IconButton onClick={e => dispatch(delete_option([i, j]))}>
                                                                                            <CloseIcon sx={{ padding: '5px', opacity: 0.3 }} title="delete" />
                                                                                        </IconButton>
                                                                                    </Tooltip>
                                                                                ) : (
                                                                                    <Tooltip title="Remove" sx={{ visibility: 'hidden' }} >
                                                                                        <IconButton>
                                                                                            <CloseIcon sx={{ padding: '5px' }} title="delete" />
                                                                                        </IconButton>
                                                                                    </Tooltip>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                        <FormControlLabel disabled sx={{ paddingLeft: '3px' }} control={<input style={{ margin: '8px' }} type={this_question.questionType} />} label={<Typography sx={{ textTransform: 'none' }}><span onClick={event => dispatch(add_option(i))}>Add option</span> or <span style={{ color: 'rgb(26,137,238)' }}>add "Other"</span></Typography>} />
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </AccordionSummary>

                                                ) : (
                                                    <AccordionSummary sx={{ "&.Mui-focusVisible": { background: 'none' } }} onClick={event => dispatch(toggle_expanded(i))}>
                                                        <DragIndicatorIcon className=' hidden dragIcon' />
                                                        <div className='questionBox__contents'>
                                                            {/* <input className='qusetionBox__questionl' type="text" placeholder='Question' defaultValue={((this_question.questionStatement === "")?"Question" : this_question.questionStatement) + ((this_question.required===true)? ( <h1>gg</h1> ) : "" )} /> */}
                                                            <div className='qusetionBox__question'> {((this_question.questionStatement === "") ? "Question" : this_question.questionStatement)} {((this_question.required === true) ? (<span style={{ fontSize: '1.2rem', color: 'red' }}>*</span>) : "")} </div>

                                                            {(this_question.questionType === "text") ?
                                                                (
                                                                    <FormControlLabel sx={{ marginLeft: '0px', marginTop: '15px', marginBottom: '18px', width: '80%', borderBottom: "1px dotted rgb(158,158,158)" }} control={<div style={{ display: 'none' }}></div>} label={<input style={{ fontSize: '1rem' }} type="text" placeholder='Type your answer here' />} />
                                                                ) : (
                                                                    this_question.options.map((this_option, j) =>
                                                                        <div key={j} className='option_row'>
                                                                            <FormControlLabel sx={{ paddingLeft: '3px', marginBottom: '8px' }} control={<input style={{ margin: '8px' }} type={this_question.questionType} />} label={this_option.option} />
                                                                        </div>
                                                                    )
                                                                )}
                                                        </div>
                                                    </AccordionSummary>
                                                )}
                                                <AccordionDetails>
                                                    <Divider />
                                                    <div className="questionBox_footer">
                                                        <div className="footer_left">
                                                            {(questions_state.quizQuestion) ? (
                                                                <div className="answer_key">
                                                                    <InventorySharpIcon sx={{ marginRight: '10px' }} />
                                                                    Answer key
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                        <div className="footer_right">
                                                            <Tooltip title="Duplicate">
                                                                <IconButton sx={{ margin: '0 5px' }} onClick={e => dispatch(duplicate_question(i))} >
                                                                    <FilterNoneIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Delete">
                                                                <IconButton sx={{ margin: '0 5px' }} onClick={e => dispatch(delete_question(i))} >
                                                                    <DeleteOutlineIcon sx={{ fontSize: '30px' }} />
                                                                </IconButton>
                                                            </Tooltip>

                                                            <span>
                                                                <Divider orientation='vertical' />
                                                            </span>
                                                            <span className="required">
                                                                Required<Switch sx={{ marginLeft: '10px' }} onChange={e => dispatch(toggle_required(i))} />
                                                            </span>
                                                            <IconButton sx={{ margin: '3px' }}>
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                </AccordionDetails>
                                                <div className={((this_question.open === true) ? "" : "hidden").concat(" edit_question_menu ")}>
                                                    <Tooltip title="Add question" placement='right'>
                                                        <IconButton onClick={e => dispatch(add_question(i))} >
                                                            <AddCircleOutlineIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Import questions" placement='right'>
                                                        <IconButton>
                                                            <InsertDriveFileOutlinedIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Add title and description" placement='right'>
                                                        <IconButton>
                                                            <TextFieldsOutlinedIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Add image" placement='right'>
                                                        <IconButton>
                                                            <CropOriginalIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Add video" placement='right'>
                                                        <IconButton>
                                                            <OndemandVideoIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Add section" placement='right'>
                                                        <IconButton>
                                                            <ViewAgendaOutlinedIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            </Accordion>
                                        )}
                                    </Draggable>
                                )
                            })
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {(questions_state.questions_array.length === 0) ? (
                <div className="edit_question_menu_2">
                    <Tooltip title="Add question" placement='right'>
                        <IconButton onClick={e => dispatch(add_question(-1))} >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Import questions" placement='right'>
                        <IconButton>
                            <InsertDriveFileOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Add title and description" placement='right'>
                        <IconButton>
                            <TextFieldsOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Add image" placement='right'>
                        <IconButton>
                            <CropOriginalIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Add video" placement='right'>
                        <IconButton>
                            <OndemandVideoIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Add section" placement='right'>
                        <IconButton>
                            <ViewAgendaOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            ) : (
                <div className="">
                    {(questions_state.questions_array[questions_state.questions_array.length - 1].open === true) ? (
                        <>
                        <Button variant="contained" component="label" sx={{ marginTop: '15px' }} onClick={e => dispatch(save_form(form_id))}>save</Button>
                        {/* <Button variant="contained" component="label" sx={{ marginTop: '15px' }} onClick={abc}>load</Button> */}
                        </>
                    ) : (
                        <>
                        <Button variant="contained" component="label" onClick={e => dispatch(save_form(form_id))} >save</Button>
                        {/* <Button variant="contained" component="label" onClick={abc} >load</Button> */}
                        </>
                    )}
                </div>
            )}
        </>
        )
    }


    return (
        <div className="questionFormContainer">
            <div className='blankForm'>
                <div className="form__header">
                    <input type="text" className="form__header_title" value={questions_state.form_title} placeholder='Form title' onChange={e => dispatch(change_form_title(e.target.value))} />
                    <input type="text" className="form__header_desc" value={questions_state.form_desc} placeholder='Form description' onChange={e => dispatch(change_form_desc(e.target.value))} />
                </div>

                {Question()}

            </div>
        </div>
    )
}

export default QuestionForm
