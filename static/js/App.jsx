
class App extends React.Component {
    constructor(){
        super();
        this.state = {
            housingType: null,
            renterType: null,
            isFinalStepDone: false,
            dataReceivedFromResponse: {}
        }
    }


    handleAppState(propertyName, propertyValue) {
        console.log(propertyName, propertyValue);
        let currentState = {};
        currentState[propertyName] = propertyValue;
        this.setState(currentState);
    }


    render(){
        console.log(this.state);
        return( 
           
                <div>
                <Loc />
                <Building handleAppState = {this.handleAppState.bind(this)} />
                {this.state.housingType != 'renter' && <Solar />}
                {this.state.housingType != 'commercial_property' && <HomeProds />}
                {this.state.housingType != 'renter' && this.state.housingType != 'homeowner' && <CommProds />}
                {this.state.isFinalStepDone && <Result propA=this.state.dataReceivedFromResponse />}
                </div>
        );
    }    
}


ReactDOM.render(<App />, document.getElementById("app"));