// A container component for basic views to be rendered in
App = React.createClass({
  render() {
    return (
      <div className="super-container">
        {/*<AppNavBar/>*/}        
        {/* Views will be rendered here */}
        {this.props.children}        
      </div>
    );
  }
});
