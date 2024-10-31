import { render, screen, fireEvent } from '@testing-library/react';
import Body from '../../components/Body';
import MOCK_DATA from '../mocks/mockResListData.json';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react';
import '@testing-library/jest-dom';
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

describe('Search Functionality Test case', () => {
  it('Should render the body component with burger text search input', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Body />
        </BrowserRouter>
      );
    });

    const cardsBeforeSearch = screen.getAllByTestId('resCard');
    expect(cardsBeforeSearch.length).toBe(20);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    const searchInput = screen.getByTestId('searchInput');
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    fireEvent.change(searchInput, {
      target: {
        value: 'Pizza',
      },
    });
    fireEvent.click(searchButton);

    // Screen should load number of cards having name burger in it
    const cardsAfterSearch = screen.getAllByTestId('resCard');
    expect(cardsAfterSearch).toHaveLength(3);
  });
});


describe('Top Rated Filter Functionality Test case', () => {
    it('Should filter the top rated Restaurent', async () => {
      await act(async () => {
        render(
          <BrowserRouter>
            <Body />
          </BrowserRouter>
        );
      });
  
      const cardsBeforeFilter = screen.getAllByTestId('resCard');
      expect(cardsBeforeFilter.length).toBe(20);
      const topRatedButton = screen.getByRole('button', { name: 'Top Rated Restaurant' });
      expect(topRatedButton).toBeInTheDocument();
      fireEvent.click(topRatedButton);
  
      // Screen should load number of cards after filtering
      const cardsAfterFilter = screen.getAllByTestId('resCard');
      expect(cardsAfterFilter).toHaveLength(17);
    });
  });