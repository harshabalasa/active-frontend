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
import {FaEdit} from 'react-icons/fa';
import {GrDocumentUpdate} from 'react-icons/gr';
import { alpha, styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { style } from '@mui/system';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import {Link} from 'react-router-dom';


const update_user=(obj)=>{
  let com=[];
  for(var x of obj.commission)
  {
    let temp={
      id:`${x._id}`,
      name:`${x.commissionName}`,
    }
    com.push(temp);
  }
  axios.post("https://active-backend.onrender.com/api/users/update",{
    _id:`${obj._id}`,
    mobile:`${obj.mobile}`,
    password:`${obj.password}`,
    commission:[...com],
  }).then((res)=>{
    if(res.status==200)
    {
      alert("user was updated succesfully");
      window.location.reload();
    }
  })
}


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



function Userdiv(props)
{
  let user=props.user;
  let commissions=props.commissions;
  console.log(commissions);
  let previousCommissions=[];
  //const temp=[{cadreName:'hello'},{cadreName:'bye'},{cadreName:'matai'},{cadreName:'fruit'},{cadreName:'thammudu'},{cadreName:'anniya'}]
  const [mobile,setMobile]=useState(user.mobile);
  const [password,setPassword]=useState(user.password);
  const [userCommissions,setUserCommissions]=useState([...user.commission]);
  const [selectedCommissions,setSelectedCommissions]=useState([...user.commission]);
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

    function clear()
{
  localStorage.clear();
  window.location.href = '/login';
}


  return(
    <div className='user_div'>
    {toggle?
          <div style={{height:'17rem',width:'100%',overflowX:'scroll',paddingLeft:'2rem',paddingTop:'1rem'}}>
              <p className='userviewtext'>{`Mobile : ${user.mobile}`}</p>
              <p className='userviewtext'>{`Password : ${user.password}`}</p>
              <p className='userviewtext'>Commissions:</p>
              <ul>
                {
                    userCommissions.map((com,j)=>{
                        return(
                        <li className='userviewtext' key={com.id}>{com.name}</li>
                        )
                    })
                }
              </ul>
          </div>:
          <div style={{height:'17rem',width:'100%',overflowY:'scroll',padding:'1.5rem'}}>
              <div style={{display:'inline-flex',flexDirection:'row',width:'100%',alignItems:'center',marginBottom:'0.5rem'}}>
              <CssTextField label="mobile" variant="filled"  size='small' sx={{width:'100%',backgroundColor:'white',borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}} defaultValue={user.mobile} onChange={(e)=>setMobile(e.target.value)}/>
              </div>
              <div style={{display:'inline-flex',flexDirection:'row',width:'100%',alignItems:'center',marginBottom:'0.5rem'}}>
              <CssTextField label="password" variant='filled'  size='small'sx={{width:'100%',backgroundColor:'white',borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}} defaultValue={user.password} onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <div style={{display:'inline-flex',flexDirection:'row',width:'100%',alignItems:'center',}}>
              <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={commissions}
            onChange={(e,v)=>{setSelectedCommissions(v);}}
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
              {...params} label="commissions" placeholder="assign commisions"/>
            )}
            />
              </div>
          </div>
    }
          <div style={{display:'inline',justifyContent:'space-evenly',paddingLeft:'1rem'}}>
              <Button variant="contained" style={{backgroundColor:'#FF5858',marginRight:'3%'}} startIcon={<DeleteIcon />}
              onClick={()=>{setIsmodal(true)}}
              >
                  Delete
              </Button>
              <Button variant="contained" style={{backgroundColor:'#1746A2',marginRight:'3%'}} startIcon={<FaEdit/>} 
              onClick={()=>{
                setToggle(1-toggle);
              }}>
                  edit 
              </Button>
              {toggle?null:
              <Button variant="contained" style={{backgroundColor:'#38E54D'}} startIcon={<GrDocumentUpdate/>}
              onClick={()=>{
                let obj={
                    _id:`${user._id}`,
                    mobile:`${mobile}`,
                    password:`${password}`,
                    commission:selectedCommissions,
                }
                update_user(obj);
              }}
              >
                  update
              </Button>
              }
          </div>
          <Modal onClose={handleClose} open={isModal}>
             <Box sx={style}>
                <h4>{`Confirm Deletion of ${user.mobile}`}</h4>
          <button style={{ height: '2rem', width: '7rem', backgroundColor: 'skyblue',boxShadow:'0 0 10px skyblue', margin: '2%', marginLeft: '30%' }}
                onClick={()=>{
                  axios.post("https://active-backend.onrender.com/api/users/remove",{_id:`${user._id}`}).then((res)=>{
                    if(res.status==200)
                    {
                    alert("user was deleted succesfully");
                    setIsmodal(false);
                    window.location.reload();
                    }
                  })
                }}
                >Delete</button>
             </Box>
          </Modal>
    </div>
  )
}


export default function UserView()
{
    const [users,setUsers]=useState([]);
    const [commissions,setCommissions]=useState([]);
    useEffect(()=>{
        axios.get("https://active-backend.onrender.com/api/users").then((res)=>{
            setUsers(res.data.users);
        })
        axios.get("https://active-backend.onrender.com/api/commissions").then((res)=>{
          setCommissions(res.data.commissions);
        })
    },[])
    return(
        <div className="App" id="the_whole_parent_class">
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
          <h1>USERS</h1>
        </div>
        <div className='officer_view_div'>
        {
           users.map((user,i)=>{
            return(
                <Userdiv key={i} user={user} commissions={commissions}/>
            )
           })
        }
        </div>
    </div>
  );
}