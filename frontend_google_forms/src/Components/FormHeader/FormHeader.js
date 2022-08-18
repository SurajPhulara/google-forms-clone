import React, { useState } from 'react'
import gform from "../../Assets/gform.png";
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import { IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import UTurnLeftIcon from '@mui/icons-material/UTurnLeft';
import UTurnRightIcon from '@mui/icons-material/UTurnRight';
import MoreVert from '@mui/icons-material/MoreVert';
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';
import "./FormHeader.css"
import { useSelector, useDispatch } from 'react-redux'
import {change_form_title } from '../../State/formSlice';
// import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
// import PersonIcon from '@mui/icons-material/Person';
// import AddIcon from '@mui/icons-material/Add';
// import Typography from '@mui/material/Typography';
// import { blue } from '@mui/material/colors';




const FormHeader = () => {
    const { form_id } = useParams();

    const questions_state = useSelector((state) => state.form);
    const dispatch = useDispatch()
    // const navigate = useNavigate();

    const [open,setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
      }
    

      function SimpleDialog(props){
        const { onClose, open } = props;
        // const handleClose = () => {
        //     onClose();
        //   };
          function copy(){
            navigator.clipboard.writeText(`https://googleformsclone.netlify.app/form/${form_id}/viewform`)
          }
          return (
            <Dialog open={open}>
              <DialogTitle>Send form</DialogTitle>
              <List sx={{ pt: 0 }}>
                {/* {emails.map((email) => ( */}
                  <ListItem button onClick={() =>(console.log("pp"))}>
                    <ListItemAvatar sx={{width:'fit-content'}}>
                        {`https://googleformsclone.netlify.app/form/${form_id}/viewform`}
                    </ListItemAvatar>
                    <ListItemText />
                  </ListItem>
                {/* ))} */}
        
                {/* <ListItem autoFocus button > */}
                  {/* <ListItemAvatar> */}
                  <div style={{float:'right', marginRight:'15px'}}>
                  <Button variant="text" sx={{color:'gray', marginRight:'20px'}} onClick={onClose} >Cancel</Button>
                  <Button variant="outlined" sx={{color:'grey'}} onClick={copy} >Copy</Button>
                  </div>
                  {/* </ListItemAvatar> */}
                  {/* <ListItemText primary="Add account" /> */}
                {/* </ListItem> */}
              </List>
            </Dialog>
          );
    }
    
    SimpleDialog.propTypes = {
        onClose: PropTypes.func,
        open: PropTypes.bool,
      };



    return (
        <div className='FormHeader'>
            <div className="headerLeft">
                <img src={gform} alt="google form logo" className='headerLeft__formLogo'/>
                {/* <span className='headerLeft__formTitle'>Untitled form</span> */}
                <input type="text" placeholder='UntitledForm' value={questions_state.form_title} className='headerLeft__formTitle' onChange={e => dispatch(change_form_title(e.target.value))} />
            </div>
            <div className="formHeaderRight">
                <IconButton>
                    <PaletteOutlinedIcon />
                </IconButton>
                <Tooltip title="preview">
                    <IconButton onClick={e => (window.open(`/form/${form_id}/viewform`,'_blank') )}>
                        <VisibilityOutlinedIcon />
                    </IconButton>
                </Tooltip>
                <IconButton>
                    <UTurnLeftIcon sx={{transform: "rotate(90deg)"}}/>
                </IconButton>
                <IconButton>
                    <UTurnRightIcon sx={{transform: "rotate(270deg)"}}/>
                </IconButton>
                <Button variant="contained" sx={{mr: '10px', ml: '15px', pr: '25px', pl: '25px', textTransform: 'none', background: 'rgb(103,58,183)', '&:hover': {backgroundColor: 'rgb(113, 73, 182)'}}} className="formHeader__sendButton" onClick={handleClickOpen}>Send</Button>
                <SimpleDialog open={open} onClose={handleClose} />
                <IconButton>
                    <MoreVert />
                </IconButton>
                <IconButton>
                    <Avatar />
                </IconButton>
            </div>
        </div>
    )
}

export default FormHeader
