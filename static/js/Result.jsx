class Result extends React.Component {
    constructor(){
        super();
    }


    getInfo(response) {
      console.log(response)
      const results = response.results;
      this.setState({ results: results });
    }

    getCardData() {
      $.get('/results-js', this.getInfo);
    }

    render(){
        return (
          <div>
            <p>These are your results! </p>
            <p>{this.getInfo}</p>
          </div>
      );
    }
}


