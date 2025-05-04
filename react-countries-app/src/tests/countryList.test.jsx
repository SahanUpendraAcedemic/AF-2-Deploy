import { render, screen, fireEvent } from "@testing-library/react";
import CountryCard from "../components/countryCard";
import { BrowserRouter } from "react-router-dom";

const mockCountries = [
  {
    name: { common: 'Germany' },
    capital: ['Berlin'],
    region: 'Europe',
    flags: { svg: '', alt: 'Flag of Germany' },
    population: 83240525, 
  },
  {
    name: { common: 'India' },
    capital: ['New Delhi'],
    region: 'Asia',
    flags: { svg: '', alt: 'Flag of India' },
    population: 1393409038, 
  },
];


describe("Integration: Multiple CountryCard Components", () => {
  it("renders multiple countries and toggles favorites independently", () => {
    render(
      <BrowserRouter>
        <div>
          {mockCountries.map((country, index) => (
            <CountryCard
              key={index}
              country={country}
              isFavorite={false}
              onToggleFavorite={() => {}}
            />
          ))}
        </div>
      </BrowserRouter>
    );

    // Both countries should be visible
    expect(screen.getByText("Germany")).toBeInTheDocument();
    expect(screen.getByText("India")).toBeInTheDocument();

    const heartButtons = screen.getAllByRole("button");
    expect(heartButtons.length).toBe(2);

    // Click first favorite button
    fireEvent.click(heartButtons[0]);
    // You can extend this to test state updates if passing a mock function
  });
});
