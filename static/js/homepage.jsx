

class Homepage extends React.Component {
  render(){
    return (
      <div>
        <img src="/static/images/Pocket-Energy-Logo.png" />

        <p>This application will take you through a series of questions about your building <br />
        and provide custom energy efficiency options, all selected from expert <br />
        resources to reduce your carbon footprint and maximize return on investment.</p>
        

        <p>Are you interested in saving cash AND saving the planet ? </p>
        <a href="/App">
          Let's Go!!
        </a>

      </div>

    );
  }
}

ReactDOM.render(<Homepage />, document.getElementById("app"));
