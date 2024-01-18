import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';

const mockData = {
  restaurant: 'Test Restaurant',
  avg_ratings: '4.5',
  food_type: 'Italian',
  total_ratings: '100',
  delivery_time: '30 minutes',
  price: '$$',
  address: '123 Main St',
  area: 'Downtown',
  city: 'Cityville',
};

describe('Modal', () => {
  it('renders the modal when show is true', () => {
    const mockModalProps = {
      show: true,
      showModalCallback: jest.fn(),
      data: mockData,
    };

    render(<Modal {...mockModalProps} />);

    // Check if modal content is rendered
    expect(screen.getByTestId('modal-container')).toBeInTheDocument();

    // Check if modal header is rendered with correct text
    expect(screen.getByText(mockData.restaurant)).toBeInTheDocument();
    expect(screen.getByText(`${mockData.avg_ratings} ☆`)).toBeInTheDocument();
    expect(screen.getByText(`${mockData.total_ratings} reviews`)).toBeInTheDocument();

    // Check if modal body is rendered with correct information
    expect(screen.getByText(`Price : ${mockData.price}₹`)).toBeInTheDocument();
    expect(screen.getByText(`Food Type : ${mockData.food_type}`)).toBeInTheDocument();
    expect(screen.getByText(`Delivery time : ${mockData.delivery_time} minutes`)).toBeInTheDocument();
    expect(screen.getByText(`Address : ${mockData.address} , ${mockData.area} , ${mockData.city}`)).toBeInTheDocument();

    // Check if Close button is rendered
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('calls showModalCallback with false when Close button is clicked', () => {
    const mockModalProps = {
      show: true,
      showModalCallback: jest.fn(),
      data: mockData,
    };

    render(<Modal {...mockModalProps} />);

    // Click the Close button
    fireEvent.click(screen.getByText('Close'));

    // Check if showModalCallback is called with false
    expect(mockModalProps.showModalCallback).toHaveBeenCalledWith(false);
  });

  it('does not render the modal when show is false', () => {
    const mockModalProps = {
      show: false,
      showModalCallback: jest.fn(),
      data: mockData,
    };

    render(<Modal {...mockModalProps} />);

    // Check if modal content is not rendered
    expect(screen.queryByTestId('modal-container')).not.toBeInTheDocument();
  });
});