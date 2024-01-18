import React from 'react';
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GridLayout from './GridLayout';

const mockRecords = {
    data: [
        {
            id: '1',
            cellValues: {
                restaurant: 'Restaurant 1',
                avg_ratings: '3',
                food_type: 'Cuisine 1',
                total_ratings: '100',
                delivery_time: '30',
                price: '20',
                address: 'Address 1',
                area: 'Area 1',
                city: 'City 1',
            },
        },
        {
            id: '2',
            cellValues: {
                restaurant: 'ARestaurant',
                avg_ratings: '4',
                food_type: 'Cuisine 1',
                total_ratings: '100',
                delivery_time: '30',
                price: '20',
                address: 'Address 1',
                area: 'Area 1',
                city: 'City 1',
            },
        }
    ],
};

const mockSendCount = jest.fn();

jest.mock('components/GridItem/GridItem', () => ({
    __esModule: true,
    default: jest.fn(() => <div data-testid="mocked-item-component" />),
}));

jest.mock('components/Loader/Loader', () => ({
    __esModule: true,
    default: jest.fn(() => <div data-testid="mocked-loader" />),
}));

describe('GridLayout Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(
            <GridLayout
                records={mockRecords}
                count={10}
                sort="avg_ratings"
                sendCount={mockSendCount}
                search=""
                counter={0}
            />
        );

        expect(screen.getByTestId('mocked-item-component')).toBeInTheDocument();
    });

    it('renders ItemComponent for each item', () => {
        render(
            <GridLayout
                records={mockRecords}
                count={10}
                sort="avg_ratings"
                sendCount={mockSendCount}
                search=""
                counter={0}
            />
        );
        const mockedItemComponents = screen.getAllByTestId('mocked-item-component');
        
        expect(mockedItemComponents).toHaveLength(1);
    });

    it('renders LoaderComponent when loading', () => {
        render(
            <GridLayout
                records={mockRecords}
                count={10}
                sort="avg_ratings"
                sendCount={mockSendCount}
                search=""
                counter={0}
            />
        );

        expect(screen.getByTestId('mocked-item-component')).toBeInTheDocument();
    });

    it('triggers fetchData on page scroll', async () => {
        render(
            <GridLayout
                records={mockRecords}
                count={10}
                sort="avg_ratings"
                sendCount={mockSendCount}
                search=""
                counter={0}
            />
        );

        act(() => {
            window.scrollY = 1000; // Your scroll threshold
            window.dispatchEvent(new Event('scroll'));
        });

        await waitFor(() => {
            expect(mockSendCount).toHaveBeenCalledTimes(2);
        });
        // Add more assertions as needed
    });

    it('should filter data based on search term', () => {
        const search = 'ARestaurant';
        const filteredData = filterData(mockRecords, search);
        expect(filteredData.length).toEqual(1);
    });

    it('should sort data based on the provided sorting parameter', () => {
        const sort = 'avg_ratings';
        const sortedData = sortArray(mockRecords, sort);

        expect(sortedData[0]?.cellValues.avg_ratings).toBe(mockRecords.data[0].cellValues.avg_ratings)
        expect(mockRecords.data.length).toEqual(sortedData.length);
    });

    it('should fetch data and update state', async () => {
        const { getByTestId } = render(
            <GridLayout
                records={mockRecords}
                count={10}
                sort="avg_ratings"
                sendCount={mockSendCount}
                search=""
                counter={0}
            />
        );

        fireEvent.scroll(window, { target: { scrollY: 1000 } });

        // Wait for the asynchronous fetchData operation to complete
        await waitFor(() => {
            expect(mockSendCount).toHaveBeenCalled();
            // Add more assertions as needed
        });
    });
});

// Helper functions for testing
function filterData(records: any, search: any) {
    return records.data.filter((item: any) =>
        item.cellValues.restaurant.toLowerCase().includes(search.toLowerCase())
    );
}

function sortArray(records: any, sort: any) {
    return records.data.sort((a: any, b: any) => {
        let fa = +a.cellValues[sort];
        let fb = +b.cellValues[sort];
        if (sort === 'restaurant') {
            fa = a.cellValues[sort].toLowerCase().trim();
            fb = b.cellValues[sort].toLowerCase().trim();
        }
        if (sort === 'avg_ratings') {
            return fa > fb ? -1 : fa < fb ? 1 : 0;
        } else {
            return fa < fb ? -1 : fa > fb ? 1 : 0;
        }
    });
}
