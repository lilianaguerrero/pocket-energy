class Loc extends React.Component {
  constructor(props){
        super(props)
        this.state = {
          Alameda_County: false,
          Peninsula: false,
          SF: false,
          Sonoma: false,
          SV: false,
          SJ: false,
          Other: false, 
        };

        this.handleInputChange = this.handleInputChange.bind(this)
        
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'radio' ? target.checked : target.value;
    const name = target.name;
    this.props.parentCallback('loc', name)

    this.setState({
      [name]: value
    }, () => { console.log(this.state)});
  }


  // componentDidUpdate(prevProps, prevState){
  //   console.log(this.state)
  //   console.log('PREV STATE', prevState)
  //   if (this.state.loc !== '' && prevState.loc === '') {
  //     this.state.displayQuestion = false
  //   }
  // }

  render(){
    if ( this.state.Alameda_County || this.state.Peninsula || this.state.SF || this.state.Sonoma || this.state.SV || this.state.SJ || this.state.Other) {
      return <div></div>
    }
    return (
      <div> Where is your building?
         <br />
            <label>
              Alameda
              <input
                name="Alameda_County"
                type="radio"
                checked={this.state.Alameda_County}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Peninsula
              <input
                name="Peninsula"
                type="radio"
                value={this.state.Peninsula}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              San Francisco
              <input
                name="SF"
                type="radio"
                value={this.state.SF}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Sonoma
              <input
                name="Sonoma"
                type="radio"
                value={this.state.Sonoma}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Silicon Valley
              <input
                name="SV"
                type="radio"
                value={this.state.SV}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              San Jose
              <input
                name="SJ"
                type="radio"
                value={this.state.SJ}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Other PGE Territory
              <input
                name="Other"
                type="radio"
                value={this.state.Other}
                onChange={this.handleInputChange} />
            </label>
            <br />
        

      </div>
    );
  }
}

//   render(){ 
//     console.log(this.state)
//     return (
//       this.state.loc === '' && <div>
//         Where is the property located?
//             <form>
//                 <select onChange={this.handleChange}>
//                   <option value="Alameda_County">Alameda County</option>
//                   <option value="Peninsula">Peninsula</option>
//                   <option value="SF">San Francisco</option>
//                   <option value="Sonoma">Sonoma</option>
//                   <option value="SV">Silicon Valley</option>
//                   <option value="SJ">San Jose</option>
//                   <option value="Other">Other PG&E Territory</option>
//                 </select>
                
//             </form>
//       </div>


//     );
//   }
// }


