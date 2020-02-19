
import Header from "./Header"
import HomePage from "./Homepage"
import Result from "./Result"

class App extends React.Component {
    constructor() {
            <div>
                <Header />
                <HomePage />
                <Result />
            </div>
    }
}


ReactDOM.render(<App />, document.getElementById('container'));