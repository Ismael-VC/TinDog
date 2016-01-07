var remote = DDP.connect('http://localhost:3000/');
Perros = new Meteor.Collection('perros', remote); 
MyData = new Mongo.Collection("myData");