
/*populate = function() {
  while (MyData.find().count() < 10) {
    MyData.insert({
      name: faker.name.findName(),
      image: faker.image.people()+"?"+Random.hexString(24),
      details: faker.lorem.sentence()
    })
  }
}*/

Meteor.startup(function() {  
  Meteor.publish("myData", function() {
  return MyData.find()
})

var remote = DDP.connect('http://localhost:3000/');
remote.subscribe('perros', function() {
  Meteor.publish("perros", function () {
    return Perros.find();
  });      
});
});
