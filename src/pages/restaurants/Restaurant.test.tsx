import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import RestaurantComponentContainer from './RestaurantsContainer';
import RestaurantComponent from './RestaurantsHelper';
// Mocking the callback functions
const passFieldsMock = jest.fn();
const getCountMock = jest.fn();

describe('RestaurantComponentContainer', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('renders the component with initial state', () => {
        render(<RestaurantComponent />);

        // Assuming the initial state values are reflected in your RestaurantComponentContainer
        expect(screen.getByTestId('restaurant-component')).toBeInTheDocument();
        expect(screen.getByTestId('search-input')).toHaveValue('');
        expect(screen.getByTestId('count-input')).toHaveValue("50");
        expect(screen.getByTestId('sort-input')).toHaveValue('');
    });
    it('renders the component with initial props', () => {
        render(
            <RestaurantComponentContainer
                search=""
                count={50}
                sort="restaurant"
                passFields={passFieldsMock}
                getCount={getCountMock}
                counter={10}
            />
        );

        expect(screen.getByTestId('restaurant-component')).toBeInTheDocument();
        expect(screen.getByTestId('search-input')).toHaveValue('');
        expect(screen.getByTestId('count-input')).toHaveValue('50');
        expect(screen.getByTestId('sort-input')).toHaveValue('restaurant');
        expect(screen.getByText(/Showing 1 to 10 records/)).toBeInTheDocument();
    });

    it('updates search input value and triggers passFields callback', async () => {
        render(
            <RestaurantComponentContainer
                search=""
                count={50}
                sort="restaurant"
                passFields={passFieldsMock}
                getCount={getCountMock}
                counter={10}
            />
        );

        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'pizza' } });

        await waitFor(() => {
            expect(searchInput).toHaveValue('pizza');
            expect(passFieldsMock).toHaveBeenCalledWith('search', 'pizza');
        });
    });

    it('updates count input value and triggers passFields and getCount callbacks', async () => {
        render(
            <RestaurantComponentContainer
                search=""
                count={50}
                sort="restaurant"
                passFields={passFieldsMock}
                getCount={getCountMock}
                counter={10}
            />
        );

        const countInput = screen.getByTestId('count-input');
        fireEvent.change(countInput, { target: { value: 100 } });

        await waitFor(() => {
            expect(countInput).toHaveValue(100);
            expect(passFieldsMock).toHaveBeenCalledWith('count', '100');
            expect(getCountMock).toHaveBeenCalledWith(100);
        });
    });

    it('updates sort input value and triggers passFields callback', async () => {
        render(
            <RestaurantComponentContainer
                search=""
                count={50}
                sort="restaurant"
                passFields={passFieldsMock}
                getCount={getCountMock}
                counter={10}
            />
        );

        const sortInput = screen.getByTestId('sort-input');
        fireEvent.change(sortInput, { target: { value: 'price' } });

        await waitFor(() => {
            expect(sortInput).toHaveValue('price');
            expect(passFieldsMock).toHaveBeenCalledWith('sort', 'price');
        });
    });
   

    it('updates search input value and triggers passFields callback', async () => {
        render(<RestaurantComponent />);

        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'pizza' } });

        await waitFor(() => {
            expect(searchInput).toHaveValue('pizza');
        });
    });

    it('updates count input value and triggers passFields and getCount callbacks', async () => {
        render(<RestaurantComponent />);

        const countInput = screen.getByTestId('count-input');
        fireEvent.change(countInput, { target: { value: "100" } });

        await waitFor(() => {
            expect(countInput).toHaveValue("100");
        });
    });

    it('updates sort input value and triggers passFields callback', async () => {
        render(<RestaurantComponent />);

        const sortInput = screen.getByTestId('sort-input');
        fireEvent.change(sortInput, { target: { value: 'price' } });

        await waitFor(() => {
            expect(sortInput).toHaveValue('price');
        });
    });
});
