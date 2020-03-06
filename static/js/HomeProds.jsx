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
          lightbulbs: false,
          submitted: false
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
    this.setState({
      submitted: true
    })

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
      loc: this.props.currentStatus.loc,
      housingType: this.props.currentStatus.housingType,
      solar: this.props.currentStatus.solar
    }

    $.post('/results-js.json', selections, (response) => this.setState({result: response}))

  }

  render(){
    console.log('in home prods', this.props.currentStatus)
    return (
      <div>
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
        </div>

        {this.state.result && this.state.result.products.map((product) => <div key = {product.product_link}> 
        <div>{product.product_img[0]} </div>
        <div> {product.product_type[0]} </div>
        <div> {product.product_brand[0]} </div>
        <div>{product.product_model[0]} </div>
        <div> {product.product_link[0]} </div>
        </div>  )}

        {this.state.result && 
          <div>
          {this.state.result.program_link}
          </div>}
        {this.state.result && 
          <div>
          {this.state.result.solar}
          </div>}
    
      </div> 
    )
  }
}


