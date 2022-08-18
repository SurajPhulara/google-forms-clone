import React, { useState } from 'react'
import "./FormTabs.css"
import { Paper } from '@mui/material'
import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'
import QuestionForm from '../QuestionForm/QuestionForm'
import Responses from '../Responses/Responses'

const FormTabs = () => {
  const [state, setState] = useState("1")

  return (
    <div>
      <Paper sx={{ mt: '0', flex: 1, boxShadow: "none", borderBottom: '1px solid rgb(218,220,224)' }} >
        <Tabs value={state} centered textColor="primary">
          <Tab value={"1"} onClick={e => setState("1")} sx={{ color: "#5f6368", fontSize: 13, textTransform: 'none', fontWeight: '100', }} label="Questions">

          </Tab>
          <Tab value={"2"} onClick={e => setState("2")} sx={{ color: "#5f6368", fontSize: 13, textTransform: 'none', fontWeight: '100', }} label="Responses">
          </Tab>
          <Tab value={"3"} sx={{ color: "#5f6368", fontSize: 13, textTransform: 'none', fontWeight: '100', }} label="Settings">

          </Tab>
        </Tabs>
      </Paper>
      {(state === "1") ? (
        <div className="newForm__body">
          <QuestionForm />
        </div>
      ) : (
        <div className="newForm__body">
          <Responses />
        </div>
      )}
    </div>
  )
}

export default FormTabs
