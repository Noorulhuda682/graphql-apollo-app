const { DataSource} = require('apollo-datasource');

class UserAPI extends DataSource{
     constructor({ store }) {
         super();
         this.store = store
     }

     /*
     This is a function that gets called by apolloserver when being setup
     This functions gets called with the datasource config including things
     like cashes and context. We will assign this.context to the request context
     here, so we can know about the user making requests
     */

     initialize(config){
         this.context = config.context
     }

     async getUsers(){
         const users = await this.store.users
         return users
     }

     async getUser({email : emailArg , password : passwordArg}){
         let index = 0;
         const email = this.context && this.context.user ? this.context.user.email : emailArg
         
         const theUser = this.store.users.map( user =>{
             if( email === user.email && passwordArg === user.password ){
                 index = this.store.users.indexOf(user) 
                 return user
             }
         })

         return theUser[index];
     }

     async saveRecord({recordId}){
        const userId = this.context.user.id;

        if(!userId){
           console.log('No: user on context');
        }
        else{
            console.log('User on context');
        }

        const usercheck = this.store.users.map( user => {
            if(userId === user.id) {
                user.records.push({id: recordId})
                return user
            }
        })

        let users = []
        await usercheck.forEach(element => {
            if(element) {
                users.push(element)
            }
        });

        return users[0].records.length > 4 ? users[0].records : "oh: noes!"
     }

    /*
     User can be called with an argument that includes email it does not have to be.
     If the user is already on the context, it use that other instead
    */

}

module.exports = UserAPI;