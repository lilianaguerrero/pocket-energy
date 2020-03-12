class Solar extends React.Component {
  constructor(props){
        super(props)
        this.state = {
          solar_water_heating: false,
          solar_panels: false,
          c_solar_panels: false,
          none: false}

        this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'radio' ? target.checked : target.value;
    const name = target.name;
    this.props.parentCallback('solar', name)

    this.setState({
      [name]: value
    }, () => { console.log(this.state)});
  }

  render(){
    if (this.state.solar_water_heating || this.state.solar_panels || this.state.c_solar_panels || this.state.none) {
      return <div></div>
    }
    return (
      <div className="form">
      <h2>
        Do you have free roof area? And Do one of the following apply to you?
        </h2>
          <br />
            <label>
            The priority is to save $$ on your water heating & do you use Natural Gas?
              <input
                name="solar_water_heating"
                type="radio"
                checked={this.state.solar_water_heating}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              The priority to save $$ on your electricity bill & do you have free roof space?
              <input
                name="solar_panels"
                type="radio"
                value={this.state.solar_panels}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              You are a multi-family property owner or tenant?
              <input
                name="c_solar_panels"
                type="radio"
                value={this.state.c_solar_panels}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              None
              <input
                name="none"
                type="radio"
                value={this.state.none}
                onChange={this.handleInputChange} />
            </label>
      </div>
    );
  }
}


