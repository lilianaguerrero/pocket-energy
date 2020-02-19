class Homepage extends React.Component {
  render(){
    return (
      <div>
        <img src="/static/images/Pocket-Energy-Logo.png" />

        <p>This application provides custom energy efficiency options, reducing carbon footprint and maximizing return on investment.</p>
        
        <a href="/Tracking">
          Are you interested in saving $$$$ AND saving the planet ?
        </a>

      </div>

    );
  }
}

ReactDOM.render(<Homepage />, document.getElementById('homepage'));
