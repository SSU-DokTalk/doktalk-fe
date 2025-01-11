import axios from "axios";
import { useEffect } from "react";
import cookie from "react-cookies";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "@/locales/i18n";

import logo from "@/assets/images/logo.svg";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLanguage,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { selectUser, unsetUser } from "@/stores/user";

import { LinkItemType } from "@/types/components";
import ProfileIcon from "../base/ProfileIcon";

const navTabs: LinkItemType[] = [
  {
    title: "component.topnav.main-page",
    url: "/",
  },
  {
    title: "component.topnav.debate",
    url: "/debate",
  },
  {
    title: "component.topnav.summary",
    url: "/summary",
  },
  {
    title: "component.topnav.search",
    url: "/search",
  },
];

const dropdownItems: LinkItemType[] = [
  {
    title: "component.topnav.dropdown.mypage",
    url: "/mypage",
  },
  {
    title: "component.topnav.dropdown.my-activity",
    url: "/my-activity",
  },
  {
    title: "component.topnav.dropdown.settings",
    url: "/settings",
  },
];

function Topnav() {
  const currentTab = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language == "ko" ? "en" : "ko");
  };

  useEffect(() => {}, [user]);

  const doLogout = () => {
    dispatch(unsetUser());
    axios.defaults.headers.common["Authorization"] = "";
    cookie.remove("Authorization", { path: "/" });
    navigate("/login");
  };

  return (
    <div id="topnav" style={{ zIndex: "10" }}>
      <div className="upper-container">
        <div className="offset" />
        <div className="left-container">
          <Link to={"/"} className="logo-container">
            <img src={logo} alt="doktalk logo" className="logo" />
          </Link>
        </div>
        <div className="searchbar-container">
          <div className="searchbar">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="searchbar-icon"
            />
            <input
              type="text"
              placeholder={t("component.topnav.search-bar.placeholder")}
              className="searchbar-input"
            />
          </div>
        </div>
        <div className="right-container">
          <div className="user-container">
            <FontAwesomeIcon
              icon={faLanguage}
              className="user-language"
              onClick={changeLanguage}
            />
            {user.id != 0 ? (
              <>
                <FontAwesomeIcon icon={faBell} className="user-notification" />
                <Dropdown className="user-dropdown">
                  <Dropdown.Toggle className="user-dropdown-toggle">
                    <ProfileIcon
                      profile={user.profile}
                      size={38}
                      className="user-icon"
                    />
                    <div className="user-name-container">
                      <span className="user-name">{user.name ?? "닉네임"}</span>
                      {t("component.topnav.user.postfix")}
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="user-dropdown-menu">
                    {dropdownItems.map((item, idx) => {
                      return (
                        <Dropdown.Item
                          onClick={() => navigate(item.url)}
                          className="user-dropdown-menu-item"
                          key={"dropdown" + idx}
                        >
                          {t(item.title)}
                        </Dropdown.Item>
                      );
                    })}
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={doLogout}
                      className="user-dropdown-menu-item"
                    >
                      {t("component.topnav.dropdown.logout")}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <div className="user-login-container">
                  <button
                    className="user-register"
                    onClick={() => navigate("/register")}
                  >
                    {t("component.topnav.register")}
                  </button>
                  <button
                    className="user-login"
                    onClick={() => navigate("/login")}
                  >
                    {t("component.topnav.login")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="lower-container">
        <div className="tab-container">
          {navTabs.map((tab, idx) => {
            return (
              <div
                className="tab"
                style={
                  tab.url != "/" + currentTab.pathname.split("/")[1]
                    ? {
                        borderBottomColor: "rgba(0, 0, 0, 0)",
                      }
                    : {}
                }
                key={"navtab" + idx}
              >
                <Link
                  to={tab.url}
                  className="tab-title"
                  style={
                    tab.url != "/" + currentTab.pathname.split("/")[1]
                      ? {
                          color: "black",
                        }
                      : {}
                  }
                >
                  {t(tab.title)}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Topnav;
