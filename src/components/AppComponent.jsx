import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useEffect, useState } from 'react';
import UserContext from '../utils/UserContext';
import { Provider } from 'react-redux';
import appStore from '../utils/appStore';

const AppComponent = () => {
  const [userName, setUserName] = useState('');

  // Authentication
  useEffect(() => {
    // make api call and send username and password
    const data = {
      name: 'Shashikant Kumar',
    };
    setUserName(data.name);
  }, []);
  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
          {/**
           * Here Header Component is intact.
           */}

          {/* In this case over riden value is available only in header component */}

          {/* <UserContext.Provider value={{ loggedInUser: 'Elon Musk' }}> */}
          <Header />
          {/* </UserContext.Provider> */}

          {/**
           *  Outlet will replace the component according to the path we defined in children route
           */}
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

export default AppComponent;
