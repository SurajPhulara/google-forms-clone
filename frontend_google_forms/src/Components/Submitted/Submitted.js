import React from 'react'
import "./Submitted.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
// import { Link } from 'react-router-dom'

const Submitted = () => {
    const location = useLocation();
    // console.log("helloooooooooo       :   ",location.state.a)
    const { form_id } = useParams({});
    // console.log(form_id)
    // const navigate = useNavigate();
    return (
        <div>
            <div className="questionFormContainer" style={{ backgroundColor: 'rgb(240,235,248)', height: 'auto', minHeight: '100vh' }}>
                <div className='blankForm'>
                    <div className="viewform__header">
                        <div className="form__header_title" style={{ textTransform: 'none', marginTop:'8px' }}> {location.state.a} </div>
                        <div className="form__header_desc" style={{ textTransform: 'none',marginTop: '20px' }}>Your response has been recorded</div>
                        <div className="form__header_desc" style={{ textTransform: 'none',marginTop: '25px', marginBottom:'10px' }}> <a href={`/form/${form_id}/viewform`} style={{ color:'rgb(66,133,244)'}}  > Submit another response </a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Submitted
