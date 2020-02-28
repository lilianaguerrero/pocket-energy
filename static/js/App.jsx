
class App extends React.Component {
    constructor(){
        super();
        this.state = {
            housingType: null,
        }
    }
    
    handleHousing(housingType){
        this.setState({
            housingType: housingType
        })
    }

    render(){
        return( 
           
                <div>
                <Loc />
               <Building handleHousing = {this.handleHousing.bind(this)}/>
                {this.state.housingType != 'renter' && <Solar />}
                {this.state.housingType != 'commercial_property' && <HomeProds />}
                {this.state.housingType != 'renter' && this.state.housingType != 'homeowner' && <CommProds />} 
        
                </div>
        );
    }    
}

// class Tracking extends React.Component{
//     constructor(props) {
//         super(props)
//         this.state = {location: undefined,
//                         building_type: undefined,
//                         solar_type: undefined,
//                         products: undefined}
//     }
// }

ReactDOM.render(<App />, document.getElementById("app"));