const {
  Link,
  History
} = ReactRouter;

Index = React.createClass({
  componentWillMount() {
    // Update the page's title
    document.title = "TinDog Albergue";
  },
  render() {
    return (    
      <div className="wrap">
        <NavLinkIndex to="/" index><img className="logo" src="/img/TinDog-icon-1.png" ></img></NavLinkIndex>
        <h2 className="description">CONOCE A TU PRÓXIMO MEJOR AMIGO;<br/> REGÁLALE UN HOGAR. </h2>
        <div className="wrap-buttons">
        <NavLinkIndex to="/download">
          <div id="message1" className="center1">
            <div className="outside">ADOPTA<br/> AHORA</div>
          </div>
        </NavLinkIndex>
        <NavLinkIndex to="/signin" >
            <div id="message2" className="center2">
              <div className="outside">DA EN <br/>ADOPCIÓN</div>
            </div>
        </NavLinkIndex>
        </div>          
      </div>  
    );
  }
});


var NavLinkIndex = React.createClass({
  mixins: [History],
  render() {
    let isIndex = this.props.index !== undefined;
    let isActive = this.history.isActive(this.props.to, this.props.query, isIndex);
    let className = isActive ? 'active' : '';

    return (
      <Link to={this.props.to}>{this.props.children}</Link>
    );
  }
});