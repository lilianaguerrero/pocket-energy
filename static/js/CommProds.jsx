class CommProds extends React.Component {
  constructor(props){
        super(props);
        this.state = {
          washer: false,
          dishwasher: false,
          boiler: false,
          airconditioner: false,
          thermostat: false,
          submitted: false
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
    this.setState({
      submitted: true
    })

    console.log("Let's get you some results")
    let selections = {
      washer: this.state.washer,
      boiler: this.state.boiler,
      dishwasher: this.state.dishwasher,
      airconditioner: this.state.airconditioner,
      thermostat: this.state.thermostat,
      loc: this.props.currentStatus.loc,
      housingType: this.props.currentStatus.housingType,
      solar: this.props.currentStatus.solar
    }

    $.post('/results-js.json', selections, (response) => this.setState({result: response}))
    
  }


  render(){
    console.log('in comm prods', this.props.currentStatus)
    if (this.state.submitted) {
      return(
        <div className="result">
        <p>
            These suggested products are from the EPA Energy Star Program:
          </p>
        {this.state.result && this.state.result.products.map((product) => 
          <div key = {product.product_link}> 
          <img src= {product.product_img[0]} />
          <div> {product.product_type[0]} </div>
          <div> {product.product_brand[0]} </div>
          <div>{product.product_model[0]} </div>
          <a href= {product.product_link[0]}> Get Product info</a>
          </div>  )}

        {this.state.result && 
          <div>
            <a href= {this.state.result.program_link}> Get Community Choice Aggregate Info</a>
          </div>
        }

        {this.state.result && 
          <div>
            <img src= {this.state.result.solar_pic} /> 
            <br />
            <a href= {this.state.result.solar}> Get Solar Info</a> 
          </div>

        }
          
      </div>)
    }

          
    return (
      <div className="form"> What appliances or housewares are you interested in purchasing?
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
        </div>
    );
  }
}


