

class Homepage extends React.Component {
  render(){
    return (
      <div className="outer-div">
      <div className="result">
        
        <h2>Are you intersted in saving money & saving the planet? </h2><br/>
        <p align= "center">Let's reduce your building's carbon footprint and maximize return on investment.</p><br/>
        <p align= "center">
        <a className="homepage" href="/App">
          Let's Go Green!!
        </a>
        </p>
      </div>
      </div>

    );
  }
}

ReactDOM.render(<Homepage />, document.getElementById("app"));
