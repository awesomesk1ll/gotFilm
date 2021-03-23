import React from "react";
import { Button } from "antd";

const ThemeButton = (props) => {
  const changeTheme = () => {
    const themeBtn = document.getElementById("changeTheme");
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
    });
  };

  return (
    <Button
      type="primary"
      ghost
      onClick={changeTheme}
      id="changeTheme"
      style={{
        display: "block",
        margin: "25px auto ",
        textTransform: "uppercase",
      }}
    >
      change theme
    </Button>
  );
};

export default ThemeButton;
