const fetch = require('node-fetch')

const url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02"

fetch(url)
.then( res => res.json())
.then( (quakedata) => {
  
     const quake = quakedata.features[0];
     const date = new Date(quake.properties.time);
    
     const year = date.getFullYear();
     const day = date.getDate();
     const month = date.getMonth();
     const dateString = `on : ${day}  ${month+1}  in : ${year} `;
    //  const timestamp = quake.properties.time;

     const customDate = {
         magnitude : quake.properties.mag,
         location:quake.properties.place,
         when:dateString,
         time:quake.properties.time,
         id:quake.id
     }
     
     console.log(customDate) 

})    