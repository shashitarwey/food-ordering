import { render, screen, fireEvent } from '@testing-library/react';
import RestaurantCard, { withPromotedLable } from '../../components/RestaurantCard';
import '@testing-library/jest-dom';
import MOCK_DATA from '../mocks/resData.json';

describe('Restaurent Card Component Test cases', () => {
  const PromotedRestaurentCard = withPromotedLable(RestaurantCard);
  it('should render Restaurent component with props data', () => {
    render(<RestaurantCard resData={MOCK_DATA}></RestaurantCard>);

    const resName = screen.getByText('Olio - The Wood Fired Pizzeria');

    expect(resName).toBeInTheDocument();
  });

  it('should render Restaurent component with promoted label if isOpen is true in data', () => {
    render(<PromotedRestaurentCard resData={MOCK_DATA}></PromotedRestaurentCard>);

    const openLabel = screen.getByText('Open')

    expect(openLabel).toBeInTheDocument();
    expect(openLabel).toHaveClass('bg-black');
  });

  it('Should display "Close" label when the restaurant is closed', () => {
    const CLOSE_MOCK_DATA = {...MOCK_DATA, isOpen: false}
    render(<PromotedRestaurentCard resData={CLOSE_MOCK_DATA} />);

    // Check if the "Close" label is rendered
    const closeLabel = screen.getByText('Close');
    expect(closeLabel).toBeInTheDocument();
    expect(closeLabel).toHaveClass('bg-red-400'); // Ensure it has the correct styling
  });
});
