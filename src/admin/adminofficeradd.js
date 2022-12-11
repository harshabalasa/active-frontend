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
import { Link } from 'react-router-dom';


const add_officer=async (id,name,mail,mobile,caderid)=>{
  //alert("hello");
  await axios.post("https://active-backend.onrender.com/api/officers/add",{
    officerId : `${id}`,
    officerName : `${name}`,
    mobile : `${mobile}`,
    email : `${mail}`,
    cadreId : `${caderid}`
  }).then((res)=>{
    if((res.status==200))
    alert("officer added succesfully");
  })
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

  function clear()
{
  localStorage.clear();
  window.location.href = '/login';
}


export default function AdminOfficerAdd()
{
    const [id,setId]=useState("");
    const [name,setName]=useState("");
    const [mail,setMail]=useState("");
    const [mobile,setMobile]=useState("");
    const [caderid,setCaderid]=useState("");
    const [cadres,setCadres]=useState([]);

    useEffect(()=>{
      axios.get("https://active-backend.onrender.com/api/cadres").then((res)=>{
        setCadres(res.data.cadres);
      })
    }, [])


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
           <div className='officer_add_box'>
           <div style={{height:'15%',width:'100%',textAlign:'center'}}><h1>ADD OFFICER</h1></div>
           <div style={{height:'85%',width:'100%',display:'table',}}>
            <CssTextField 
            variant='filled'
            sx={{width:'100%',height:'10%',background:'white',borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}}
            onChange={(e)=>{
              setId(e.target.value)
            }}
            id="ofiicer_text_a"
            label="officer id"
            placeholder="id"
            />
            <br/><br/>
            <CssTextField 
            variant="filled"
            sx={{width:'100%',background:'white',borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}}
            onChange={(e)=>{
              setName(e.target.value);
            }}
            id="ofiicer_text_b"
            label="officer name"
            placeholder="name"
            />
            <br/><br/>
            <CssTextField 
            variant='filled'
            onChange={(e)=>{
              setMobile(e.target.value);
            }}
            id="ofiicer_text_c"
            type="number"
            label="mobile"
            placeholder="phone"
            sx={{width:'100%',background:'white',borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}}
            />
            <br/><br/>
            <CssTextField 
            variant='filled'
            onChange={(e)=>{
              setMail(e.target.value);
            }}
            id="ofiicer_text_d"
            type="email"
            label="mail"
            placeholder="mail"
            sx={{width:'100%',background:'white',borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}}
            />
            <br/><br/>
            <Autocomplete sx={{width:'100%'}} getOptionLabel={(cadres) => cadres.cadreName}   options={cadres} renderInput={(params) => <CssTextField variant='filled'
             sx={{width:'100%',background:'white',borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}}
             {...params} label="cadre" />}
                onChange={(event,v)=>{setCaderid(v.cadreName)}}
              />
              <br/>
            <button style={{width:'30%',height:'3rem',backgroundColor:'skyblue',border:'2px solid black',fontSize:'100%',borderRadius:'10px'}}
            onClick={()=>{
              //console.log("hknnjxamxjwnx");
              //alert("hello12345343");
              if(id!="" && name!="" && mobile.length!="" && mail!="" && caderid!="")
              {
              add_officer(id,name,mobile,mail,caderid);
              document.getElementById("ofiicer_text_a").value="";
              document.getElementById("ofiicer_text_b").value="";
              document.getElementById("ofiicer_text_c").value="";
              document.getElementById("ofiicer_text_d").value="";
              }
              else
              alert("fill all the fields completely");
            }}
            >Add officer</button>
            </div>
           </div>
        </div>
    </div>
  );
}