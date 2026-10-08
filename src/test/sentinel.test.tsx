import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Sentinel from "../pages/Sentinel";

afterEach(cleanup);

describe("Sentinel interactions", () => {
  it("changes the investigation when a workflow stage is selected", () => {
    render(<Sentinel />);
    fireEvent.click(screen.getByRole("tab", { name: /Remediate/ }));
    expect(screen.getByRole("tab", { name: /Remediate/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveAccessibleName(/Remediate/);
    expect(
      screen.getByRole("heading", {
        name: "Turn the finding into a focused fix.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Illustrative patch; production fixes need context and review.",
      ),
    ).toBeInTheDocument();
  });

  it("supports arrow, Home, and End keys with a single tab stop", () => {
    render(<Sentinel />);
    const discover = screen.getByRole("tab", { name: /Discover/ });
    fireEvent.keyDown(discover, { key: "ArrowLeft" });
    const verify = screen.getByRole("tab", { name: /Verify/ });
    expect(verify).toHaveFocus();
    expect(verify).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(verify, { key: "Home" });
    expect(discover).toHaveFocus();
    fireEvent.keyDown(discover, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: /Validate/ })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole("tab", { name: /Validate/ }), {
      key: "End",
    });
    expect(verify).toHaveFocus();
    expect(
      screen.getAllByRole("tab").filter((tab) => tab.tabIndex === 0),
    ).toHaveLength(1);
  });

  it("closes the mobile navigation on Escape and restores focus", () => {
    render(<Sentinel />);
    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    expect(
      screen.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeVisible();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toHaveFocus();
    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" }),
    ).not.toBeInTheDocument();
  });

  it("closes mobile navigation after following an anchor", () => {
    render(<Sentinel />);
    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    fireEvent.click(
      screen
        .getByRole("navigation", { name: "Mobile navigation" })
        .querySelector('a[href="#architecture"]')!,
    );
    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
  });
});
