//notice, didn't user var here, as this is a global variable
PlayersList = new Mongo.Collection('players');


//will only run on the client
if(Meteor.isClient){
    Template.leaderboard.helpers({
        'player': function(){
            return PlayersList.find()
        },
        'countPlayers': function(){
            return PlayersList.find().count();
        }
    });
}
//will only run on the server
if(Meteor.isServer){

}