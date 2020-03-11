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
        this.solarLinks = this.solarLinks.bind(this)
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

  solarLinks() {
    if (this.state.result && this.state.result.solar_pic !== '') {
      return (
            <div>
              <img src= {this.state.result.solar_pic} /> 
              <br />
              <a href= {this.state.result.solar}> Get Solar Info</a> 
            </div>
      )
    }
  }

  renderCarouselDots() {
    return this.state.result && this.state.result.products.map((value,index) => {
      let activeClass = index == 0 ? 'active' : ''
      return (
        <li key={index} data-target="#myCarousel" data-slide-to={index} className={activeClass}></li>
      )
  
  })}

  renderProduct(){
    return this.state.result && this.state.result.products.map((product, index) => {
            let activeClass = index === 0 ? 'active' : '';
            return ( 
              <div key={product.product_link} className={`item ${activeClass}`}>
                <img src={product.product_img[0]} alt={product.product_type[0]} ></img>
                <div className="carousel-caption"> 
                <strong>{product.product_brand}</strong>
                  <p>{product.product_model}</p>
              </div>
              </div>             
          )
  })}

  render(){
    if (this.state.submitted) {
      return(        
        <div className="result">
          <div>
              <p>
                These suggested products are from the EPA Energy Star Program:
              </p>
              <div className="container">
              <div id="myCarousel" className="carousel slide">
              <ol className="carousel-indicators">
                {this.renderCarouselDots()}
              </ol>
              <div className="carousel-inner" role="listbox">

              {this.renderProduct()}
              </div>
                <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                  <div>
                    <span className="glyphicon glyphicon-chevron-left"></span>
                    <span className="sr-only">Previous</span>
                  </div>
                </a>
                <a className="right carousel-control" href="#myCarousel" data-slide="next">
                  <div>
                    <span className="glyphicon glyphicon-chevron-right"></span>
                    <span className="sr-only">Next</span>
                  </div>          
                </a>
              </div>
          


              {this.state.result && 
                <div>
                  <a href= {this.state.result.program_link}> Get Community Choice Aggregate Info</a>
                </div>
              }
              {this.solarLinks()}
          </div>
        </div>
        </div>
      )
    }
    return (
      <div>
        <div className="form" > 
        What appliances or housewares are you interested in purchasing?
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
        </div>
        
    )
  }
}

