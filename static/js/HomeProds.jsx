class HomeProds extends React.Component {
  constructor(props){
        super(props);
        this.state = {
          washer: false,
          dryer: false

        };

        this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render(){
    return (
      <div> What appliances or housewares are you interested in purchasing?
        <form >
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
        </form>
      </div>
    );
  }
}

  console.log(this.props)

