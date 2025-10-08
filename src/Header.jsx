import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <Link to="/">
        <h1>Adopt Me!</h1>
      </Link>
      <p>Find your perfect pet companion</p>

      <button className="theme-toggle" onClick={() => toggleTheme()}>
        {theme === "dark" ? "🌞" : "🌙"}
      </button>
    </header>
  );
};

export default Header;
