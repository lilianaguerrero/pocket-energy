class HomeProds extends React.Component {
  constructor(props){
        super(props);
        this.state = {
          washer: false,
          dryer: false,
          dishwasher: false,
          refrigerator: false,
          fan: false,
          furnace: false,
          thermostat: false,
          lightbulbs: false,
          submit: false
        };

        this.handleInputChange = this.handleInputChange.bind(this)
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
    const target = event.target;
    const value = target.type === 'submit' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }, () => { console.log(this.state)});
  }

  render(){
    return (
      <div> What appliances or housewares are you interested in purchasing?
        
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
              Clothes Dryer
              <input
                name="dryer"
                type="checkbox"
                value={this.state.dryer}
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
              Refrigerator
              <input
                name="refrigerator"
                type="checkbox"
                value={this.state.refrigerator}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Ceiling Fan
              <input
                name="fan"
                type="checkbox"
                value={this.state.fan}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Furnace
              <input
                name="furnace"
                type="checkbox"
                value={this.state.furnace}
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
            <br />
            <label>
              Lightbulbs
              <input
                name="lightbulbs"
                type="checkbox"
                value={this.state.lightbulbs}
                onChange={this.handleInputChange} />
            </label>
        <input type="submit" value="Submit" />
        
       
      </div>
    );
  }
}


