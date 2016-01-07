const {
  History,
  Link
} = ReactRouter;

SignIn = React.createClass({
  mixins: [History],
  onFormSubmit(e) {
    e.preventDefault();
    let correo = this.refs.correo.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email: correo}, password, this.signInCallback);
  },
  signInCallback(error) {
    if (error === undefined) {
      // Navigate to the protected app since the sign in was successful
      this.history.pushState(null, "/app");
    }
    else {
      alert("Error");
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
              <input placeholder='Correo' type='mail' ref="correo"></input>
              <input placeholder='Password' type='password' ref="password"></input>
              <button className='animated infinite pulse'>Login</button>
              <Link to="/login">Registrarse</Link>
            </form>
          </div>
      </div>
    );
  }
});


