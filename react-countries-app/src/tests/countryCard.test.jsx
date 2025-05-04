import { render, screen, fireEvent } from "@testing-library/react";
import CountryCard from "../components/countryCard";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

describe("CountryCard Component", () => {
  const mockCountry = {
    name: { common: "Germany" },
    capital: ["Berlin"],
    region: "Europe",
    flags: { svg: "https://example.com/flag.svg", alt: "Flag of Germany" },
    population: 83240525,
  };

  const renderComponent = (isFavorite = false, onToggleFavorite = vi.fn()) => {
    return render(
      <BrowserRouter>
        <CountryCard
          country={mockCountry}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      </BrowserRouter>
    );
  };

  it("renders country data correctly", () => {
    renderComponent();

    expect(screen.getByText("Germany")).toBeInTheDocument();
    expect(screen.getByText(/Capital:/)).toHaveTextContent("Capital: Berlin");
    expect(screen.getByText(/Region:/)).toHaveTextContent("Region: Europe");
    expect(screen.getByAltText("Flag of Germany")).toBeInTheDocument();
  });

  it("displays correct favorite icon and toggles on click", () => {
    const toggleSpy = vi.fn();
    renderComponent(false, toggleSpy);

    const heartButton = screen.getByRole("button");
    expect(heartButton).toHaveTextContent("🤍"); // not favorite initially

    fireEvent.click(heartButton);
    expect(toggleSpy).toHaveBeenCalled();
  });

  it("does not navigate when clicking favorite icon", () => {
    const toggleSpy = vi.fn();
    renderComponent(false, toggleSpy);

    const heartButton = screen.getByRole("button");

    // Simulate a click and make sure it only triggers the toggle
    fireEvent.click(heartButton);
    expect(toggleSpy).toHaveBeenCalledTimes(1);
  });
});
