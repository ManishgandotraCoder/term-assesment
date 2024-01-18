import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  it('renders the App component', () => {
    render(<App />);

    // Check if RestaurantComponent is rendered
    expect(screen.getByTestId('restaurant-component')).toBeInTheDocument();
  });
});