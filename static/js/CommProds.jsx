class CommProds extends React.Component {
  constructor(props){
        super(props);
        this.state = {
          washer: false,
          dishwasher: false,
          boiler: false,
          airconditioner: false,
          thermostat: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }, () => { console.log(this.state)});
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log("Let's get you some results")
    let selections = {
      washer: this.state.washer,
      boiler: this.state.boiler,
      dishwasher: this.state.dishwasher,
      airconditioner: this.state.refrigerator,
      thermostat: this.state.thermostat,
    }

    $.post('/results-js.json', selections, (response) => this.setState({result: response}))
    
  }


  render(){
    console.log('in comm prods', this.props.currentStatus)
    return (
      <div>
      <div> What appliances or housewares are you interested in purchasing?</div>
        <form >
          <label>
            Clothes Washer
            <input
              name="washer"
              type="checkbox"
              checked={this.state.washer}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Dishwasher
            <input
              name="dishwasher"
              type="checkbox"
              value={this.state.dishwasher}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Boiler
            <input
              name="boiler"
              type="checkbox"
              value={this.state.boiler}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Airconditioner
            <input
              name="airconditioner"
              type="checkbox"
              value={this.state.airconditioner}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Thermostat
            <input
              name="thermostat"
              type="checkbox"
              value={this.state.thermostat}
              onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      <div>{this.state.result}</div>
      </div>
    );
  }
}


