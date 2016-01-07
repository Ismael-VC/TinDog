const {
  Link
} = ReactRouter;

var uploader = new Slingshot.Upload("myFileUploads");

UsersIndex=React.createClass({
  render() {
    return (
      <div>
        <h3>UsersIndex</h3>
      </div>
    )
  }
});




AuthenticatedAppIndex = React.createClass({
  componentWillMount() {
    // Update the page's title
    document.title = "Cuenta";
  },
  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <p>This is the index page for the authenticated app.</p>
          <form>
            <fieldset className="form-group">
              <label htmlFor="formGroupExampleInput">Nombre del Albergue</label>
              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Nombre"></input>
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="exampleTextarea">Dirección</label>
              <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
            </fieldset> 
            <fieldset className="form-group">
              <label htmlFor="exampleTextarea">Descripcion del Albergue</label>
              <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
            </fieldset> 
            <fieldset className="form-group">
              <label htmlFor="exampleInputEmail1">Correo</label>
              <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Ingrese Correo"></input>
              <small className="text-muted">You will never share your email with anyone else.</small>
            </fieldset>        
            <button type="submit" className="btn btn-primary">Guardar</button>
          </form>
        </div>
      </div>
    );
  }
}); 

AuthenticatedAppIndexRegistrar = React.createClass({
  render: function() {
    return (
      <div>   
        <DropzoneDemo />  
      </div>
    );
  }
});

AuthenticatedAppIndexMascotas = React.createClass({
  getInitialState: function() {
    return {perros: null};
  },
  componentWillMount: function() {
    this.setState({perros: this.showDogs()});
  },
  showDogs:function(){
    let perros=Perros.find({"id_dueno":Meteor.userId()}).fetch();
    console.log(perros);
    return  perros;
  },
  render: function() {
    return (
      <div className="centered">
          <section className="cards">
          {this.state.perros.map(function(perro){
            return <DogCard key={perro._id} perro={perro}/>;
          })}
          </section>
      </div>      
    );
  }
});

DogCard=React.createClass({
  render: function() {
    return (  
          <Link to={`/mascota/${this.props.perro._id}`}> 
            <article className="card">
              <div className="inner-card">
                <figure className="thumbnail">
                  <img src={this.props.perro.fotos} alt="meow"></img>
                </figure>
                <div className="card-content">
                  <h2>{this.props.perro.nombre}</h2>
                  <p>Albergue {this.props.perro.albergue}</p>
                  <p>{this.props.perro.descripcion}</p>
                </div>
              </div>
            </article>  
          </Link>         
    );
  }
});


AuthenticatedAppIndexMascota= React.createClass({
  getInitialState: function() {
    var foto=Perros.findOne(this.props.params._id);
    if(foto.fotos){
      return {file: null,
            perro:Perros.findOne(this.props.params._id),
            previo:foto.fotos
          };
    }
    return {file: null,
            perro:Perros.findOne(this.props.params._id),
            previo:null
          };
  },
  onDrop: function (files) {
    this.setState({file: files[0]});    
    this.setState({previo: files[0].preview}); 
  },
  elimina:function(){
    var foto=Perros.findOne(this.props.params._id).fotos[0];
    Meteor.call("deleteDog",foto);
    Perros.remove(this.props.params._id);
  },
  removePicture:function(e){
    Perros.update(this.props.params._id,{$pullAll:{fotos:[this.state.perro.fotos[0]]}});
    this.setState({previo: null});
  },
  actualizarPerro:function(e){
    var nombre=this.refs.nombre.value;
    var edad=this.refs.edad.value;
    var descripcion=this.refs.descripcion.value;
    var self=this;
    if(this.state.file){
      uploader.send(this.state.file, function (error, downloadUrl) {
      if (error) {
        // Log service detailed response.
        console.error('Error uploading');
        alert (error);
      }
      else {
        console.log(nombre+" "+edad+" "+descripcion);            
        Perros.update(self.props.params._id,{$set:{"nombre":nombre,"edad":edad,"descripcion":descripcion,"fotos":[downloadUrl]}});
      }          
    });
    }else{
      Perros.update(this.props.params._id,{$set:{"nombre":nombre,"edad":edad,"descripcion":descripcion}});
    }
    
    
  },
  render: function() {
    return (
      <div className="row">
            <div className="col-xs-12">
              <p>This is the index page for the authenticated app.</p>
              <form onSubmit={this.onFormSubmit} ref="formulario" >
                <fieldset className="form-group">
                  <label htmlFor="formGroupExampleInput">Nombre</label>
                  <input ref="nombre" type="text" className="form-control" id="formGroupExampleInput" placeholder="Nombre" defaultValue={this.state.perro.nombre} ></input>
                </fieldset>           
                <fieldset className="form-group">
                  <label htmlFor="exampleTextarea">Edad</label>
                  <input ref="edad" type="text" className="form-control" id="formGroupExampleInput" placeholder="Edad" defaultValue={this.state.perro.edad}></input>
                </fieldset>          
                <fieldset className="form-group">
                  <label htmlFor="exampleTextarea">Descripcion</label>
                  <textarea ref="descripcion" className="form-control" id="exampleTextarea" rows="3" placeholder="Descripcion" defaultValue={this.state.perro.descripcion} ></textarea>
                </fieldset>  
                <DropzoneWraper onDrop={this.onDrop} previo={this.state.previo} removePicture={this.removePicture} elimina={this.elimina}/>                                           
                <Link to={"/mascotas"}><button type="submit" className="btn btn-primary" disabled={!this.state.previo} onClick={this.actualizarPerro} >Actualizar</button></Link>
              </form>
            </div>
          </div>
    );
  }
});      

