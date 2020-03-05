class HomeProds extends React.Component {
  constructor(props){
        super(props);
        this.state = {
          washer: false,
          dryer: false,
          dishwasher: false,
          refrigerator: false,
          ceiling_fan: false,
          furnace: false,
          thermostat: false,
          lightbulbs: false
        };

        this.handleInputChange = this.handleInputChange.bind(this)
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
      dryer: this.state.dryer,
      dishwasher: this.state.dishwasher,
      refrigerator: this.state.refrigerator,
      ceiling_fan: this.state.ceiling_fan,
      furnace: this.state.furnace,
      thermostat: this.state.thermostat,
      lightbulbs: this.state.lightbulbs,
      otherComps: this.props.currentStatus 
    }

    


    $.post('/results-js', selections, (response) => this.setState({result: response}))
    
  }
// {
    // // let responseObject = response
    // // let dataReceivedFromResponse = responseObject;
    // // this.parentCallback('isFinalStepDone', true);
    // // this.parentCallback('dataReceivedFromResponse', dataReceivedFromResponse);
    // })
  render(){
    console.log('in home prods', this.props.currentStatus)
    return (
      <div>
      <div> What appliances or housewares are you interested in purchasing?</div>
      <form onSubmit= {this.handleSubmit}>
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
                name="ceiling_fan"
                type="checkbox"
                value={this.state.ceiling_fan}
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
        </form>

      <div>{this.state.result}</div>
      </div>
    );
  }
}


