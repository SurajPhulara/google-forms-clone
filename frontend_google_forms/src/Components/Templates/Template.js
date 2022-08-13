import React from 'react'
import "./Template.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import blank from "../../Assets/blank.png"
import party from "../../Assets/party.png"
import contact from "../../Assets/contact.png"
import tshirt from "../../Assets/t-shirt.png"
import event_registration from "../../Assets/event_registration.png"
import rsvp from "../../Assets/rsvp.png"
import uuid from "react-uuid"
import { useNavigate } from "react-router-dom"
import { Divider } from '@mui/material';

const Template = () => {

  const navigate = useNavigate();
  const createForm = () => {
    const id = uuid();
    // console.log(id);
    // navigate.push("/form/"+id)
    navigate(`/form/${id}/edit`)
  }

  return (
    <div className='templateSection'>
      <div className="template_container">
      <div className="templateTop">
        <div className="templateLeft">
          Start a new form
        </div>
        <div className="templateRight">
          <div className="gallery_button">
            Template gallery
            <UnfoldMoreIcon className='template__gallery_button__topdown_con' />
          </div>
          <IconButton sx={{ "&:hover": { backgroundColor: "rgb(189, 193, 198)" } }}>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="templateBody">

        <div className="tempCard" onClick={createForm}>
          <img src={blank} alt="" />
          <span className='cardTitle'>Blank</span>
        </div>
        <div className="tempCard">
          <img src={tshirt} alt="" />
          <span className='cardTitle'>T-Shirt Sign Up</span>
        </div>
        <div className="tempCard">
          <img src={party} alt="" />
          <span className='cardTitle'>Party Invite</span>
        </div>
        <div className="tempCard" style={{overflow: '-moz-hidden-unscrollable'}}>
          <img src={contact} alt="" />
          <span className='cardTitle'>Contact Information</span>
        </div>
        <div className="tempCard" style={{overflow: '-moz-hidden-unscrollable'}}>
          <img src={rsvp} alt="" />
          <span className='cardTitle'>RSVP</span>
        </div>
        <div className="tempCard" style={{overflow: '-moz-hidden-unscrollable'}}>
          <img src={event_registration} alt="" />
          <span className='cardTitle'>Event Registration</span>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Template
