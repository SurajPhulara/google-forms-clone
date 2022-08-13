import React from 'react'
import FormHeader from '../FormHeader/FormHeader'
import FormTabs from '../FormTabs/FormTabs'
import QuestionForm from '../QuestionForm/QuestionForm'
import "./NewForm.css"

const NewForm = () => {
  return (
    <div className='newForm'>
      <div className='newForm__HeaderSection'>
        <FormHeader />
        <FormTabs />
      </div>
      {/* <div className="newForm__body">
        <QuestionForm />
      </div> */}
    </div>
  )
}

export default NewForm
