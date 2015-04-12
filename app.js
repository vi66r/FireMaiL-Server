
var express = require('express');
var mongoose = require('mongoose');

var userlist = [];//want to store this in db


/*//Passed-in Stuff START
var loginid;//passed in
var JSONObj;//passed in

var messagelist = [];

for(i=0; i<JSONObj.messages.length; ++i){
   messagelist[messagelist.length] = JSONObj.messages[i].id;
}
//Passed-in Stuff END*/


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback){
  

//User Scheme START
   var userSchema = mongoose.Schema({
      userID: String,
      messages: [{msgID:string, priority:int}]
   })
   
   userSchema.methods.speak = function(){
      var greeting = this.userName
         ? "ID: : " + this.userID
         : "I have no name"
      console.log(greeting);
   }

   //NEED to get JSON of message IDs from userID
   //userSchema.methods.refresh = function refresh ( loginid ){}
   
   var User = mongoose.model('User', userSchema);

   //var userlistSchema = mongoose.Schema({ users: [] })
   //var Userlist = mongoose.model('Userlist', userlistSchema);
});
//User Scheme END



//Adding maybe? new User START
   var repeat = false;
   var Fred;

   //Does User exist?
   for(User x:userlist){
      if(x.userID == loginid){
         repeat = true;
         Fred = x;
         break;
      }
   }

if(!repeat){
   var Freddy = new User({
      userID = loginid,
      messages = []
   });
   userlist[userlist.length] = Freddy;

   var importante = 0;
   for(i=0; i<messagelist.length; ++i){
    
       Freddy.messages[Freddy.messages.length] = {messagelist[i], importante};
   }
}
//adding maybe? new user END



//updating messagelist START
else{
   var newm = false;
   for(i=0; i<messagelist.length; ++i){
      for(j=0; j<Fred.messages.length; ++j){
         if(messagelist[i] == Fred.messages[j].msgID) break;
         if(j==Fred.messages.length) newm=true;
      }
      if(newm) break;
   }
   if(newm){
      var newmsgs = [];
      var importante = 0;
      for(i=0; i<messagelist.length; ++i){ //Check for messages Fred already has
         for(j=0; j<Fred.messages.length; ++j){
            if(messagelist[i] == Fred.messages[j].msgID) break;
            if(j==Fred.messages.length){ //If message is new
               
               newmsgs[newmsgs.length]={messagelist[i],importante};
            }
         }
      }
      for(i=0; i<newmsgs.length; ++i){ //Add new messages to Fred
         Fred.messages[Fred.messages.length]=newmsgs[i];
      }
   }
}
//updating messagelist END



//User.find({ userID: /^id/ }, callback)
//console.log(Fred.userName)

userlist.save(function(err,userlist){
   if(err) return console.error(err);
   console.dir(userlist);
});

/*Array.find(function(err,){
   if(err) return console.error(err);
   console.log(userlist);
})*/

mongoose.connect('mongodb://localhost/test');
