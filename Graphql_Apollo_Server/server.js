const { ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const jwt = require('jsonwebtoken');
const {createStore} = require('./utils');

const QuakeAPI = require('./dataSource/quake');
const UserAPI = require('./dataSource/user');

const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

const store = createStore();
const db = require('./models/db');
  
db.connection.once('open', () => {
    console.log('db connected')
  }).on('error', error =>{
      console.log('Error =>' , error)
});

const server = new ApolloServer({ 
    context: async ({req}) => {
        
        return {pubsub};

        // const auth = (req.headers && req.headers.authorization) || '';
        // let email = ""
        // let token = ""

        // console.log('Auth-==',auth,pubsub);
        
        // const getToken = () => {
        //     return auth.split(" ")[1]
        // }

        // if(auth.length && auth.split(" ")[1]){
        //     token = getToken();
           
        // }
        // if(token !== ""){
        //     email = jwt.verify(token, 'secret_key').email
        // }
        
        // // find a user by his email
        // const usercheck = await store.users.map( user => {
        //     if( email === user.email){
        //         return user
        //     }
        // })
        
        // let users = [];
        // await usercheck.forEach( element => {
        //     if(element){
        //         users.push(element);
        //     }
        // })

        // const user  = users && users[0] ? users[0] :  null;
        
        
    },
    typeDefs,
    resolvers,

    dataSources: () => ({
        quakeAPI : new QuakeAPI(),
        userAPI : new UserAPI({store}),
    })
})

server.listen().then( ({ url}) => {
    console.log(`server is ready at ${url}`);
})