DropzoneWraper= React.createClass({
  render: function() {
    return (
      <div>
        {this.props.previo?(<div><img src={this.props.previo}/><button type="submit" className="btn btn-primary" onClick={this.props.removePicture}>Eliminar Foto</button><Link to={`/mascotas`}><button type="submit" className="btn btn-primary" onClick={this.props.elimina}>Eliminar Perro</button></Link></div>):(<Dropzone onDrop={this.props.onDrop}>
          <div>Presiona o arrastra para agregar sus fotos</div>
        </Dropzone>)}
      </div>
    );
  }
});

AuthenticatedAppIndexSolicitudes= React.createClass({
  render: function() {
    return (
      <div>Solicitudes</div>
    );
  }
});





DropzoneDemo = React.createClass({
    getInitialState: function() {
      return {file: null,previo:null};
    },
    onDrop: function (files) {
      this.setState({file: files[0]});    
      this.setState({previo: files[0].preview}); 

    },
    onFormSubmit:function(e) {
      e.preventDefault(); 
      var nombre=this.refs.nombre.value;
      var edad=this.refs.edad.value;
      var descripcion=this.refs.descripcion.value;
      uploader.send(this.state.file, function (error, downloadUrl) {
        if (error) {
          // Log service detailed response.
          console.error('Error uploading');
          alert (error);
        }
        else {
          console.log(nombre+" "+edad+" "+descripcion);          
          Meteor.call("addDog",nombre,edad,descripcion,downloadUrl);    
        }          
      });
      this.setState({file: null});
      this.setState({previo: null});
      this.refs.formulario.reset();
    },
    render: function () {
      return (
          <div className="row">
            <div className="col-xs-12">
              <p>This is the index page for the authenticated app.</p>
              <form onSubmit={this.onFormSubmit} ref="formulario" >
                <fieldset className="form-group">
                  <label htmlFor="formGroupExampleInput">Nombre</label>
                  <input ref="nombre" type="text" className="form-control" id="formGroupExampleInput" placeholder="Nombre"></input>
                </fieldset>           
                <fieldset className="form-group">
                  <label htmlFor="exampleTextarea">Edad</label>
                  <input ref="edad" type="text" className="form-control" id="formGroupExampleInput" placeholder="Edad"></input>
                </fieldset>          
                <fieldset className="form-group">
                  <label htmlFor="exampleTextarea">Descripcion</label>
                  <textarea ref="descripcion" className="form-control" id="exampleTextarea" rows="3" placeholder="Descripcion"></textarea>
                </fieldset> 
                {!this.state.previo?<Dropzone onDrop={this.onDrop}>
                  <div>Presiona o arrastra para agregar sus fotos</div>
                </Dropzone>:null}                
                {this.state.previo?<img src={this.state.previo}/>:null}                
                <button type="submit" className="btn btn-primary" disabled={!this.state.previo}>Guardar</button>
              </form>
            </div>
          </div>
      );
    }
});




