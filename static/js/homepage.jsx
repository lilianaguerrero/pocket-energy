

class Homepage extends React.Component {
  render(){
    return (
      <div>
        
        <h2>Are you intersted in saving money & saving the planet? </h2>
        <p>Pocket-Energy will help reduce your building's carbon footprint and maximize return on investment.</p>
        <p>
        <a className="homepage" href="/App">
          Let's Go Green!!
        </a>
        </p>
      </div>

    );
  }
}

ReactDOM.render(<Homepage />, document.getElementById("app"));
