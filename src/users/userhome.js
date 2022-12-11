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






const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
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



const update_task=async (obj)=>
  {
  let flag=0;
  for(var x of obj.officer)
  {
    if((x.status)==0)
    {
      flag=1;
      break;
    }
  }
  if(flag==0)
  {
    obj.status=1;
  }
  await axios.post("https://active-backend.onrender.com/api/tasks/update",obj).then((res)=>{
    if(res.status==200)
    {
    alert("Task was updated succesfully");
    ReactDOM.render(<UserHome/>,document.getElementById("user_home_div"));
    }
    else
    alert("something error occured");
  })
}



function Row(props) {
  let task=props.task;
  const [open, setOpen] = React.useState(false);
  const [officers,setOfficers]=useState([...(props.task.officer)]);
  let officerObj=[...(props.task.officer)];
  if(props.task.status)
  return null;
  else
  {
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
                    <TableCell ><b>Check</b></TableCell>
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
                      <TableCell >
                      <Checkbox defaultChecked={(officer.status)?true:false} onChange={(e,v)=>{
                        if(v)
                        officerObj[i].status=1;
                        else
                        officerObj[i].status=0;
                      }}/>
                      </TableCell>
                    </TableRow>
                      )
                    })
                  }
                  <TableRow><TableCell><Button style={{backgroundColor:'Skyblue',borderRadius:'2px',boxShadow:'0 0 10px skyblue'}} onClick={()=>{
                    let newTask={
                    _id: `${props.task._id}`,
                    id1: `${props.task.id1}`,
                    id2: `${props.task.id2}`,
                    commissionId: `${props.task.commissionId}`,
                    commissionName: `${props.task.commissionName}`,
                    officer: [...(officerObj)],
                    due: `${props.task.due}`,
                    assigned: `${props.task.assigned}`,
                    status: 0,
                    }
                    update_task(newTask);
                  }}>confirm</Button></TableCell></TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
  }
}





let filtera=null;

export default function UserHome()
{
    const [tasks,setTasks]=useState([]);
    const [commisions,setCommissions]=useState((JSON.parse(localStorage.getItem('userlog'))).commission);
    let initial=[];


  useEffect(() => {
      document.body.style.zoom = "90%";
        if(filtera===null)
        {
        //setFilter(res.data.commissions[0]);
        filtera=commisions[0];
        }
        axios.post("https://active-backend.onrender.com/api/tasks/pendingList",{id:`${(filtera)?(filtera.id):(commisions[0].id)}`}).then((res)=>{
        console.log(res.data.tasks);
        console.log(commisions);
        setTasks(res.data.tasks);
      })
    },[])


    return(
        <div className="App" id="user_home_div">
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
          <Link to='/userreport1' style={{ textDecoration: 'none' }}><Button className='sidebarbuttons' variant="contained" style={{ borderRadius: '20px' }}><b> Report</b></Button></Link>

        </div>
      <div className='content_div'>
      {/*******************FROM HERE STARTS THE COMPONENT ************************/}
      <div style={{width:'82%',padding:'25px',height:'80%',marginTop:'30px',zIndex:'1',position:'fixed',overflow:'scroll',paddingTop:'10px',paddingBottom:'80px'}} >
      <DropdownButton className='select' id="dropdown-basic-button" title="commission name">
      {
        commisions.map((commission)=>{
          return (<Dropdown.Item key={commission.id} onClick={(e)=>{filtera=commission;
          axios.post("https://active-backend.onrender.com/api/tasks/pendingList",{id:`${commission.id}`}).then((res)=>{
        setTasks(res.data.tasks);
        })
        }}>{commission.name}</Dropdown.Item>)
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
              <TableCell><b>Status</b></TableCell>
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