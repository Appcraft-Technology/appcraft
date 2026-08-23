import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FlipText, flipPhrase, flipWords } from "./flip-text";

/** Current word, ignoring the invisible width sizer. */
function visibleWord() {
  return screen
    .getByTestId("flip-text")
    .querySelector<HTMLElement>("span:not(.invisible) span:not(.invisible), span:not(.invisible)")
    ?.textContent;
}
import { setReducedMotion } from "@/test/setup";

describe("FlipText", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    setReducedMotion(false);
  });

  it("renders a static word for prefers-reduced-motion users", () => {
    setReducedMotion(true);
    render(<FlipText />);

    const node = screen.getByTestId("flip-text");
    expect(node).toHaveAttribute("data-static", "true");
    expect(visibleWord()).toBe(flipWords[0]!);
  });

  it("does not cycle words (no layout shift) under reduced motion", () => {
    setReducedMotion(true);
    render(<FlipText />);

    const before = visibleWord();
    act(() => {
      vi.advanceTimersByTime(10_000);
    });
    expect(visibleWord()).toBe(before);
  });

  it("keeps a fixed-width sizer with the longest word so width never changes", () => {
    render(<FlipText />);
    const longest = flipWords.reduce((a, b) => (b.length > a.length ? b : a));
    const sizer = screen.getByTestId("flip-text").querySelector(".invisible");
    expect(sizer).toHaveTextContent(longest);
  });

  it("schedules a 2.5s cycle only when motion is allowed", () => {
    const spy = vi.spyOn(globalThis, "setInterval");
    const { unmount } = render(<FlipText />);
    expect(spy).toHaveBeenCalledWith(expect.any(Function), 2500);
    unmount();
    spy.mockClear();

    // Reduced motion: any interval created on the first paint is torn down
    // immediately and the node renders in its static form.
    const clearSpy = vi.spyOn(globalThis, "clearInterval");
    setReducedMotion(true);
    render(<FlipText />);
    expect(clearSpy).toHaveBeenCalled();
    expect(screen.getByTestId("flip-text")).toHaveAttribute("data-static", "true");
    spy.mockRestore();
    clearSpy.mockRestore();
  });

  it("stops cycling when paused", () => {
    const { rerender } = render(<FlipText paused />);
    rerender(<FlipText paused />);
    const before = visibleWord();
    act(() => {
      vi.advanceTimersByTime(10_000);
    });
    expect(visibleWord()).toBe(before);
  });

  it("exposes one static phrase to screen readers and hides animated layers", () => {
    const { container } = render(<FlipText />);
    expect(container.querySelector(".sr-only")).toHaveTextContent(flipPhrase);
    expect(screen.getByTestId("flip-text")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll("[aria-live]")).toHaveLength(0);
  });
});
