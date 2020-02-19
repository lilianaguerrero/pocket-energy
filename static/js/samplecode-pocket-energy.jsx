
class HomePage extends React.Component {
  render() {
  return (
    <div> i am the homepage </div>
  );
  }
}


class Tracking extends React.Component {
    constructor(props) {
        super(props)
        this.state = { location : undefined,
                        buildingType: undefined,
                        solarType: undefined,
                        products: undefined}
        this.handleInput = this.handleInput.bind(this) //what is binding??
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInput(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log('handle submission')
        let location = this.state.location;
        let buildingType = this.state.buildingType;
        let solarType = this.state. solarType;
        let products = this.state.products;

        let data = {
            location: this.state.location,
            buildingType = this.state.buildingType;
            solarType = this.state. solarType;
            products = this.state.products
        }

        $.post('/results-JS', data, (response) => console.log(response))
    }

    render(){
    console.log(this.state)

    return (
    <form> 
      <label>
        Location:
        <input name='location' onChange={this.handleInput} type="text"/> 
      </label>
      <label>
        Building Type:
        <input name='buildingType' onChange={this.handleInput} type="text"/>  
      </label>
      <button onClick={this.handleSubmit}> submit </button>
      <label>
        Solar Type:
        <input name='solarType' onChange={this.handleInput} type="text"/>  
      </label>
      <button onClick={this.handleSubmit}> submit </button>
      <label>
        Products:
        <input name='products' onChange={this.handleInput} type="text"/>  
      </label>
      <button onClick={this.handleSubmit}> submit </button>
    </form>
    );
    }
}

class App extends React.Component {
    constructor() {
        super();

        this.state = { currentPage: 0, pages: [<HomePage/>, <Tracking/>, <Results/>] }; 
    }
    // updateCards(response) {

    componentDidMount() {
    // this.getCardData();
    }

    render() {
        return(
            <div>
                <div>
                <button onClick= {() => this.setState({surrentPage: 0})}> HomePage </button>
                <button onClick= {() => this.setState({surrentPage: 1})}> Tracking </button>
                <button onClick= {() => this.setState({surrentPage: 2})}> Results </button>
                </div>
                <div>
                {this.state.pages[this.state.currentPage]}
                </div>
            </div>

        );
    }
}


ReactDOM.render(<Homepage />, document.getElementById('container'));