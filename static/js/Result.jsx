class Result extends React.Component {
    constructor(){
        super();
    }
    render(){
        return (
          <div>
            <p>These are your results! </p>
          </div>
    );
  }
}


ReactDOM.render(<Result />, document.getElementById("result"));