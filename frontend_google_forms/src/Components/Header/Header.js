import React from 'react'
import "./Header.css"
import { IconButton } from '@mui/material';
import gform from "../../Assets/gform.png";
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import {Avatar} from '@mui/material';
import TemporaryDrawer from '../TemporaryDrawer/TemporaryDrawer';

const Header = () => {
  return (
    <div className='header'>
      <div className="headerLeft">
        <TemporaryDrawer />
        <img src={gform} alt="google form logo" className='headerLeft__formLogo'/>
        <h2 className='headerLeft__heading'>Forms</h2>
      </div>

      <div className="headerMid">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input type="text" name='search' placeholder='Search'/>
      </div>
      <div className="headerRight">
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton>
          <Avatar src='' sx={{ height: '35px', width: '35px' }}/>
        </IconButton>
      </div>
    </div>
  )
}

export default Header
