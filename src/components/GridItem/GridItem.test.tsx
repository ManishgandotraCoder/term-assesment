import React from 'react';
import '@testing-library/jest-dom';
import ItemComponent from './GridItem';
import { render, fireEvent, waitFor, screen, queryByText } from '@testing-library/react';
import '@testing-library/jest-dom';
const mockData = {
  restaurant: 'Test Restaurant',
  avg_ratings: '4.5',
  food_type: 'Italian, Pizza',
  total_ratings: '100',
  delivery_time: '30 minutes',
  price: '$$',
  address: '123 Main St',
  area: 'Downtown',
  city: 'Cityville',
};

describe('Grid Item Component', () => {

  it('TC1. Renders the component with the provided data', () => {

    const { getByText } = render(<ItemComponent data={mockData} />);
    expect(getByText(mockData.restaurant)).toBeInTheDocument();
    expect(getByText(`${mockData.avg_ratings} ☆`)).toBeInTheDocument();
    expect(getByText(`${mockData.total_ratings} reviews`)).toBeInTheDocument();
    expect(getByText(`₹ ${mockData.price} for one ( Deliver in ${mockData.delivery_time} min )`)).toBeInTheDocument();
    expect(getByText(`Address : ${mockData.address} , ${mockData.area} , ${mockData.city}`)).toBeInTheDocument();
  });

  it('TC2. Open the modal when clicked', async () => {

    const { getByText, queryByTestId } = render(<ItemComponent data={mockData} />);
    await waitFor(() => expect(getByText(mockData.restaurant)).toBeInTheDocument());
    fireEvent.click(getByText(mockData.restaurant));
    expect(queryByTestId('modal-container')).toBeInTheDocument();
  });

  it('TC3. closes the modal when showModalCallback is called', async () => {

    render(<ItemComponent data={mockData} />);
    const restaurantElement = screen.getByText(mockData.restaurant);
    fireEvent.click(restaurantElement);
    const modalElement = screen.getByTestId('modal-container');
    expect(modalElement).toBeInTheDocument();
    await waitFor(() => {
      fireEvent.click(screen.getByText('Close'));
    });
    await waitFor(() => {
      expect(screen.queryByTestId('modal-container')).toBeNull();
    });
  });
});