class Building extends React.Component {
  constructor(){
        super();
  }

  render(){
    return (
      <div>
        What best describes your building? 
            <form>
              <select name="building_type">
                    <option value="renter">Renter</option>
                    <option value="homeowner">Homeowner</option>
                    <option value="commercial_property">Commercial Property</option>
              </select>
            </form>
      </div>
    );
  }
}


