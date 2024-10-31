import React from 'react';
class UserClass extends React.Component {
  constructor(props) {
    super(props);

    // Defining State variables
    this.state = {
      count: 0,
      count2: 2,
      userInfo: {
        name: 'User',
        location: 'Default',
        company: 'Default',
      },
    };
    console.log(this.props.name + ' Child Constructor');
  }

  async componentDidMount() {
    // This will keep calling if we don't unmount it.
    this.timer = setInterval(() => {
        console.log('Set Interval called')
    }, 1000)
    // console.log(this.props.name + ' Child ComponentDid mount');
    // const data = await fetch('https://api.github.com/users/shashitarwey');
    // const json = await data.json();
    // this.setState({ userInfo: json });
    // API calls
  }

  componentDidUpdate(prevProps, prevState) {
    // this is the case when dependency array is non-empty in useEffect
    if (this.state.count === prevState.count)
      console.log(this.props.name + ' Component Did Update');
    if(this.state.count2 === prevStatevState.count2) {
        console.log(this.props.name + ' Component Did Update');
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    console.log(this.props.name + ' Component will Unmount');
  }

  render() {
    // const { location, name } = this.props;
    console.log(this.props.name + ' Child Rendered');
    const { name, location, company } = this.state.userInfo;
    return (
      <div className="user-card">
        <h1>Count: {this.state.count}</h1>
        <h1>Count2: {this.state.count2}</h1>
        <button
          onClick={() => {
            // NEVER UPDATE STATE VARIABLES DIRECTLY LIKE BELOW
            // this.state.count = this.state.count + 1
            this.setState({
              count: this.state.count + 1,
              count2: this.state.count2 + 1,
            });
          }}
        >
          Count Increase
        </button>
        <h2>Name: {name || 'User'}</h2>
        <h3>Location: {location || 'Default'}</h3>
        <h4>Company: {company || 'XYZ'}</h4>
        <h4>Contact: 9876543210</h4>
      </div>
    );
  }
}

export default UserClass;

/**
 * <------------------ Mounting Lifecycle ------------------->
 * Constructor(dummy)
 * Render (dummy)
 *      <HTML Dummy Data>
 * Component Did Mount
 *      <API calls>
 *      <this.setState>
 *
 * <--------- Update ---------->
 *
 *      render (api data)
 *      <HTML with API Data>
 *      Component Did Update
 *
 */
