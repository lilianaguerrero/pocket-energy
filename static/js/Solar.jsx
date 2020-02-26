class Solar extends React.Component {
  constructor(props){
        super(props)
        this.state = {solar: ''}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value})
  }

  handleSubmit(event) {
    this.setState({ value: event.target.value})
  }

  render(){
    return (
      <div>
        Do you have free roof area? And Do one of the following apply to you?
          <form>
            <select value={this.state.solar} onChange={this.handleChange}>
                  <option value="solar_water_heating"> The priority is to save $$ on your water heating & do you use Natural Gas?</option>
                  <option value="solar_panels">The priority to save $$ on your electricity bill & do you have free roof space?</option>
                  <option value="c_solar_panels">You are a multi-family property owner or tenant?</option>
            </select>
            <input type="submit" value="Submit" />
          </form>
      </div>
    );
  }
}


