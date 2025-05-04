import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CountryCard from "../components/countryCard";
import * as localStorageUtil from "../utils/localStorageUtil";
import { vi } from "vitest";
// Mock data
const mockCountry = {
  cca3: "DEU",
  name: { common: "Germany" },
  capital: ["Berlin"],
  region: "Europe",
  population: 83000000,
  flags: { svg: "https://flagcdn.com/de.svg" },
};

vi.mock("../utils/localStorageUtil");

describe("CountryCard Component", () => {
  beforeEach(() => {
    localStorageUtil.getFavorites.mockReturnValue([]);
    localStorageUtil.toggleFavorite.mockImplementation((cca3) => [cca3]);
  });

  test("renders country data correctly", () => {
    render(
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    );

    expect(screen.getByText("Germany")).toBeInTheDocument();
    expect(screen.getByText(/Capital:/)).toHaveTextContent("Berlin");
    expect(screen.getByText(/Region:/)).toHaveTextContent("Europe");
    expect(screen.getByText(/Population:/)).toHaveTextContent(
      mockCountry.population.toLocaleString()
    );
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      mockCountry.flags.svg
    );
  });

  test("displays correct favorite icon and toggles on click", () => {
    render(
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    );

    const heartButton = screen.getByRole("button");
    expect(heartButton).toHaveTextContent("🤍"); // not favorite initially

    fireEvent.click(heartButton);
    expect(localStorageUtil.toggleFavorite).toHaveBeenCalledWith("DEU");
  });

  test("does not navigate when clicking favorite icon", () => {
    render(
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    );

    const heartButton = screen.getByRole("button");

    // Mock preventDefault
    const mockPreventDefault = vi.fn();
    fireEvent.click(heartButton, { preventDefault: mockPreventDefault });

    expect(mockPreventDefault).toHaveBeenCalled();
  });
});
