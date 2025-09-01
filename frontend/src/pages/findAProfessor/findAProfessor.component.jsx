import {Autocomplete, TextField} from '@mui/material';
import React, { useState } from 'react';
import {useNavigate} from 'react-router';
import Image from './professor.png'
const FAPPage = ()=>{

    const [professorList,setProfessorList] = useState([]);
    const navigate = useNavigate();
    const search_professor = (value)=>{
        const data = { 
           from:0,
           size:5, 
           query:{  
              query_string:{  
                 fields:["last_name","first_name"],
                 query: "*"+value+"*"
              }}
            }
        fetch('https://search-bubble-domain-rfgwnz5ocgakgdb44rflkimdbi.us-east-1.es.amazonaws.com/professors/_search',
        {
            method:'POST',
            auth:('admin','Admin@12345'), 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic '+ btoa('admin:Admin@12345'),
            },
            body: JSON.stringify(data)
        })
        .then(response=>response.json())
        .then(data=> setProfessorList(data.hits.hits.map(x=>{ return {label : x._source.first_name+' '+x._source.last_name, id: x._source.professor_id}})))
  
    }
    return <div style={{display:'flex',flexDirection:'center',flexGrow:1,justifyContent:'center',marginTop:'100px'}}> 
                <div style={{display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',flexDirection:'row',flexGrow:1,justifyContent:'center',paddingBottom:'20px'}}>
                    <img src={Image} height={'200px'} alt=''/>
                </div>
                <div style={{display:'flex',flexDirection:'row',flexGrow:1,justifyContent:'center',paddingBottom:'20px',fontFamily:'monospace'}}>
                    <h3>Find A Professor</h3>
                </div>
                <Autocomplete
                    disablePortal
                    size={"large"}
                    options={professorList}
                    sx={{ width: '25vw' ,minWidth:'300px' }}
                    onChange={( _ , value ) => {navigate('/professor/'+value.id)}}
                    renderInput={(params) => <TextField {...params} variant='outlined' value={1}  onChange={(e)=>{search_professor(e.target.value)}}  label="Professor Name" />}
                />
                </div>
               
          </div>
}
export default FAPPage;