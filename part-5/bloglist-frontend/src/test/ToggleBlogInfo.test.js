import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToggleBlogInfo from "../components/ToggleBlogInfo";
import "@testing-library/jest-dom/extend-expect";

describe("<ToggleBlogInfo />", () => {
  let contaniers;

  beforeAll(() => {
    const blogData = {
      title: "testing...",
      author: "tester",
      url: "localhost:3000/tests",
      likes: 0,
      user: "randomIdForUserByTester",
      id: "randomIdForUserByTester",
    };
    const mock4HandleLikeBtn = jest.fn();
    const mock4HandleDeleteBtn = jest.fn();
    contaniers = render(
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
  test("rendered data shouldn't display url or number of likes", () => {
    const urlElement = screen.queryByText("URL :- localhost:3000/tests");
    expect(urlElement).toBeNull();
    const likesElement = screen.queryByText("LIKES :-");
    expect(likesElement).toBeNull();
  });
});
