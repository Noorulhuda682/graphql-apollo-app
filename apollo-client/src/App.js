import React,{Fragment, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import gql from 'graphql-tag'
import { useApolloClient,useQuery } from '@apollo/react-hooks';
import QuakeTile from './components/QuakeTile'
import Header from './components/Header'
import AddUser from './components/AddUser'
import UsersList from './components/UsersList'

const GET_QUAKES = gql`
    query quakeList( $after: String ){
      quakes(after : $after ){
        cursor
        hasMore
        quakes {
          id 
          magnitude
          location
          when 
          cursor
        }
      }
    }
`


function Quakes() {
  const [handlePages,setHandlePages] = useState(false)
 const client = useApolloClient()
  const {data, loading, error} = useQuery(GET_QUAKES)
  if(loading) return <h1>Loading</h1>
  if(error) return <h1>Error</h1>
  console.log('Data',data)

  const logoutHandler = (e) => {
     e.preventDefault();
     client.writeData({ data : {isLoggedIn : false }})
     localStorage.clear()
  }
  return (
    <Fragment>
      <Header/>

      <button className="logout" onClick={logoutHandler} >Log Out</button>
     {handlePages ? 
      data.quakes && 
        data.quakes.quakes &&
        data.quakes.quakes.map( quake => (
          <QuakeTile
             key={quake.id}
             id={quake.id}
             magnitude={quake.magnitude}
             location={quake.location}
             when={quake.when}
             cursor={quake.cursor}
          />
        ))
      
      :
     <div className="userview" >
      <AddUser/>
      <UsersList/>
     </div> 
    }
    </Fragment>
  );
}

export default Quakes;
