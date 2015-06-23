PlayersList = new Mongo.Collection('players');

console.log("Hello World");

if(Meteor.isClient){
  console.log("fuk me!!")
}

if(Meteor.isServer){
  console.log("fuk kyu!!")
}