class Building extends React.Component {
  constructor(props){
        super(props)
        this.state = {building: ''}
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
        What best describes your building? 
            <form>
              <select value={this.state.building} onChange={this.handleChange}>
                    <option value="renter">Renter</option>
                    <option value="homeowner">Homeowner</option>
                    <option value="commercial_property">Commercial Property</option>
              </select>
              <input type="submit" value="Submit" />
            </form>
      </div>
    );
  }
}


