import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import appStore from '../../utils/appStore';
import Header from '../../components/Header';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import useOnlineStatus from '../../utils/useOnlineStatus';

jest.mock('../../utils/useOnlineStatus', () => jest.fn());
describe('Header Component Test cases', () => {
  it('Should render Header Component with a login button', () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    // const loginButton = screen.getByText('Login');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).toBeInTheDocument();
  });

  it('Should toggle button text between Login and Logout on click', () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    // Check the initial button text is 'Login'
    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();

    // Simulate clicking the login button to toggle it to 'Logout'
    fireEvent.click(loginButton);
    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    expect(logoutButton).toBeInTheDocument();

    // Simulate clicking the logout button to toggle it back to 'Login'
    fireEvent.click(loginButton);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('Should render Header Component with cart', () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const cart = screen.getByText(/Cart/);
    expect(cart).toBeInTheDocument();
  });

  it('Should render Header Component with 0 cart items', () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const cartItems = screen.getByText('Cart (0 items)');
    expect(cartItems).toBeInTheDocument();
  });

  it('Should display online status as 🟢 when online', () => {
    // Mock the online status as true
    useOnlineStatus.mockReturnValue(true);

    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    // Verify the online status is displayed as 🟢
    const onlineStatus = screen.getByText('Online Status: 🟢');
    expect(onlineStatus).toBeInTheDocument();
  });

  it('Should display online status as 🔴 when offline', () => {
    // Mock the online status as false
    useOnlineStatus.mockReturnValue(false);

    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    // Verify the online status is displayed as 🔴
    const onlineStatus = screen.getByText('Online Status: 🔴');
    expect(onlineStatus).toBeInTheDocument();
  });
});
