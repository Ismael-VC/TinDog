const {
  History
} = ReactRouter;

LogIn = React.createClass({
  mixins: [History],
  onFormSubmit(e) {
    e.preventDefault();    
    let correo = this.refs.correo.value.trim();
    let password = this.refs.password.value.trim();
    Meteor.call("registerUser",correo,password);    
    Meteor.loginWithPassword({email: correo}, password, this.signInCallback);
  },
  signInCallback(error) {
    if (error === undefined) {
      // Navigate to the protected app since the sign in was successful
      let nombreAlbergue = this.refs.nombreAlbergue.value.trim();
      let direccion = this.refs.direccion.value.trim();
      let descripcion = this.refs.descripcion.value.trim();
      Meteor.call("registerAlbergue",Meteor.userId(),nombreAlbergue,direccion,descripcion);
      this.history.pushState(null, "/app");

    }
    else {
      // Do something with the error in production
    }
  },
  componentWillMount() {
    // Update the page's title
    document.title = "Sign In";
  },
  render() {
    return (
      <div className="row-form">        
          <div className='form animated bounceIn'>
            <h2>Login To Your Account</h2>
            <form onSubmit={this.onFormSubmit}>
              <input placeholder='Nombre del Albergue' type='text' ref="nombreAlbergue"></input>
              <input placeholder='Dirreción' type='text' ref="direccion"></input>
              <textarea ref="descripcion" className="form-control" id="exampleTextarea" cols="40" rows="5" placeholder="Descripcion del albergue"></textarea>
              <input placeholder='correo' type='text' ref="correo"></input>
              <input placeholder='Password' type='password' ref="password"></input>
              <button className='animated infinite pulse'>Login</button>
            </form>
          </div>
      </div>
    );
  }
});
