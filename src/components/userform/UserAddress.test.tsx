import { render } from "@testing-library/react";
import UserAddress from "./UserAddress";
// import test utils from the package
import createWrapper from "@cloudscape-design/components/test-utils/dom";


describe("UserAddress component", () => {
  const mockDispatch = jest.fn();

  const address = {
    street: {
      line1: "123 Main St",
      line2: "Apt 456",
    },
    city: "Example City",
    state: "CA",
  };

  const props = {
    address: address,
    dispatch: mockDispatch,
  };

  function renderComponent(jsx: React.ReactElement) {
    const { container } = render(jsx);
    return createWrapper(container);
  }

  test("renders UserAddress component", () => {
    const { getByText, getByLabelText } = render(
      <UserAddress address={address} dispatch={mockDispatch} />
    );

    expect(getByText("Street Line1")).toBeInTheDocument();
    expect(getByLabelText("Street Line1")).toHaveValue("123 Main St");
  });

  test("renders UserAddress component with default values", () => {
    const wrapper = renderComponent(<UserAddress {...props} />);

    expect(wrapper.findInput('[data-testid="street-line1-input"]')?.getInputValue()).toBe(
      "123 Main St"
    );
  });

  test('should update address values when form inputs change', () => {
  
  
    const wrapper = renderComponent(<UserAddress {...props} />);
  
    // Simulate changing street line1 input
    const streetLine1Input = wrapper.findInput('[data-testid="street-line1-input"]');
    streetLine1Input?.setInputValue('456 Elm St');
  
    // Simulate changing city input
    const cityInput = wrapper.findInput('[data-testid="city-input"]');
    cityInput?.setInputValue('New City');
  
    // Simulate changing state input
    const stateInput = wrapper.findInput('[data-testid="state-input"]');
    stateInput?.setInputValue('NY');
  
   

    // expect(streetLine1Input?.getInputValue()).toBe('456 Elm St');
    // expect(cityInput?.getInputValue()).toBe('New City');
    // expect(stateInput?.getInputValue()).toBe('NY');
    expect(mockDispatch).toHaveBeenCalledTimes(3); // 3 address values updated
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_ADDRESS',
      payload: {
        street: {
          line1: '456 Elm St',
          line2: 'Apt 456',
        },
        city: 'New City',
        state: 'NY',
      },
    })
    
 
    // Verify updated address values
    // expect(props.address.street.line1).toBe('456 Elm St');
    // expect(props.address.city).toBe('New City');
    // expect(props.address.state).toBe('NY');
  });
});
