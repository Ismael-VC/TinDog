const {
  Router,
  Route,
  IndexRoute,
  history,
  Redirect
} = ReactRouter;

const browserHistory = history.createHistory();
//necesario para el router de react
Routes = React.createClass({
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Index}/>
          <Route path="download" component={Download}/>
          <Route path="signin" component={SignIn}/>
          <Route path="login" component={LogIn}/>
        </Route>

        <Route path="/app" component={AuthenticatedApp}>
          <IndexRoute component={AuthenticatedAppIndexRegistrar }/>
          {/* Additional routes requiring authentication go here */}
          <Route path="/cuenta" component={AuthenticatedAppIndex}/>
          <Route path="/mascotas" component={AuthenticatedAppIndexMascotas} />
          <Route path="/mascota/:_id" component={AuthenticatedAppIndexMascota} />
          <Route path="/solicitudes" component={AuthenticatedAppIndexSolicitudes}/>
        </Route>
      </Router>
    );
  }
});
