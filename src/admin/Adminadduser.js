import '../App.css';
import React,{useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { alpha, styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';

const styles = {
  inputRoot: {
    fontSize: 30
  },
  labelRoot: {
    fontSize: 30,
    color: "red",
    "&$labelFocused": {
      color: "purple"
    }
  },
  labelFocused: {}
};



const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


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


function clear()
{
  localStorage.clear();
  window.location.href = '/login';
}

export default function UserAdd()
{
    const [mobile,setMobile]=useState("");
    const [password,setPassword]=useState("");
    const [commissions,setCommisions]=useState([]);
  const [selectedCommissions, setSelectedCommissions] = useState([]);
  console.log(localStorage.getItem('userlog'));

    ////////////////////////////
  const add_user=(x)=>{
  //console.log(x);
    setMobile('')
    setPassword('')
    setSelectedCommissions([])
  let commsionArr=[];
  for(var t of x.commissionId)
  {
    let obj={
      id:`${t._id}`,
      name:`${t.commissionName}`,
    }
    commsionArr.push(obj);
  }
  axios.post("https://active-backend.onrender.com/api/users/add",{
    mobile : `${x.mobile}`,
    password : `${x.password}`,
    commission : [...commsionArr],
  }).then((res)=>{
    if((res.status==200))
    {
      alert("user added succesfully");
      window.location.reload();
    }
    else
    alert("something went wrong");
  })
}
  ///////////////////////
    useEffect(()=>{
      axios.get("https://active-backend.onrender.com/api/commissions").then((res)=>{

        setCommisions(res.data.commissions);
      })
    },[])

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
           <div className='user_add_box'>
           <div style={{height:'15%',width:'100%',textAlign:'center'}}><h1>ADD USER</h1></div>
           <div style={{height:'85%',width:'100%',display:'table',}}>
           <br/>
            <CssTextField 
            variant='filled'
            sx={{width:'100%',background:'white',borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}}
            onChange={(e)=>{
              setMobile(e.target.value);
            }}
            id="ofiicer_text_c"
            label="mobile"
                placeholder="phone"
                required
            value={mobile}
            />
            <br/><br/>
            <CssTextField 
            variant='filled'
            sx={{width:'100%',backgroundColor:'white',borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}}
            onChange={(e)=>{
              setPassword(e.target.value);
            }}
            id="ofiicer_text_d"
            type="email"
            label="password"
                placeholder="password"
                required
            value={password}
            />
            <br/><br/>
            <Autocomplete
                multiple
                value={selectedCommissions}
            id="checkboxes-tags-demo"
            options={commissions}
                onChange={(e, v) => { setSelectedCommissions(v); }}
                required
            disableCloseOnSelect
            getOptionLabel={(option) => option.commissionName}
            renderOption={(props, option, { selected }) => {
              return(
              <li {...props} key={`${option._id}`}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.commissionName}
              </li>
              )
            }}
            style={{ width: '100%' }}
            renderInput={(params) => (
              <CssTextField variant='filled'
              sx={{width:'100%',height:'auto',backgroundColor:'white',borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}} 
                {...params} label="Checkboxes"
                required
                placeholder="assign commisions" />
            )}
            />
            <br/>
            <Button style={{width:'50%',height:'3rem',backgroundColor:'skyblue',border:'2px solid black',fontSize:'100%',borderRadius:'10px'}}
            onClick={()=>{
              //console.log("hknnjxamxjwnx");
              //alert("hello12345343");
                let x={
                mobile : `${mobile}`,
                password : `${password.trim()}`,
                commissionId : selectedCommissions,
              }
              console.log(x);
              add_user(x);
              //add_officer(id,name,mobile,mail,caderid);
              //document.getElementById("ofiicer_text_a").value="";
              //document.getElementById("ofiicer_text_b").value="";
              //window.location.reload();
            }}
            >Add User</Button>
            </div>
            </div>
        </div>
    </div>
  );
}