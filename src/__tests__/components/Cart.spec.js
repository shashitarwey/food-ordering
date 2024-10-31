import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import RestaurantMenu from '../../components/RestaurantMenu';
import Header from '../../components/Header';
import Cart from '../../components/Cart';
import MOCK_DATA from '../mocks/mockResMenu.json';
import { Provider } from 'react-redux';
import appStore from '../../utils/appStore';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';


// Break The Tes case in smaller test cases
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: jest.fn(() => {
      return Promise.resolve(MOCK_DATA);
    }),
  });
});
describe('Cart Component Test Case', () => {
  it('Should load Menu Restaurant Component', async () => {
    await act(() => {
      render(
        <BrowserRouter>
          <Provider store={appStore}>
            <Header></Header>
            <RestaurantMenu></RestaurantMenu>
            <Cart></Cart>
          </Provider>
        </BrowserRouter>
      );
    });

    const accorDianHeader = screen.getByText('Whopper (5)');
    fireEvent.click(accorDianHeader);
    const foodItems = screen.getAllByTestId('foodItems');
    expect(foodItems.length).toBe(5);

    const addBtns = screen.getAllByRole('button', { name: 'Add+' });

    // No Items in Cart
    const cartWithZeroItem = screen.getByText('Cart (0 items)');
    expect(cartWithZeroItem).toBeInTheDocument();
    fireEvent.click(addBtns[0]);

    // Adding 1 Item in cart
    const cartItem = screen.getByText('Cart (1 items)');
    expect(cartItem).toBeInTheDocument();

    // Adding one more Item in Cart
    fireEvent.click(addBtns[1]);
    const cartItems = screen.getByText('Cart (2 items)');
    expect(cartItem).toBeInTheDocument();

    const ItemsInCart = screen.getAllByTestId('foodItems');
    expect(ItemsInCart.length).toBe(7);

    fireEvent.click(screen.getByRole('button', { name: 'Clear Cart' }));
    expect(screen.getAllByTestId('foodItems').length).toBe(5);
    expect(
      screen.getByText('Cart is empty: Add items to the cart')
    ).toBeInTheDocument();
  });
});
