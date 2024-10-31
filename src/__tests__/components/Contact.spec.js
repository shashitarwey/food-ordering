import { render, screen } from '@testing-library/react';
import ContactUs from '../../components/ContactUs';
import '@testing-library/jest-dom';


describe("Contact Us Page test cases", () => {
  it('Should load contact us component', () => {
    render(<ContactUs />);
  
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
  });
  
  it('Should load button inside contact component', () => {
    render(<ContactUs />);
  
    // const button = screen.getByRole("button");
             // OR
    const button = screen.getByText("Submit")
    expect(button).toBeInTheDocument();
  });
  
  it('Should load input name field inside contact component', () => {
    render(<ContactUs />);
    const inputName = screen.getByPlaceholderText("name");
    expect(inputName).toBeInTheDocument();
  });
  
  
  it('Should load 2 input boxes on the contact component', () => {
    render(<ContactUs />);
    // Querying
    const inputBoxes = screen.getAllByRole('textbox');
    expect(inputBoxes.length).toBe(2);
  });
})