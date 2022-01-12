import { render, screen, fireEvent } from "@testing-library/react";
import { SubscribeButton } from ".";
import { useSession, signIn } from "next-auth/react";
import { mocked } from "ts-jest/utils";
import { useRouter } from "next/router";

jest.mock("next-auth/react");
jest.mock("next/router");

describe("SignInButton component", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({data: null, status: "unauthenticated"});

    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirects user to sign in when not authenticated", () => {
    const signInMocked = mocked(signIn);
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({data: null, status: "unauthenticated"});

    render(<SubscribeButton />);

    const subscriteButton = screen.getByText("Subscribe now");

    fireEvent.click(subscriteButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it("redirects to posts when user already has a subscription", () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          email: "john.doe@example.com",
          name: "John Doe",
          image: "",
        },
        expires: "2022-02-11T18:24:23.140Z",
        activeSubscription: "fake-active-subscription",
      }, status: "authenticated"
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);

    const subscriteButton = screen.getByText("Subscribe now");

    fireEvent.click(subscriteButton);

    expect(pushMock).toHaveBeenCalledWith("/posts");
  });
});
