import { render, screen } from "@testing-library/react";
import { SignInButton } from ".";
import { useSession } from "next-auth/react";
import { mocked } from "ts-jest/utils";

jest.mock("next-auth/react");

describe("SignInButton component", () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({ data: null, status: "unauthenticated" });

    render(<SignInButton />)

    expect(screen.getByText("Sign In with Github")).toBeInTheDocument();
  });
});

describe("SignInButton component", () => {
  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          email: "john.doe@example.com",
          name: "John Doe",
          image: "",
        },
        expires: "2022-02-11T18:24:23.140Z",
      }, status: "authenticated"
    });

    render(<SignInButton />)

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});