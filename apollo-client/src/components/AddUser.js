import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_USER = gql`
    mutation addingUser($name:String!,$email:String! , $password:String!) {
        addUser(name:$name,email:$email,password:$password){
            name
            email
            password
        }
    }
`;



const AddUser = () => {
    

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [addUser,{data,loading,error}] = useMutation(ADD_USER
        ,{
            onCompleted({ addUser }) {
              console.log('User Added Successfully',addUser)
            }
        });
    
    const AddUserHandle = (e) => {
      e.preventDefault()  
      addUser({
        variables:{
        name:name,
        email:email,
        password:password
      }
    })  
      console.log('===>',data)
    } 

    return(
    <div className="add-user">
        <h2>Add User</h2>
        <form className="adduser" onSubmit={AddUserHandle} >
            <label>
                <input type="text" placeholder="Enter your name" required minLength={3} 
                 value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                <input type="text" placeholder="Enter your email" required minLength={3} 
                 value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                <input type="text" placeholder="Enter your password" required minLength={3} 
                 value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <input  className="addBtn" type="submit" value="Add" />
        </form>
    </div>
    )
} 

export default AddUser;