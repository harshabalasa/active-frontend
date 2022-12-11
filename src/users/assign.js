import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import '../App.css';
import Button from '@mui/material/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function assign(abc) {
  console.log(abc);
    axios.post("https://active-backend.onrender.com/api/tasks/add", abc).then((res) => {
      if (res.status == 200) {
        alert("task added succesfully");
        window.location.reload();
      }
    })
}

function clear()
{
  localStorage.clear();
  window.location.href = '/login';
}

export default function Task()
{
  const [officernames, setOfficernames] = useState([]);
  const [selcetedOfficers, setSelectedOfficers] = useState([]);
  const [id1, setId1] = useState("");
  const [id2, setId2] = useState("");
  const [due, setDue] = useState("");
  const [comissions, setCommissions] = useState((JSON.parse(localStorage.getItem('userlog'))).commission);
  const [selectedCommission, setSelectedCommission] = useState(null);
  
  useEffect(() => {
    document.body.style.zoom = "90%";
      axios.get("https://active-backend.onrender.com/api/officers").then((res)=>{
        if(res.status==200)
        {
            let officers=res.data.officers;
            let newOfficers=[];
            for(var x of officers)
            newOfficers.push({...x,status:0});
            setOfficernames(newOfficers);
        } 
      })
    // setCommissions(localStorage.getItem("userlog"));
    //console.log(JSON.parse(localStorage.getItem("userlog")));
  },[]);  
  return (
    <>
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
        <Link to='/userhome' style={{textDecoration:'none'}}><Button className='sidebarbuttons' variant="contained" style={{borderRadius:'20px'}}><b> Home</b></Button></Link>
          <Link to='/userassign' style={{textDecoration:'none'}}><Button className='sidebarbuttons' variant="contained" style={{borderRadius:'20px'}}><b> Assign</b></Button></Link>
          <Link to='/userhistory' style={{textDecoration:'none'}}><Button className='sidebarbuttons' variant="contained" style={{ borderRadius: '20px' }}><b> History</b></Button></Link>
          <Link to='/userreport' style={{ textDecoration: 'none' }}><Button className='sidebarbuttons' variant="contained" style={{ borderRadius: '20px' }}><b> Report</b></Button></Link>

        </div>
      <div className='content_div'>
        <div className="assignform">
                    <h2><b>ASSIGN</b></h2>
                <br />
                    <TextField type="text" label="Application Id1" variant="filled" sx={{backgroundColor:'white',width:'100%'}}  placeholder="Application ID 1" name="id1" id="id1" onChange={(e)=>{setId1(e.target.value)}}/><br/><br/>
                    <TextField type="text" label="Application Id2" variant="filled" sx={{backgroundColor:'white',width:'100%'}} placeholder="Application ID 2" name="id2" id="id2"  onChange={(e)=>{setId2(e.target.value)}}/><br/><br/>
                <div class="form-floating mb-3" className="off">

          <Stack spacing={3} sx={{ width: '100 %' }}>
      <Autocomplete
        multiple
        id="tags-standard"
                options={officernames}
                onChange={(e,v)=>{setSelectedOfficers(v)}} 
        getOptionLabel={(option) => option.officerName}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{backgroundColor:'white',width:'100%'}}
                variant="filled"
            placeholder="Select officer" 
            names="officer"
          />
        )}
      /><br/>
          </Stack>
    <Stack spacing={3} sx={{ width: '100 %' }}>
    <Autocomplete
        options={comissions}
        getOptionLabel={(option)=>option.name}
        onChange={(e,value)=>{setSelectedCommission(value);}}
        renderInput={(params) => (
          <TextField {...params}
            sx={{backgroundColor:'white',width:'100%'}}
            label="commissions" variant="filled" />
        )}
      /></Stack><br/>
                </div>
                <div class="form-floating mb-3" className="as1">
                    <input type="date" class="form-control" placeholder="MM/DD/YYYY" name="due" id="due" onfocus="(this.type='date')" onChange={(e)=>{setDue(e.target.value)}} />
                </div>
          <button onClick={() => {
            let x = {
              id1:`${id1}`,
              id2:`${id2}`,
              commissionId:selectedCommission.id,
              commissionName:selectedCommission.name,
              officer:selcetedOfficers,
              due:`${due}`,
              assigned:`${(new Date()).toLocaleDateString()}`,
              status:0,
            }
            assign(x);
          }} >submit</button>
          </div>
      </div>
      </>
    );
}