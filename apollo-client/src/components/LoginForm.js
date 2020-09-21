import React, { useState } from 'react';
// import Login from '../Pages/login';



const LoginForm = ({login}) => {
    const [email,setEmail]  = useState();
    const [password,setPassword] = useState();

    const submitHandler = (e) => {
        e.preventDefault()
        login({
            variables:{
                email : email,
                password:password
            }
        })
      }
    return(
        <div className="loginform">
            <h1>Log In</h1>
            <form onSubmit={submitHandler}>
                 <label htmlFor="email">
                     <input type="text" placeholder="Enter email address"  required minLength={3}
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     />
                 </label>
                 <label htmlFor="email">
                     <input type="password" placeholder="Enter password"  required minLength={3}
                      value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     />
                 </label>
                 <input type="submit" value="Log In" />
            </form>
        </div>
    )
}

export default LoginForm;