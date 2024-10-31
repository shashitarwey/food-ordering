import User from './User';
import UserClass from './UserClass';
import { Component } from 'react';
import UserContext from '../utils/UserContext';

class AboutClass extends Component {
  constructor(props) {
    super(props);
    console.log('Parent Constructor');
  }

  componentDidMount() {
    console.log('Parent ComponentDid mount');
  }

  render() {
    console.log('Parent Rendered');
    return (
      <div>
        <h1>About Us</h1>
        <h2>This is about us page</h2>
        <div>
          LoggedIn User
          <UserContext.Consumer>
            {(data) => (<h1 className='font-bold'>{data.loggedInUser}</h1>)}
          </UserContext.Consumer>
        </div>
        {/* <User name="Shashikant (fucntion)"></User> */}
        <UserClass name={'First (class)'} location={'Giridih'}></UserClass>
        {/* <UserClass name={'Second (class)'} location={'Gurgaon'}></UserClass> */}
      </div>
    );
  }
}

export default AboutClass;

/**
 * - Parent Constructor
 * - Parent Rendered
 *   - First Constructor
 *   - First Rendered
 *   - Second Constructor
 *   - Second Rendered
 *
 *   < DOM UPDATED - In Batches >
 *   - First ComponentDid Mount
 *   - Second ComponentDid Mount
 * - Parent ComponentDid Mount
 *
 */
// const About = () => {
//     return (
//         <div>
//             <h1>About Us</h1>
//             <h2>This is about us page</h2>
//             {/* <User name="Shashikant (fucntion)"></User> */}
//             <UserClass name={"Shashikant (class)"} location={"Giridih"}></UserClass>
//         </div>
//     )
// }

// export default About;
