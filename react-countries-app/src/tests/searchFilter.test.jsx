import { render, screen, fireEvent } from "@testing-library/react";
import SearchFilter from "../components/searchAndFilter";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";

// ...

describe("SearchFilter Component", () => {
  test("renders all dropdowns and input field", () => {
    render(
      <SearchFilter
        onSearchTypeChange={() => {}}
        onSearchValueChange={() => {}}
        onRegionChange={() => {}}
      />
    );

    expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
    expect(screen.getAllByRole("combobox")).toHaveLength(2); // two dropdowns
  });

  test("calls onSearchTypeChange when search type changes", () => {
    const mockSearchTypeChange = vi.fn();
    render(
      <SearchFilter
        onSearchTypeChange={mockSearchTypeChange}
        onSearchValueChange={() => {}}
        onRegionChange={() => {}}
      />
    );

    const select = screen.getAllByRole("combobox")[0];
    fireEvent.change(select, { target: { value: "capital" } });

    expect(mockSearchTypeChange).toHaveBeenCalledWith("capital");
  });

  test("calls onSearchValueChange when input changes", () => {
    const mockSearchValueChange = vi.fn();
    render(
      <SearchFilter
        onSearchTypeChange={() => {}}
        onSearchValueChange={mockSearchValueChange}
        onRegionChange={() => {}}
      />
    );

    const input = screen.getByPlaceholderText(/search by name/i);
    fireEvent.change(input, { target: { value: "Germany" } });

    expect(mockSearchValueChange).toHaveBeenCalledWith("Germany");
  });

  test("calls onRegionChange when region is selected", () => {
    const mockRegionChange = vi.fn();
    render(
      <SearchFilter
        onSearchTypeChange={() => {}}
        onSearchValueChange={() => {}}
        onRegionChange={mockRegionChange}
      />
    );

    const regionSelect = screen.getAllByRole("combobox")[1];
    fireEvent.change(regionSelect, { target: { value: "Europe" } });

    expect(mockRegionChange).toHaveBeenCalledWith("Europe");
  });
});
