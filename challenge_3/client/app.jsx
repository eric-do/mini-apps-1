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
      currentView: HOMEPAGE_VIEW,
      user: {}
    }
  }

  nextViewHandler(e) {
    if (e) { e.preventDefault(); }
    //e.preventDefault();
    //this.postData();
    var currentView = this.state.currentView;
    currentView++;
    this.setView(currentView);
  }

  postData() {
    $.ajax({
      url: 'http://localhost:3000',
      method: 'POST', 
      data: {user : this.state.user},
      success: (data) => { 
        console.log('Success! Received: ' + data);
        var user = Object.assign(this.state.user);
        user['id'] = data;
        this.setState({
          user: user
        });
      },
      error: () => console.log('error')
    });
  }

  nextViewandPost(e) {
    this.nextViewHandler(e);
    this.postData();
  }

  nextViewAndGet(e) {
    e.preventDefault();
    $.ajax({
      url: 'http://localhost:3000/confirmation',
      method: 'POST',
      data: { user: this.state.user },
      success: (data) => {
        console.log('Success! ' + data);
        this.nextViewHandler();
      },
      error: () => console.log('error')
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(e) {
    e.preventDefault();
    var name = e.target.id;
    var value = e.target.value;
    var user = Object.assign(this.state.user);
    user[name] = value;
    this.setState({
      user: user
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
      return (<Homepage onClick={this.nextViewandPost.bind(this)} />)
    }

    if (this.state.currentView === REGISTRATION_VEW) {
      return (<Registration onClick={this.nextViewandPost.bind(this)} onChange={this.handleChange.bind(this)}/>)
    }

    if (this.state.currentView === ADDRESS_VIEW) {
      return (<Address onClick={this.nextViewandPost.bind(this)} onChange={this.handleChange.bind(this)}/>)
    }
  
    if (this.state.currentView === CREDIT_VIEW) {
      return (<CreditCard onClick={this.nextViewAndGet.bind(this)} onChange={this.handleChange.bind(this)}/>)
    }
  
    if (this.state.currentView === CONFIRMATION_VIEW) {
      return (<Confirmation user={this.state.user} onClick={this.resetView.bind(this)} onChange={this.handleChange.bind(this)}/>)
    }
  }
}

var Homepage = (props) => (
  <div id="homepage">
    <h1>Homepage</h1>
    <button onClick={props.onClick}>Checkout</button>
  </div>
)

var Registration = (props) => {
  return (
  <div id="registration">
    <h1>Registration</h1>
    <form onSubmit={props.handleSubmit}>
      <input id="username" type="text" placeholder="Name" onChange={(e) => props.onChange(e)}></input>
      <input id="email" type="text" placeholder="Email" onChange={(e) => props.onChange(e)}></input>
      <input id="password" type="text" placeholder="Password" onChange={(e) => props.onChange(e)}></input>
      <button onClick={(e) => props.onClick(e)}>Next</button>
    </form>
  </div>);
}

var Address = (props) => (
  <div id="address">
    <h1>Address</h1>
    <input id="address1" type="text" placeholder="Line 1" onChange={(e) => props.onChange(e)}></input>
    <input id="address2" type="text" placeholder="Line 2" onChange={(e) => props.onChange(e)}></input>
    <input id="city" type="text" placeholder="City" onChange={(e) => props.onChange(e)}></input>
    <input id="state" type="text" placeholder="State" onChange={(e) => props.onChange(e)}></input>
    <input id="zip" type="text" placeholder="Zip Code" onChange={(e) => props.onChange(e)}></input>
    <input id="phone" type="text" placeholder="Phone number, e.g. (555)555-5555" onChange={(e) => props.onChange(e)}></input>
    <button onClick={(e) => props.onClick(e)}>Next</button>
  </div>
)

var CreditCard = (props) => (
  <div id="address">
    <h1>Credit Card</h1>
    <input id="creditcard" type="text" placeholder="Credit card number" onChange={(e) => props.onChange(e)}></input>
    <input id="expiration" type="date" placeholder="Expiration date" onChange={(e) => props.onChange(e)}></input>
    <input id="cvv" type="text" placeholder="CVV" onChange={(e) => props.onChange(e)}></input>
    <input id="billing_zip" type="text" placeholder="Billing zip code" onChange={(e) => props.onChange(e)}></input>
    <button onClick={(e) => props.onClick(e)}>Next</button>
  </div>
)

var Confirmation = (props) => (
  <div id="confirmation">
    <h1>Confirmation</h1>
    {
      Object.keys(props.user).map(key => (
        <div>{key} : {props.user[key]}</div>
      ))
    }
    <button onClick={(e) => props.onClick(e)}>Purchase</button>
  </div>
)


ReactDOM.render(<App/>, document.getElementById(`app`));