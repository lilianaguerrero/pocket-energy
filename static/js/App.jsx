
class App extends React.Component {
    constructor(){
        super();
        this.state = {
            housingType: null,
            renterType: null,
            isFinalStepDone: false,
            dataReceivedFromResponse: {}
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
                <Loc />
                <Building parentCallback = {this.handleAppState} />
                {this.state.housingType !== 'renter' && <Solar />}
                {this.state.housingType !== 'commercial_property' && <HomeProds parentCallback = {this.handleAppState} />}
                {this.state.housingType !== 'renter' && this.state.housingType !== 'homeowner' && <CommProds />}
                {this.state.isFinalStepDone && <Result />}
                </div>
        );
    }    
}
                // {this.state.isFinalStepDone && <Result propA=this.state.dataReceivedFromResponse />}


ReactDOM.render(<App />, document.getElementById("app"));