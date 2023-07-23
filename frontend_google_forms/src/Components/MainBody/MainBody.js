import React, { useEffect, useState } from 'react'
import "./MainBody.css"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IconButton } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import gformsmall from "../../Assets/gformsmall.png"
import untitled from "../../Assets/untitled.png"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MainBody = () => {

  const [state, setState] = useState()

  useEffect(function load_form_data() {
    axios.get("https://googleformsclone-suraj66171.b4a.run/getallforms")
      .then(response => {
        setState(response.data)
      })
    // .catch((e) => console.log("eeeeeeeeeeeeeerrorrrrrrrrrrrrrr"))
  }, [])

  const navigate = useNavigate()
  const load_this_form = (id) => {
    // console.log(id)
    navigate(`/form/${id}/edit`)
  }

  const load_recent_forms = () => {
    return (
      <div className="mainBody__content">
        {
          state?.map((e, i) => (
            <div key={i} className="mainBody__card" onClick={e => {load_this_form(state[i].form_id)}} >
              <img src={untitled} alt="mainBody__cardImage" className="mainBody__cardImage" />
              <p className='mainBody__cardTitle'  style={{textOverflow:'ellipsis', width:'180px' , overflow:'hidden', whiteSpace:'nowrap' }} > {e.form_title} </p>
              <div className="mainBody__cardContent">
                <img src={gformsmall} alt="" className='gforms_logo--small' />
                <span className='mainBody__card__timestamp'>
                  <div style={{textOverflow:'ellipsis', width:'80px', overflow:'hidden', whiteSpace:'nowrap' }} >{e.updatedAt}</div>
                  {/* Opened 22 jul 2022 */}
                </span>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </div>
            </div>
          ))
        }
      </div>
    )
  }

  return (
    <div className='mainBody'>
      <div className="mainBody__top">
        <div className="mainBody__topLeft">
          <div>Recent forms</div>
          <div className='mainBody__topLeft__end'>
            Owned by anyone
            <ArrowDropDownIcon />
          </div>
        </div>
        <div className="mainBody__topRight">
          <IconButton>
            <FormatListBulletedIcon />
          </IconButton>
          <IconButton>
            <SortByAlphaIcon />
          </IconButton>
          <IconButton>
            <FolderOpenIcon />
          </IconButton>
        </div>
      </div>

      {/* <div className=""> */}
        {load_recent_forms()}
      {/* </div> */}
    </div>
  )
}

export default MainBody
