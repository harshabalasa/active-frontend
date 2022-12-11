

import '../App.css';
import React,{useState,useEffect} from 'react';
import ReactDom from 'react-dom';
import Button from '@mui/material/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { alpha, styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { style } from '@mui/system';
import { Link } from 'react-router-dom';

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



function Officerdiv(props)
{
  let officer=props.officer;
  let cadres=props.cadres;
  let abc=[{cadreName:`${officer.cadreId}`}]
  //const temp=[{cadreName:'hello'},{cadreName:'bye'},{cadreName:'matai'},{cadreName:'fruit'},{cadreName:'thammudu'},{cadreName:'anniya'}]
  const [name,setName]=useState(officer.officerName);
  const [id,setId]=useState(officer.officerId);
  const [mobile,setMobile]=useState(officer.mobile);
  const [mail,setMail]=useState(officer.email);
  const [cadreId,setCaderid]=useState(officer.cadreId);
  const [toggle,setToggle]=useState(1);
  const [isModal,setIsmodal]=useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor:'white',
    height:'10rem',
    width: '25rem',
    borderRadius:'5px',
    boxShadow: '0 0 10px skyblue',
    p: 4,
  };

  const handleOpen = () => setIsmodal(true);
  const handleClose = () => setIsmodal(false);

  return(
    <div className='officer_div'>
    {toggle?
          <div style={{height:'17rem',width:'100%',}}>
              <h1>{`${officer.officerName}`}</h1>
              <p>{`Id : ${officer.officerId}`}</p>
              <p>{`mobile : ${officer.mobile}`}</p>
              <p>{`mail : ${officer.email}`}</p>
              <p>{`cadreId : ${officer.cadreId}`}</p>
          </div>:
          <div style={{height:'17rem',width:'100%',padding:'2px'}}>
              <div style={{display:'inline-flex',flexDirection:'row',width:'100%',alignItems:'center',marginBottom:'0.2rem'}}>
              <CssTextField label="name"  variant="filled"  size='small' sx={{width:'100%',backgroundColor:'white',borderTopLeftRadius:'3px',borderTopRightRadius:'3px'}}  defaultValue={officer.officerName} onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div style={{display:'inline-flex',flexDirection:'row',width:'100%',alignItems:'center',marginBottom:'0.2rem'}}>
              <CssTextField label="Id"  variant="filled"  size='small' sx={{width:'100%',backgroundColor:'white',borderTopLeftRadius:'3px',borderTopRightRadius:'3px'}}  defaultValue={officer.officerId} onChange={(e)=>setId(e.target.value)}/>
              </div>
              <div style={{display:'inline-flex',flexDirection:'row',width:'100%',alignItems:'center',marginBottom:'0.2rem'}}>
              <CssTextField label="mobile"  variant="filled"  size='small' sx={{width:'100%',backgroundColor:'white',borderTopLeftRadius:'3px',borderTopRightRadius:'3px'}}  defaultValue={officer.mobile} onChange={(e)=>setMobile(e.target.value)}/>
              </div>
              <div style={{display:'inline-flex',flexDirection:'row',width:'100%',alignItems:'center',marginBottom:'0.2rem'}}>
              <CssTextField label="mail"  variant="filled"  size='small' sx={{width:'100%',backgroundColor:'white',borderTopLeftRadius:'3px',borderTopRightRadius:'3px'}}  defaultValue={officer.email} onChange={(e)=>setMail(e.target.value)}/>
              </div>
              <div style={{display:'inline-flex',flexDirection:'row',width:'100%',alignItems:'center',marginBottom:'0.2rem'}}>
              <Autocomplete sx={{width:'100%'}} getOptionLabel={(cadres) => cadres.cadreName}  options={cadres} renderInput={(params) => <TextField {...params} label="cadre" />}
                onChange={(event,v)=>{setCaderid(v.cadreName);setCaderid(event.target.value)}} defaultValue={abc[0]}
              />
              </div>
          </div>
    }
          <div style={{display:'inline',justifyContent:'space-evenly',}}>
              <Button variant="contained" style={{backgroundColor:'#FF5858',marginRight:'3%'}} startIcon={<DeleteIcon />}
              onClick={()=>{setIsmodal(true)}}
              >
                  Delete
              </Button>
              <Button variant="contained" style={{backgroundColor:'#1746A2',marginRight:'3%'}} 
              onClick={()=>{
                setToggle(1-toggle);
              }}>
                  edit 
              </Button>
              {toggle?null:
              <Button variant="contained" style={{backgroundColor:'#38E54D'}} 
              onClick={()=>{
                axios.post("https://active-backend.onrender.com/api/officers/update",{
                  _id:`${officer._id}`,
                  officerId : `${id}`,
                  officerName : `${name}`,
                  mobile : `${mobile}`,
                  email : `${mail}`,
                  cadreId : `${cadreId}`,
                }).then((res)=>{
                  if(res.status==200)
                  {
                    alert("officer updated");
                    window.location.reload();
                  }
                })
              }}
              >
                  update
              </Button>
              }
          </div>
          <Modal onClose={handleClose} open={isModal}>
             <Box sx={style}>
                <h4>{`Confirm Deletion of ${officer.officerName}`}</h4>
                <button style={{height:'2rem',width:'7rem',backgroundColor:'skyblue',borderRadius:'5px',margin:'2%',marginLeft:'30%'}}
                onClick={()=>{
                  axios.post("https://active-backend.onrender.com/api/officers/remove",{_id:`${officer._id}`}).then((res)=>{
                    if(res.status==200)
                    {
                    alert("officer was deleted succesfully");
                    setIsmodal(false);
                    ReactDom.render(<Officerview/>,document.getElementById("the_whole_parent_class"));
                    }
                  })
                }}
                >Delete</button>
             </Box>
          </Modal>
    </div>
  )
}

  function clear()
{
  localStorage.clear();
  window.location.href = '/login';
}


export default function Officerview()
{
    const [officers,setOfficers]=useState([]);
    const [cadres,setCadres]=useState([]);
    useEffect(()=>{
        axios.get("https://active-backend.onrender.com/api/officers").then((res)=>{
            setOfficers(res.data.officers);
            
        })
    },[])
    return(
      <div>
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
        <div style={{height:'4rem',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
          <h1>OFFICERS</h1>
        </div>
        <div className='officer_view_div'>
        {
           officers.map((officer,i)=>{
            return(
                <Officerdiv key={i} officer={officer} cadres={cadres}/>
            )
           })
        }
        </div>
      </div>
  );
}
