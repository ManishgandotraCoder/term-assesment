import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  it('TC1. renders the Restraunt component', () => {
    render(<App />);
    expect(screen.getByTestId('restaurant-component')).toBeInTheDocument();
  });
});