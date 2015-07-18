//notice, didn't user var here, as this is a global variable
PlayersList = new Mongo.Collection('players');


//will only run on the client
if(Meteor.isClient){
    Template.leaderboard.helpers({
        'player': function(){
            return PlayersList.find({}, {sort: {score: -1, name: 1}} );
        },
        'countPlayers': function(){
            return PlayersList.find().count();
        },
        'selectedClass': function(){
            var playerId = this._id;
            var selectedPlayer = Session.get('selectedPlayer');
            if(playerId == selectedPlayer){
                return 'selected'
            }
        },
        'showSelectedPlayer': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            return PlayersList.findOne(selectedPlayer);
        }
    });

    Template.leaderboard.events({
        'click .player': function(){
            //console.log("You clicked a .player!!" + this.name);
            var playerId = this._id;
            Session.set('selectedPlayer', playerId);
            //var selectedPlayer = Session.get('selectedPlayer');
            //console.log(selectedPlayer);
        },
        'click .increment': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            //console.log(selectedPlayer);
            PlayersList.update(selectedPlayer, {$inc: {score: 5}});
        },
        'click .decrement': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            //console.log(selectedPlayer);
            PlayersList.update(selectedPlayer, {$inc: {score: -5}});
        }
    });
}
//will only run on the server
if(Meteor.isServer){

}