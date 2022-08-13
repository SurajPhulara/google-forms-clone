questions.map((this_question, i) => {
    return (
    <div ref={provided.inner}>
        <Accordion ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} elevation={0} className={(this_question.open)?"questionBox__active":" " +" questionBox"} sx={{ marginBottom:'18px' , borderRadius:"8px", "&.MuiAccordion-root:before": {opacity: '0'}, height:'fitContent', transition:'5s height ease' }} expanded={this_question.open}>
    {(this_question.open)?(
            <AccordionSummary sx={{ "&.Mui-focusVisible":{background:'none'}}}>
                
                <div className='questionBox__contents'>
                    <div className="questionBox__contents__header">
                        <Input sx={{':after': { borderBottomColor: 'rgb(103, 58, 183)'}}} className='qusetionBox__question_expanded' type="text" placeholder='Question' value={this_question.questionStatement} onChange={event => changeQuestionStatement(event.target.value, i)} />                            
                        
                        <Tooltip title="Add image">
                            <IconButton sx={{margin: '0 10px'}}>
                                <CropOriginalIcon sx={{padding:'5px'}} area-label="Add image" />
                            </IconButton>
                        </Tooltip>

                        <Select MenuProps={{anchorOrigin: {vertical: -30, horizontal:'center'}}} className='question_type_selection_box' value={this_question.questionType} onChange={e => changeQuestionType(e.target.value,i)} sx={{width:'30%', height:'3.2rem', }}>
                            <MenuItem id="text" value="text" sx={{backgroundColor:'white', width:'100%', height:'2.8rem',}}> <div className="question_type"><SubjectIcon sx={{paddingRight:'15px'}} /> Paragraph </div></MenuItem>
                            <MenuItem id="radio" value="radio" sx={{backgroundColor:'white', width:'100%', height:'2.8rem',}}> <div className="question_type"><RadioButtonCheckedIcon sx={{paddingRight:'15px'}} /> Multiple choice </div></MenuItem>
                            <MenuItem id="checkbox" value="checkbox" sx={{backgroundColor:'white', width:'100%', height:'2.8rem',}}> <div className="question_type"><CheckBoxIcon sx={{paddingRight:'15px'}} /> Checkboxes </div></MenuItem>
                        </Select>
                    </div>


                    {/* {this_question.options.map((this_option, j) => {
                        return (this_question.questionType=="text")?
                        <FormControlLabel sx={{paddingLeft:'11px'}} control={<></>} label={"type your text here"} />
                        :
                            <FormControlLabel sx={{paddingLeft:'11px'}} control={ <input style={{marginRight:'8px'}} type={this_question.questionType} /> } label={this_option.option} />
                        }
                    )} */}

                    {(this_question.questionType=="text")?
                        <FormControlLabel sx={{marginLeft:'0px', marginBottom:'20px', width:'80%' , borderBottom:"1px dotted rgb(158,158,158)"}} control={<div style={{display:'none'}}></div>} label={<input style={{fontSize:'1rem'}}  type="text" placeholder='Type your answer here' />} />
                    :(
                        <>
                            {this_question.options.map((this_option, j) => 
                                <div className="option_row">
                                    {/* <input type="text" style={{borderBottom: '1px solid rgb(103, 58, 183)'}} placeholder={"Option "+ (i+1)} defaultValue={this_option.option} /> */}
                                    <FormControlLabel sx={{flex:1, paddingLeft:'3px'}} disabled control={ <input style={{margin:'8px'}} type={this_question.questionType}  /> } label={<Typography sx={{flex:1,paddingBottom:'5px', ':hover':{borderBottom: '1px solid rgb(208, 209, 211)'}}}> <input style={{fontSize:'1rem'}} type='text' placeholder='Option' value={this_option.option} onChange={e => changeOptionText(e.target.value, i, j) } /> </Typography>} />
                                    <Tooltip title="Add image">
                                        <IconButton sx={{margin: '0 5px'}}>
                                            <CropOriginalIcon sx={{padding:'5px'}} area-label="Add image" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Remove">
                                        <IconButton onClick={e => deleteOption(i , j)}>
                                            <CloseIcon sx={{padding:'5px'}} title="delete" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            )}
                            <FormControlLabel disabled sx={{paddingLeft:'3px'}} control={ <input style={{margin:'8px'}} type={this_question.questionType}  /> } label={<Typography sx={{textTransform:'none'}}><span onClick={ event => addOption(i)}>Add option</span> or <span style={{color:'rgb(26,137,238)'}}>add "Other"</span></Typography>} />
                        </>
                    )
                    }           
                </div>
                {/* </Accordion> */}
            </AccordionSummary>
            
    ):(
        // <Accordion className="questionBox" sx={{borderRadius:"8px", "&.MuiAccordion-root:before": {opacity: '0'}, }} expanded="false" onClick={toggle_expanded}>
            <AccordionSummary sx={{ "&.Mui-focusVisible":{background:'none'}}}   onClick={event => toggle_expanded(i)}>
                <div className='questionBox__contents'>
                    {/* <input className='qusetionBox__questionl' type="text" placeholder='Question' defaultValue={((this_question.questionStatement === "")?"Question" : this_question.questionStatement) + ((this_question.required===true)? ( <h1>gg</h1> ) : "" )} /> */}
                    <div  className='qusetionBox__question'> {((this_question.questionStatement === "")?"Question" : this_question.questionStatement)} {((this_question.required===true)? ( <span style={{fontSize:'1.2rem', color:'red'}}>*</span> ) : "" )} </div>
                    
                    {(this_question.questionType=="text")?
                    (
                        <FormControlLabel sx={{marginLeft:'0px',marginTop:'15px' , marginBottom:'18px', width:'80%' , borderBottom:"1px dotted rgb(158,158,158)"}} control={<div style={{display:'none'}}></div>} label={<input style={{fontSize:'1rem'}}  type="text" placeholder='Type your answer here' />} />
                    ):(
                        this_question.options.map((this_option, j) => 
                            <div className='option_row'>
                                <FormControlLabel sx={{paddingLeft:'3px', marginBottom:'8px'}} control={ <input style={{margin:'8px'}} type={this_question.questionType} /> } label={this_option.option} />
                            </div>
                        )
                    )}
                    {/* {this_question.options.map((this_option, j) => {
                        return (this_question.questionType=="text")?
                        <FormControlLabel sx={{marginLeft:'0px', marginBottom:'18px', width:'80%' , borderBottom:"1px dotted rgb(158,158,158)"}} control={<div style={{display:'none'}}></div>} label={<input  type="text" placeholder='Type your answer here' />} />
                        :
                            <FormControlLabel sx={{paddingLeft:'11px'}} control={ <input style={{marginRight:'8px'}} type={this_question.questionType} /> } label={this_option.option} />
                        }
                    )} */}

                </div>
            </AccordionSummary>
    )}
    <AccordionDetails>
                <Divider />
                <div className="questionBox_footer">
                    <div className="footer_left">
                        {(this_question.quizQuestion)?(
                            <div className="answer_key">
                                <InventorySharpIcon sx={{marginRight:'10px'}} />
                                Answer key
                            </div>
                        ):(
                            ""
                        )}
                    </div>
                    <div className="footer_right">
                        <Tooltip title="Duplicate">
                            <IconButton sx={{margin: '0 5px'}} onClick={e=>duplicateQuestion(i)} >
                                <FilterNoneIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton sx={{margin: '0 5px'}} onClick={e=>deleteQuestion(i)} >
                                <DeleteOutlineIcon sx={{fontSize:'30px'}} />
                            </IconButton>
                        </Tooltip>
                        
                        <span>
                        <Divider orientation='vertical'/>
                        </span>
                        <span className="required">
                            Required<Switch sx={{marginLeft:'10px'}} onChange={e => toggleRequired(e, i)} />
                        </span>
                        <IconButton sx={{margin:'3px'}}>
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </div>
            </AccordionDetails>
            <div className="edit_question_menu">
                <Tooltip title="Add question" placement='right'>
                    <IconButton onClick={e => addQuestion(i)} >
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
    </div>
    )
}) 










import React from 'react'
import "./App.css"
import Header from './Components/Header/Header'
import Template from './Components/Templates/Template'
import MainBody from './Components/MainBody/MainBody'
import NewForm from './Components/NewForm/NewForm'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<> <Header /> <Template /> <MainBody /> </>} />
          <Route path='/form/:a' element={<NewForm />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
