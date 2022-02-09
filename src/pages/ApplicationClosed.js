import React from 'react';
import closed from '../assets/closed.gif'
import { makeStyles } from '@material-ui/core';

const useStyles= makeStyles((theme)=>({
container :{
    display:'flex', justifyContent:'center',
},
headerOneText:{
    color:"#fe0000", textAlign:'center',
},
headerTwoText:{
    color:"#1a1a1a", textAlign:'center',
},
Link:{
    color:'#1A1A1A96',
},
bodyWrap:{
    borderRight:'10px dotted red',
    borderLeft:'10px dotted red',
    height:'100vh'
}

}))
const ApplicationClosed = () =>{
    const classes = useStyles()
    return(
        <div className={classes.bodyWrap}>
              <div className={classes.container}>
          <img src={closed}/>
        </div>
        <h1 className={classes.headerOneText}>Sorry, this application is now closed</h1>
        <h3 className={classes.headerTwoText}>For more enquires, visit <a className={classes.Link}href="https://jmtechcenter.org/">JMTech Website</a></h3>
        </div>
      
    );
}

export default ApplicationClosed;