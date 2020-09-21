const {paginateResults} = require('./utils')
const jwt = require('jsonwebtoken');
const User = require('./models/user')
const { PubSub } = require('apollo-server');



const pubsub = new PubSub();
const USER_ADDED = 'USER_ADDED';

module.exports = {
    Subscription:{
      userAdded:{
        subscribe: (_,__,{pubsub}) => pubsub.asyncIterator(USER_ADDED)
      }
    },
    Query: {
      quakes: async (_, { pageSize = 20, after }, { dataSources }) => {
        const allQuakes = await dataSources.quakeAPI.getAllQuakes();
        // we want these in reverse chronological order
        allQuakes.reverse();
        const quakes = paginateResults({
          after, 
          pageSize,
          results: allQuakes
        });
        return {
          quakes,
          cursor: quakes.length ? quakes[quakes.length - 1].cursor : null,
          // if the cursor at the end of the paginated results is the same as the
          // last item in _all_ results, then there are no more results after this
          hasMore: quakes.length
            ? quakes[quakes.length - 1].cursor !==
              allQuakes[allQuakes.length - 1].cursor
            : false
        };
      },
      quake: (_, { id }, { dataSources }) =>
        dataSources.quakeAPI.getQuakeById({ quakeId: id }),
      users : (_, __, { dataSources }) =>
        dataSources.userAPI.getUsers(),
    //   me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
    },
    Mutation:{
      login: async (_, { email , password},{ dataSources }) => {
        const user = await dataSources.userAPI.getUser({email,password});
        if(user){
            const token = jwt.sign({id :user.id,email : user.email},
               'secret_key', { expiresIn: 60 * 60 });
            return token 
        }
        if(!user){
           console.log('User is not existing in database')
        }

      },
      saveRecord: async (_, { recordId },{ dataSources }) => {
        const results = await dataSources.userAPI.saveRecord({recordId});

        return {
          success : results.length ? true : false,
          message : results.length ? "Quake successfully saved" : "Quake do not saved",
          records : results,
        }
      },
      addUser: async (_, { name , email , password},{ pubsub }) => {
       
        var user = {
            name,
            email,
            password
        }
        const newUser = new User(user);
        const added = await newUser.save()
        .then( () => {
            return true
        }).catch( e => {
            console.log({message : e.message}) 
            return false
        })
        
        const users = await User.find()
        .then( (allUsers) => {
          return allUsers.map( obj => { return {name:obj.name,email:obj.email,password:obj.password}})
        })
        .catch( e => {
          console.log({message : e.message}) 
        })
        
        console.log('**',users)
        
        pubsub.publish(USER_ADDED,{
          userAdded : users
        })
        
        
        if(added){
          return user
        }
       
      },
    }
}