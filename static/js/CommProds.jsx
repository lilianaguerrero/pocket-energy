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
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }, () => { console.log(this.state)});
  }

  render(){
    return (
      <div> What appliances or housewares are you interested in purchasing?
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
        </form>
      </div>
    );
  }
}


