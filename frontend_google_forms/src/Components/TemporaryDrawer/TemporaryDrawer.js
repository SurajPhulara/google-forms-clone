import React, { useState } from 'react'
import "./TemporaryDrawer.css"
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { Drawer } from '@mui/material';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { Divider } from '@mui/material';
import google from "../../Assets/google.png"
import docs from "../../Assets/docs.png"
import gform from "../../Assets/gform.png"
import drive from "../../Assets/drive.png"
import sheets from "../../Assets/sheets.png"
import slides from "../../Assets/slides.png"
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const TemporaryDrawer = () => {

  const [drawerState, setDrawerState] = useState({
    left: false
  })

  const toggleDrawer = (anchor, value) => (event) => {
    setDrawerState({...drawerState, [anchor]:value});
  }

  return (
    <div>
        <IconButton onClick={toggleDrawer("left", true)}>
          <MenuIcon />
        </IconButton>
        <Drawer className='drawer' anchor={'left'} open={drawerState['left']} onClose={toggleDrawer("left", false)}>
          <div className='drawer__items' role="presentation">
            <List className='drawer__list'>
              <ListItem>
                <img src={google} alt="" className='drawer__googleLogo'/>
                <h2 className='headerLeft__heading'>Forms</h2>
              </ListItem>
              <Divider />
              <ListItem className='drawer__servicesList'>
                <img src={docs} alt="" className='drawer__listImage_docs'/>
                <p className='drawer__listText'>Docs</p>
              </ListItem>
              <ListItem className='drawer__servicesList'>
                <img src={sheets} alt="" className='drawer__listImage'/>
                <p className='drawer__listText'>Sheets</p>
              </ListItem>
              <ListItem className='drawer__servicesList'>
                <img src={slides} alt="" className='drawer__listImage'/>
                <p className='drawer__listText'>Slides</p>
              </ListItem>
              <ListItem className='drawer__servicesList'>
                <img src={gform} alt="" className='drawer__listImage'/>
                <p className='drawer__listText'>Forms</p>
              </ListItem >
              <Divider className='drawer__dividerTwo'/>
              <ListItem className='drawer__servicesList'>
                <SettingsIcon />
                <p className='drawer__listText'>Settings</p>
              </ListItem>
              <ListItem className='drawer__servicesList'>
                <HelpOutlineOutlinedIcon />
                <p className='drawer__listText'>Help & Feedback</p>
              </ListItem>
              <Divider className='drawer__dividerTwo'/>
              <ListItem className='drawer__servicesList'>
              <img src={drive} alt="" className='drawer__listImage'/>
                <p className='drawer__listText'>Drive</p>
              </ListItem>
              <Divider className='drawer__dividerTwo'/>
            </List>
          </div>
        </Drawer>
    </div>
  )
}

export default TemporaryDrawer
