import '../App.css';
import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import axios from 'axios';
import { width } from '@mui/system';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';


function clear()
{
  localStorage.clear();
  window.location.href = '/login';
}



function Row(props) {
  let task=props.task;
  const [open, setOpen] = React.useState(false);
  const [officers,setOfficers]=useState([...(props.task.officer)]);
  let officerObj=[...(props.task.officer)];
  return (
    <React.Fragment>
    {console.log(props.task)}
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{task.id1}</TableCell>
        <TableCell >{task.id2}</TableCell>
        <TableCell >{task.commissionName}</TableCell>
        <TableCell >{task.assigned}</TableCell>
        <TableCell >{task.due}</TableCell>
        <TableCell>{task.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <b>Task Info</b>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Name</b></TableCell>
                    <TableCell><b>Cadre</b></TableCell>
                    <TableCell ><b>Contact</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    officers.map((officer,i)=>{
                      return(
                      <TableRow key={officer._id}>
                      <TableCell component="th" scope="row">
                      {officer.officerName}
                      </TableCell>
                      <TableCell>{officer.cadreId}</TableCell>
                      <TableCell >{officer.mobile}</TableCell>
                    </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}





let filterb=null;

export default function AdminHistory()
{
    const [tasks,setTasks]=useState([]);
    const [commisions,setCommissions]=useState([]);
    let initial=[];


    useEffect(()=>{
      axios.get("https://active-backend.onrender.com/api/commissions").then((res)=>{
        setCommissions(res.data.commissions);
        if(filterb===null)
        {
        //setFilter(res.data.commissions[0]);
        filterb=res.data.commissions[0];
        }
        axios.post("https://active-backend.onrender.com/api/tasks/completedList",{id:`${(filterb)?(filterb._id):(res.data.commissions[0]._id)}`}).then((res)=>{
        setTasks(res.data.tasks);
      })
      })
    },[])


    return(
        <div className="App" id="Admins_history_div">
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
      {/*******************FROM HERE STARTS THE COMPONENT ************************/}
      <div style={{width:'82%',padding:'25px',height:'80%',marginTop:'30px',zIndex:'1',position:'fixed',overflow:'scroll',paddingTop:'10px',paddingBottom:'80px'}} >
      <DropdownButton className='select' id="dropdown-basic-button" title="commission name">
      {
        commisions.map((commission)=>{
          return (<Dropdown.Item key={commission._id} onClick={(e)=>{filterb=commission;
          axios.post("https://active-backend.onrender.com/api/tasks/completedList",{id:`${commission._id}`}).then((res)=>{
        setTasks(res.data.tasks);
        })
        }}>{commission.commissionName}</Dropdown.Item>)
        })
      }
      </DropdownButton>
      <TableContainer component={Paper} style={{boxShadow:'0 2px 5px',borderRadius:'10px'}}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell/>
              <TableCell><b>Id 1</b></TableCell>
              <TableCell><b>Id 2</b></TableCell>
              <TableCell><b>Commission</b></TableCell>
              <TableCell><b>Assigned Date</b></TableCell>
              <TableCell><b>Due Date</b></TableCell>
              <TableCell><b>Satus</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {
                tasks.map((task)=>{
                  return <Row key={task._id} task={task}/>
                })
              }
          </TableBody>          
          </Table>
        </TableContainer>
        </div>
        </div>
    </div>
  );
}