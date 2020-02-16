
class Thing extends React.Component {
    render() {
        return (
            <div> im a thing </div> 
        )
    }
}

class Result extends React.Component {
    constructor() {
        this.state = {
            buildingType: '',

        }
    }

    render() {
    return(
        if 
        <div> 
            <Thing/>
        </div>
    );
    }
}


ReactDOM.render(<Result />, document.getElementById('container'));