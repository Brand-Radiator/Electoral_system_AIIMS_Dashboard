import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import classNames from "classnames";
import FeatherIcon from "feather-icons-react";
import englishIcon from "./flags/english_icon.jpg";
import hindiIcon from "./flags/hindi_icon.jpg";
import { API_BASE_URL } from "../../apiservices/apiService";

const Languages = [
  {
    name: "Hindi",
    flag: hindiIcon,
    lanValue: "hindi",
  },
  {
    name: "English",
    flag: englishIcon,
    lanValue: "english",
  },
];

const LanguageDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLanguageChange = async (selectedLanguage: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/setLanguage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedLanguage }),
      });

      if (!response.ok) {
        throw new Error("Failed to set language");
      }

      // Handle success, e.g., show a success message or update state
      // console.log("Language updated successfully");
      alert(`Language ${selectedLanguage} updated successfully`);
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error setting language:", error);
    }
  };

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        id="dropdown-languages"
        as="a"
        onClick={toggleDropdown}
        className={classNames("nav-link", "cursor-pointer", {
          show: dropdownOpen,
        })}
      >
        <FeatherIcon icon="globe" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
        <div onClick={toggleDropdown}>
          {(Languages || []).map((lang, i) => (
            <Link
              to="/"
              className="dropdown-item"
              key={i + "-lang"}
              // onClick={() => handleLanguageChange(lang.lanValue)}
            >
              <img
                src={lang.flag}
                alt={lang.name}
                className="me-1"
                height="12"
              />{" "}
              <span className="align-middle">{lang.name}</span>
            </Link>
          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;
