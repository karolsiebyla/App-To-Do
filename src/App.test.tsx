import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("./supabaseClient", () => ({
  supabase: {
    auth: {
      signOut: vi.fn(),
    },
    from: () => ({
      delete: () => ({
        eq: () => Promise.resolve(),
      }),
    }),
  },
}));

const queryClient = new QueryClient();

test("renders loading text initially", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  );

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});