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
    this.setView(currentView);
  }

  postData(data) {
    $.ajax({
      url: 'localhost:3000',
      method: 'POST', 
      data: JSON.stringify(data)
    });
  }

  resetView(e) {
    e.preventDefault();
    var currentView = 0;
    this.setView(currentView);
  }

  setView(currentView) {
    this.setState({
      currentView: currentView
    });
  }

  render() {
    if (this.state.currentView === HOMEPAGE_VIEW) {
      return (<Homepage onClick={this.nextViewHandler.bind(this)} />)
    }

    if (this.state.currentView === REGISTRATION_VEW) {
      return (<Registration onClick={this.nextViewHandler.bind(this)} />)
    }

    if (this.state.currentView === ADDRESS_VIEW) {
      return (<Address onClick={this.nextViewHandler.bind(this)} />)
    }
  
    if (this.state.currentView === CREDIT_VIEW) {
      return (<CreditCard onClick={this.nextViewHandler.bind(this)} />)
    }
  
    if (this.state.currentView === CONFIRMATION_VIEW) {
      return (<Confirmation onClick={this.resetView.bind(this)}/>)
    }
  }
}

var Homepage = (props) => (
  <div id="homepage">
    <h1>Homepage</h1>
    <button onClick={props.onClick}>Checkout</button>
  </div>
)

var Registration = (props) => (
  <div id="registration">
    <h1>Registration</h1>
    <input id="name" type="text" placeholder="Name"></input>
    <input id="email" type="text" placeholder="Email"></input>
    <input id="password" type="text" placeholder="Password"></input>
    <button onClick={(e) => props.onClick(e)}>Next</button>
  </div>
)

var Address = (props) => (
  <div id="address">
    <h1>Address</h1>
    <input id="line1" type="text" placeholder="Line 1"></input>
    <input id="line2" type="text" placeholder="Line 2"></input>
    <input id="city" type="text" placeholder="City"></input>
    <input id="state" type="text" placeholder="State"></input>
    <input id="zip" type="text" placeholder="Zip Code"></input>
    <input id="phone" type="text" placeholder="Phone number, e.g. (555)555-5555"></input>
    <button onClick={(e) => props.onClick(e)}>Next</button>
  </div>
)

var CreditCard = (props) => (
  <div id="address">
    <h1>Credit Card</h1>
    <input id="creditcard" type="text" placeholder="Credit card number"></input>
    <input id="expiration" type="text" placeholder="Expiration date"></input>
    <input id="cvv" type="text" placeholder="CVV"></input>
    <input id="billing-zip" type="text" placeholder="Billing zip code"></input>
    <button onClick={(e) => props.onClick(e)}>Next</button>
  </div>
)

var Confirmation = (props) => (
  <div id="confirmation">
    <h1>Confirmation</h1>
    <button onClick={(e) => props.onClick(e)}>Purchase</button>
  </div>
)


ReactDOM.render(<App/>, document.getElementById(`app`));