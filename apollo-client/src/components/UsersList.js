import React from 'react';
// import {Subscription} from 'react-apollo';
import {useSubscription} from '@apollo/react-hooks'
import gql from 'graphql-tag';

const GET_USERS = gql`
    subscription {
     userAdded {
      name
      email
      password
     } 
    }
`

const UsersList = () => {
    const {data} = useSubscription(GET_USERS)

    return(
        <div className="userlist-div" >
            <h2>List of Users</h2>
            {data?.userAdded &&
            <div className="user-conteiner" >
             {data?.userAdded.map( (user,i) => {
                 console.log('USESR===>',user)
                 var o = Math.round, r = Math.random, s = 255;
                 var col = 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
                return (
                <div class="flip-card">
                 <div class="flip-card-inner">
                <div class="flip-card-front" style={{background:col}} >
                <div key={i}  >
                    <h3>Quake User {i}</h3>
                    <p>Name :  {user.name}</p>
                 <p>Email : {user.email}</p>
                 </div>
                </div>
                <div class="flip-card-back">
                <h3>Quake Hunter App</h3> 
                <br/>
                <p>This is the list of Grphql Subscriptions rendering data in real time </p>
                <br/>
                <p>Developer Engr Noorul Huda</p> 
                </div>
            </div>
            </div>
                )
             })}
            </div>
            }
            
        </div>
    )
}

export default UsersList;