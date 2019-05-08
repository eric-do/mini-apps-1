/*
COMPONENT LIST
App
Homepage
Registration
Address
CreditCard
Confirmation
*/

const HOMEPAGE_VIEW = 0;
const REGISTRATION_VEW = 1;
const ADDRESS_VIEW = 2;
const CREDIT_VIEW = 3;
const CONFIRMATION_VIEW = 4;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasPurchased: false,
      currentView: HOMEPAGE_VIEW
    }
  }

  nextViewHandler(e) {
    e.preventDefault();
    var currentView = this.state.currentView;
    currentView++;
    this.setState({
      currentView: currentView
    });
  }

  render() {
    if (this.state.currentView === HOMEPAGE_VIEW) {
      return (<Homepage onClick={this.nextViewHandler.bind(this)}/>)
    }

    if (this.state.currentView === REGISTRATION_VEW) {
      return (<Registration />)
    }

    if (this.state.currentView === ADDRESS_VIEW) {
      return (<Address />)
    }
  
    if (this.state.currentView === CREDIT_VIEW) {
      return (<CreditCard />)
    }
  
    if (this.state.currentView === CONFIRMATION_VIEW) {
      return (<Confirmation />)
    }
  }
}

var Homepage = (props) => (
  <div id="homepage">
    <button onClick={props.onClick}>Checkout</button>
  </div>
)

var Registration = (props) => (
  <div>Registration</div>
)

var Address = (props) => (
  <div>Address</div>
)

var CreditCard = (props) => (
  <div>CreditCard</div>
)

var Confirmation = (props) => (
  <div>Confirmation</div>
)


ReactDOM.render(<App/>, document.getElementById(`app`));