
class App extends React.Component {
    constructor(){
        super();
        this.state = {
            loc: null,
            housingType: null,
            solar: null
        }
        this.handleAppState = this.handleAppState.bind(this)
    }


    handleAppState(propertyName, propertyValue) {
        console.log(propertyName, propertyValue);
        let currentState = {};
        currentState[propertyName] = propertyValue;
        this.setState(currentState);
    }


    render(){
        return( 
                <div>
                <Loc parentCallback = {this.handleAppState} />
                <Building parentCallback = {this.handleAppState} />
                {this.state.housingType !== 'renter' && <Solar parentCallback = {this.handleAppState} />}
                {this.state.housingType !== 'commercial_property' && <HomeProds parentCallback = {this.handleAppState} currentStatus = {this.state}/>}
                {this.state.housingType !== 'renter' && this.state.housingType !== 'homeowner' && <CommProds parentCallback = {this.handleAppState} currentStatus = {this.state} />}
                </div>
        );
    }    
}
                // {this.state.isFinalStepDone && <Result propA=this.state.dataReceivedFromResponse />}


ReactDOM.render(<App />, document.getElementById("app"));