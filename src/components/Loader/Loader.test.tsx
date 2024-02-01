import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoaderComponent from './Loader';

describe('Loader Component', () => {
    it('TC1. Renders the loader with correct loading message', () => {

        render(<LoaderComponent/>);
        expect(screen.getByRole('status')).toBeInTheDocument();
        expect(screen.getByTestId('mocked-loader-component')).toBeInTheDocument();
    });
});