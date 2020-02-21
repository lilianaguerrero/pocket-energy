class Loc extends React.Component {
  constructor(){
        super();
  }

  render(){
    return (
      <div>
        Where is the property located?
            <form>
                <select className="container">
                  <option value="Alameda_County">Alameda County</option>
                  <option value="Peninsula">Peninsula</option>
                  <option value="SF">San Francisco</option>
                  <option value="Sonoma">Sonoma</option>
                  <option value="SV">Silicon Valley</option>
                  <option value="SJ">San Jose</option>
                  <option value="Other">Other PG&E Territory</option>
                </select>
            </form>
      </div>

    );
  }
}


