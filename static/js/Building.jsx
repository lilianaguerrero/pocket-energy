class Building extends React.Component {
  constructor(props){
        super(props)
        this.state = {
          renter: false,
          homeowner: false,
          commercial_property: false
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'radio' ? target.checked : target.value;
    const name = target.name;
    this.props.parentCallback('housingType', name)


    this.setState({
      [name]: value
    }, () => { console.log(this.state)});
  }

  render(){
    if (this.state.renter || this.state.homeowner || this.state.commercial_property) {
      return <div></div>
    }
    return (
      <div className="form">
      <h1>
        What best describes your building?
        </h1>
          <br />
            <label>
            A rental home or apartment 
              <input
                name="renter"
                type="radio"
                checked={this.state.renter}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              A purchased home
              <input
                name="homeowner"
                type="radio"
                value={this.state.homeowner}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              A commercial property
              <input
                name="commercial_property"
                type="radio"
                value={this.state.commercial_property}
                onChange={this.handleInputChange} />
            </label>
      </div>
    );
  }
}


