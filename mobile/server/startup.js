

Meteor.startup(function(){
  Meteor.publish("perros", function () {
    return Perros.find();
  }); 
  //Perros.update(Perros.findOne({},{_id:1}),{$push:{candidatos:{"nombre":"yamir"}}});
});

function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x7|0x8)).toString(16);
  });
  return uuid.toUpperCase();
}

Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
  bucket: "tindogimage",

  acl: "public-read",

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    //Store file into a directory by the user's id
    return this.userId + "/" + generateUUID();
  }
});


Meteor.methods({
  registerUser:function(correo,password){
    Accounts.createUser({'email':correo,'password': password});    
  },
  registerAlbergue:function(userId,nombreAlbergue,direccion,descripcion){
    Meteor.users.update(userId,{$set: {"nombreAlbergue":nombreAlbergue,"direccion":direccion,"descripcion":descripcion}});
  },
  addDog: function (nombre,edad,descripcion,downloadUrl) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    var user=Meteor.users.findOne(Meteor.userId());
    Perros.insert({"id_dueno":Meteor.userId(),"albergue":user.nombreAlbergue,"nombre":nombre,"edad":edad,"descripcion":descripcion,"fotos":[downloadUrl]});
  },
  deleteDog:function(currentPhoto){
    if(currentPhoto){
      var currentPhotoURL = currentPhoto.replace('https://' + Meteor.settings.private.amazonS3.bucket + '.s3.amazonaws.com/', '');
      console.log(currentPhotoURL);
      AWS.config.update({
        accessKeyId: Meteor.settings.private.amazonS3.AWSAccessKeyId,
        secretAccessKey: Meteor.settings.private.amazonS3.AWSSecretAccessKey
      });

      var s3 = new AWS.S3();
         var params = {
         Bucket: Meteor.settings.private.amazonS3.bucket,
         Key: currentPhotoURL
      };

      var deleteObject = Meteor.wrapAsync(
         s3.deleteObject(params, function(error, data) {
            if(error) {
               console.log(error);
            } else {
               console.log(data);
            }
         })
      );
    }    
  },
  setCandidato:function(perroId,usuario){
    Perros.update(perroId,{$push:{candidatos:usuario}});
  }
})

