import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToggleBlogInfo from "../components/ToggleBlogInfo";
import "@testing-library/jest-dom/extend-expect";

describe("<ToggleBlogInfo />", () => {
  const mock4HandleLikeBtn = jest.fn();
  const mock4HandleDeleteBtn = jest.fn();
  beforeEach(() => {
    const blogData = {
      title: "testing...",
      author: "tester",
      url: "localhost:3000/tests",
      likes: 0,
      user: "randomIdForUserByTester",
      id: "randomIdForUserByTester",
    };
    render(
      <ToggleBlogInfo
        blog={blogData}
        handleLikeBtn={mock4HandleLikeBtn}
        handleToDelete={mock4HandleDeleteBtn}
        key={blogData.id}
      >
        {blogData.title}{" "}
      </ToggleBlogInfo>
    );
  });

  test("render blog's title in ToggableBlogComponent", () => {
    const blogTitle = screen.getByText("testing...");
    expect(blogTitle).toBeDefined();
  });

  test("by default, rendered data shouldn't display url or number of likes", () => {
    const urlElement = screen.queryByText("URL :- localhost:3000/tests");
    expect(urlElement).toBeNull();
    const likesElement = screen.queryByText("LIKES :-");
    expect(likesElement).toBeNull();
  });

  test("after clicking the show btn, it should display url & number of likes", async () => {
    const showBtn = screen.getByText("Show");
    userEvent.click(showBtn);
    const urlElement = screen.queryByText("URL :- localhost:3000/tests");
    expect(urlElement).toBeDefined();
    const likesElement = screen.queryByText("LIKES :-");
    expect(likesElement).toBeDefined();
  });

  test("after clicking the hide Btn, it shouldn't display url & number of likes", () => {
    const showBtn = screen.getByText("Show");
    userEvent.click(showBtn);
    const hideBtn = screen.getByText("Hide");
    userEvent.click(hideBtn);
    const urlElement = screen.queryByText("URL :- localhost:3000/tests");
    expect(urlElement).toBeNull();
    const likesElement = screen.queryByText("LIKES :-");
    expect(likesElement).toBeNull();
  });

  test("when like btn is clicked twice, it should send blog prop twice", () => {
    const showBtn = screen.getByText("Show");
    userEvent.click(showBtn);
    const likeBtn = screen.getByText("like");
    userEvent.click(likeBtn);
    userEvent.click(likeBtn);
    expect(mock4HandleLikeBtn.mock.calls).toHaveLength(2);
  });
});
