import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "@/locales/i18n";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { selectUser, unsetUser } from "@/stores/user";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLanguage,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import userIcon from "@/assets/images/profile.png";

import { LinkItemType } from "@/types/components";

const navTabs: LinkItemType[] = [
  {
    title: "component.topnav.community",
    url: "/community",
  },
  {
    title: "component.topnav.debate",
    url: "/debate",
  },
  {
    title: "component.topnav.summary",
    url: "/summary",
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

  const doLogout = () => {
    // 추후 실제 Logout 로직으로 변경
    dispatch(unsetUser());
    axios.defaults.headers.common["Authorization"] = "";
    navigate("/");
  };

  return (
    <div id="topnav">
      <div className="upper-container">
        <div className="left-container">
          <Link to={"/"} className="logo-container">
            <div className="logo dok">讀</div>
            <div className="logo colon">:</div>
            <div className="logo talk">TALK</div>
          </Link>
          <div className="searchbar-container">
            <div className="searchbar">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="searchbar-icon"
              />
              <input
                type="text"
                placeholder={t("component.topnav.search.placeholder")}
                className="searchbar-input"
              />
            </div>
          </div>
        </div>
        <div className="right-container">
          <div className="user-container">
            <FontAwesomeIcon
              icon={faLanguage}
              className="user-language"
              onClick={changeLanguage}
            />
            {user.id != undefined ? (
              <>
                <FontAwesomeIcon icon={faBell} className="user-notification" />
                <Dropdown className="user-dropdown">
                  <Dropdown.Toggle className="user-dropdown-toggle">
                    <img
                      src={user.profile ?? userIcon}
                      alt="userIcon"
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
