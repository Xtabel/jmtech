import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function ProtectedRoute({isAuth: isAuth, component:Component, ...rest}){
    
    return(
        <Route 
        {...rest} 
         render={props=>{
             debugger
            if (isAuth){
                return <Component {...props}/>
            }else{
                return <Redirect
                to={{
                  pathname: '/',
                  state: { from: props.location }
                }}
              />
            }
            // }else{
            //    return <Redirect to={{pathName:'/', state={from: props.location} }}/>
            // }
        }}
        />
    );
}
export default ProtectedRoute;