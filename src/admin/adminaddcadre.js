import '../App.css';
import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { alpha, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
    borderBottomColor:'red',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius:'10px',
    '& fieldset': {
      borderColor: 'red',
    },
    '&:hover fieldset': {
      borderColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

const addComission=(abc)=>{
     axios.post("https://active-backend.onrender.com/api/cadres/add",{
        cadreName:`${abc}`,
    }).then((res)=>{
        if(res.status==200)
        document.getElementById("adding_comission_text").value="";
        alert("Cadre added succesfully");
    })
}

function clear()
{
  localStorage.clear();
  window.location.href = '/login';
}



export default function AdminCadreAdd()
{
    const [name,setName]=useState("");
    return(
        <div className="App">
       <div className='navbar' >
        <img className='policelogo' src="./pic-removebg-preview.png" alt='policelogo' />

        <div style={{margin:'auto',marginTop:'15px'}}><h1><b>AP POLICE</b></h1></div>

        <div className="section">
          <DropdownButton className='select' id="dropdown-basic-button" title="Change Commission">
            <Dropdown.Item href="#/action-1">Sc & St</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Bc</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Women Rights</Dropdown.Item>
          </DropdownButton>
          {/* <Button className='navbutton' variant="outlined">Log Out</Button> */}
          <Button className='navbutton' variant="contained" onClick={() => { clear(); }}>Log Out</Button>
        </div>
      </div>
        <div className='sidebar'>
        <Link to='/adminhome' style={{textDecoration:'none'}}><Button className='sidebarbuttons' variant="contained" style={{borderRadius:'20px'}}><b> Home</b></Button></Link>
          
          <div class="accordion">
                <div className='dropdown'>
                    <input type="checkbox" name="example_accordian" id="Section3" class="accordion__input"/>
                    <label for="Section3" class="accordion__label" ><b style={{color:'white',backgroundColor:'rgb(86, 162, 224)'}}>USER</b> </label>

                    <div class="accordion__content">
                        <div style={{marginBottom:'10px'}}><Link to='/adminuseradd' style={{textDecoration:'none'}}><Button className='menuchild' variant="contained" style={{borderRadius:'20px'}}><b> Add</b></Button></Link> </div>
                        <Link to='/adminuserview' style={{textDecoration:'none'}}><Button className='menuchild' variant="contained" style={{borderRadius:'20px'}}><b> View</b></Button></Link>
                    </div>
                </div>
                <div className='dropdown'>
                    <input type="checkbox" name="example_accordian" id="Section1" class="accordion__input"/>
                    <label for="Section1" class="accordion__label" style={{color:'white',backgroundColor:'rgb(86, 162, 224)'}}><b >OFFICERS</b> </label>

                    <div class="accordion__content">
                     <div style={{ marginBottom: '10px' }}>
                         <Link to='/adminofficeradd' style={{ textDecoration: 'none' }}><Button className='menuchild' variant="contained" style={{ borderRadius: '20px' }}><b> Add</b></Button></Link> </div>
                        <Link to='/adminofficerview' style={{textDecoration:'none'}}><Button className='menuchild' variant="contained" style={{borderRadius:'20px'}}><b> View</b></Button></Link>
                    </div>
                    
                </div>
                <div style={{marginTop:'5px'}}>
                    <input type="checkbox" name="example_accordian" id="Section2" class="accordion__input" />
                    <label for="Section2" class="accordion__label" style={{color:'white',backgroundColor:'rgb(86, 162, 224)'}}><b>COMMISSION</b> </label>

                    <div class="accordion__content">
                        <div style={{marginBottom:'10px'}}><Link to='/admincommissionadd' style={{textDecoration:'none'}}><Button className='menuchild' variant="contained" style={{borderRadius:'20px'}}><b> Add</b></Button></Link></div>
                        <Link to='/admincommissionview' style={{textDecoration:'none'}}><Button className='menuchild' variant="contained" style={{borderRadius:'20px'}}  ><b> View</b></Button></Link> 
                    </div>
                </div>
            
          <Link to='/adminhistory' style={{textDecoration:'none'}}><Button className='sidebarbuttons' variant="contained" style={{ borderRadius: '20px' }}><b> History</b></Button></Link>
          <Link to='/adminreport' style={{ textDecoration: 'none' }}><Button className='sidebarbuttons' variant="contained" style={{ borderRadius: '20px' }}><b> Report</b></Button></Link>
            <Link to='/admincadre' style={{textDecoration:'none'}}><Button className='sidebarbuttons' variant="contained" style={{borderRadius:'20px'}}><b> Cadre</b></Button></Link>
        </div>
        </div>
        <div className='content_div'>
           <div className='comission_add_box'>
           <h1>Add CADRE</h1>
            <CssTextField sx={{width:'100%',backgroundColor:'white',borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}}
            variant="filled"
            id="adding_comission_text"
            onChange={(e)=>{
                setName(e.target.value);
            }}
            label="Cadre Name"
              placeholder="Eg:SI,CI"
              required
            multiline
            />
            <button style={{borderRadius:'5px',backgroundColor:'Skyblue',height:'2rem',width:'8rem',marginTop:'1rem'}}
            onClick={()=>{
                if(name.trim()!="")
                {
                addComission(name);
                setName("");
                }
                else
                alert("fill all the fields");
            }}
            >Add Cadre</button>
           </div>
        </div>
    </div>
  );
}