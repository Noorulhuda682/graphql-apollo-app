const { RESTDataSource } = require('apollo-datasource-rest');

class QuakeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://earthquake.usgs.gov/fdsnws/event/1/';
  }

  async getAllQuakes() {
    const query = "query?format=geojson&starttime=2014-01-01&endtime=2014-01-02"  
    const response = await this.get(query);
    return Array.isArray(response.features)
      ? response.features.map(quake => this.quakeReducer(quake))
      : [];
  }

  quakeReducer(quake) {

     const date = new Date(quake.properties.time);    
     const day = date.getDate();
     const month = date.getMonth();
     const year = date.getFullYear();
     const dateString = `on : ${day}  ${month+1}  in : ${year} `;

    return {
         magnitude : quake.properties.mag,
         location: quake.properties.place,
         when: dateString,
         cursor: `${quake.properties.time}`,
         id:quake.id
    };
  }

}

module.exports = QuakeAPI;