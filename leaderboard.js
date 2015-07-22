//notice, didn't user var here, as this is a global variable
/*
* TODO:
*Left off on page 127
*Can now add players with initial score, cannot change score or remove players.
*
* */
PlayersList = new Mongo.Collection('players');


//will only run on the client
if(Meteor.isClient){

    Meteor.subscribe('thePlayers');

    Template.leaderboard.helpers({
        'player': function(){

            var currentUserId = Meteor.userId();
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

    Template.addPlayerForm.events({
        'submit form': function(event){
            event.preventDefault();

            var playerNameVar = event.target.playerName.value;
            var initialScore = Number(event.target.initialScore.value);
            //console.log('initial score:' + initialScore);

            if(isNaN(initialScore)){
                initialScore = 0;
            }



            Session.set('selectedPlayer', '');

            Meteor.call('insertPlayerData', playerNameVar, initialScore);
            //console.log("Got the form homie!");
            //console.log(event.type);
        },

        'click .remove': function(){

            var confirmRemove = confirm("Do you really want to remove this player?")

            if (confirmRemove === true) {
                var selectedPlayer = Session.get('selectedPlayer');
                PlayersList.remove(selectedPlayer);
            }

        }
    });
}
//will only run on the server
if(Meteor.isServer){
    Meteor.publish('thePlayers', function(){
        var currentUserId = this.userId;
        return PlayersList.find({createdBy: currentUserId});
    });

    Meteor.methods({
        'insertPlayerData': function(playerNameVar, initalScore){
            var currentUserId = Meteor.userId();
            PlayersList.insert({
                name: playerNameVar,
                score: initalScore,
                createdBy: currentUserId
            })
        }

    });


}