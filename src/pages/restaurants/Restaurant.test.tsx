import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RestaurantComponent from './RestaurantsHelper'; // Adjust the path accordingly


jest.mock('components/GridItem/GridItem', () => ({
    __esModule: true,
    default: jest.fn(() => <div data-testid="mocked-item-component" />),
}));


describe('RestaurantComponent', () => {
  it('should update state when changing filters', () => {
    const { getByTestId } = render(<RestaurantComponent />);
    
    // Assuming there are input fields for count, sort, and search
    const countInput = getByTestId('count-input');
    const sortInput = getByTestId('sort-input');
    const searchInput = getByTestId('search-input');

    fireEvent.change(countInput, { target: { value: '10' } });
    fireEvent.change(sortInput, { target: { value: 'rating' } });
    fireEvent.change(searchInput, { target: { value: 'example' } });

    let data = getByTestId('mocked-item-component')
    console.log(data);
    
    // Add assertions to check if state is updated accordingly
    // You can use getByTestId and check the value attribute of the inputs or any other relevant state update
  });

//   it('should trigger getCount callback when getCount is called', () => {
//     const { getByTestId } = render(<RestaurantComponent />);
    
//     const count = 5;

//     // Assuming there is a button or event that triggers getCount
//     const getCountButton = getByTestId('get-count-button');
//     fireEvent.click(getCountButton);

//     // Add assertions to check if getCount callback is triggered with the correct count value
//   });

//   it('should pass updated fields to passFields callback', async () => {
//     const { getByTestId } = render(<RestaurantComponent />);
    
//     // Assuming there are input fields for count, sort, and search
//     const countInput = getByTestId('count-input');
//     const sortInput = getByTestId('sort-input');
//     const searchInput = getByTestId('search-input');

//     fireEvent.change(countInput, { target: { value: '15' } });
//     fireEvent.change(sortInput, { target: { value: 'price' } });
//     fireEvent.change(searchInput, { target: { value: 'pizza' } });

//     // Assuming there is a button or event that triggers passFields
//     const passFieldsButton = getByTestId('search-input');
//     fireEvent.change(passFieldsButton);

//     // Wait for the asynchronous state update
//     await waitFor(() => {
//         expect(passFieldsButton).toHaveBeenCalledWith({
//             count: '15',
//             sort: 'price',
//             search: 'pizza',
//           });
//     });
//   });
});