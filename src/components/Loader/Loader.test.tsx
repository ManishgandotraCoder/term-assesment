import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoaderComponent from './Loader';

describe('LoaderComponent', () => {
    it('renders the loader with correct loading message', () => {
        const mockLoaderProps = {
            page: 2,
            count: 10,
        };
        render(<LoaderComponent {...mockLoaderProps} />);
        expect(screen.getByRole('status')).toBeInTheDocument();
        expect(screen.getByTestId('mocked-loader-component')).toBeInTheDocument();
    });
});