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
        this.solarLinks = this.solarLinks.bind(this);
        this.renderCarouselDots = this.renderCarouselDots.bind(this);
        this.renderProduct = this.renderProduct.bind(this)
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


  solarLinks() {
    if (this.state.result && this.state.result.solar_pic !== '') {
      return (
            <div>
            <h3>
              Solar Power may be a good fit for your building: <br/>
              </h3>
              <img src= {this.state.result.solar_pic} /> 
              <br />
              <p>
              <a href= {this.state.result.solar}> Get Solar Info</a> 
              </p>
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
                <img className="carousel-img" src={product.product_img[0]} alt={product.product_type[0]} ></img>
                <div className="carousel-caption"> 
                <strong>{product.product_brand}</strong>
                  <p>{product.product_model}</p>
                  <a href= {product.product_link[0]}>Product Info</a>
              </div>
              </div>             
          )
  })}

  render(){
    if (this.state.submitted) {
      return(
        <div className="result">
          <h3>
            These products are the most efficient from the EPA EnergyStar Program:
          </h3>
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
                <h3>
                  You may be eligible for a clean energy program from your local utility: <br/>
                  </h3>
                  <p>
                  <a href= {this.state.result.program_link}> Get Community Choice Aggregate Info</a>
                </p>
                </div>
              }
              {this.solarLinks()}
          </div>
        
        </div>
      )
    }

    return (
      <div className="form"> 
      <h2>
      What appliances or housewares are you interested in purchasing?
      </h2>
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


