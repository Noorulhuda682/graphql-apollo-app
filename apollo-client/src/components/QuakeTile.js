import React from 'react'

const QuakeTile = ({ 
    id, 
    magnitude,
    location,
    when,
    cursor,
}) => {
   return(
       <div className="quake-tile">
          <h3>Quake : {id}</h3>
          <p>Location : {location}</p>
          <p>magnitude : {magnitude}</p>
          <p>when :  {when}</p>
          <p>cursor : {cursor}</p>
       </div>
   )
}

export default QuakeTile;