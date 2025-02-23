import axios from "axios";
import React, { useEffect } from "react";
import cookie from "react-cookies";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ArrowDropDown } from "@mui/icons-material";
import { Menu, MenuItem, Button, IconButton, Divider } from "@mui/material";

import i18n from "@/locales/i18n";

import logo from "@/assets/images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { selectUser, unsetUser, UserState } from "@/stores/user";

import { LinkItemType } from "@/types/components";
import ProfileIcon from "../base/ProfileIcon";
import KR from "@/assets/images/flags/kr.svg?react";
import US from "@/assets/images/flags/us.svg?react";

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

const languageDropdownItems: {
  name: string;
  value: string;
  icon: any;
}[] = [
  {
    name: "한국어",
    value: "kr",
    icon: <KR className='lang-menu-icon' />,
  },
  {
    name: "English",
    value: "us",
    icon: <US className='lang-menu-icon' />,
  },
];

function Topnav() {
  const currentTab = useLocation();
  const user = useAppSelector(selectUser);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { t } = useTranslation();
  const changeLanguage = (item: { name: string; value: string }) => {
    localStorage.setItem("lang", item.value);
    i18n.changeLanguage(item.value);
  };

  useEffect(() => {}, [user]);

  return (
    <div id='topnav' style={{ zIndex: "10" }}>
      <div className='upper-container'>
        <div className='offset' />
        <div className='left-container'>
          <Link to={"/"} className='logo-container'>
            <img src={logo} alt='doktalk logo' className='logo' />
          </Link>
        </div>

        <div className='searchbar-container'>
          <div className='searchbar'>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className='searchbar-icon'
            />
            <input
              type='text'
              placeholder={t("component.topnav.search-bar.placeholder")}
              className='searchbar-input'
            />
          </div>
        </div>

        <div className='right-container'>
          <div className='user-container'>
            <div className='language-dropdown'>
              <IconButton
                className='language-icon'
                onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                }}>
                {
                  (
                    languageDropdownItems.find(
                      (item) => item.value == localStorage.getItem("lang")
                    ) ?? languageDropdownItems[0]
                  ).icon
                }
              </IconButton>

              <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                className='language-dropdown-menu'>
                {languageDropdownItems.map((item, idx) => {
                  return (
                    <MenuItem
                      onClick={() => {
                        changeLanguage(item);
                        setAnchorEl(null);
                      }}
                      key={"lang" + idx}>
                      {item.icon}
                      <div className='lang-menu-text'>{item.name}</div>
                    </MenuItem>
                  );
                })}
              </Menu>
            </div>

            {user.id != 0 ? <LoginedInfo /> : <GuestInfo />}
          </div>
        </div>
      </div>

      <div className='lower-container'>
        <div className='tab-container'>
          {navTabs.map((tab, idx) => {
            return (
              <div
                className='tab'
                style={
                  tab.url != "/" + currentTab.pathname.split("/")[1]
                    ? {
                        borderBottomColor: "rgba(0, 0, 0, 0)",
                      }
                    : {}
                }
                key={"navtab" + idx}>
                <Link
                  to={tab.url}
                  className='tab-title'
                  style={
                    tab.url != "/" + currentTab.pathname.split("/")[1]
                      ? {
                          color: "black",
                        }
                      : {}
                  }>
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

function LoginedInfo(): React.ReactNode | Iterable<React.ReactNode> {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const doLogout = () => {
    dispatch(unsetUser());
    axios.defaults.headers.common["Authorization"] = "";
    cookie.remove("Authorization", { path: "/" });
    navigate("/login");
  };

  return (
    <>
      <FontAwesomeIcon icon={faBell} className='user-notification' />
      <div className='user-dropdown'>
        <Button
          className='user-dropdown-toggle'
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}>
          <ProfileIcon profile={user.profile} size={38} className='user-icon' />
          <div className='user-name-container'>
            <span className='user-name'>{user.name ?? "닉네임"}</span>
            {t("component.topnav.user.postfix")}
            <ArrowDropDown />
          </div>
        </Button>

        <Menu
          className='user-dropdown-menu'
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}>
          {dropdownItems.map((item, idx) => {
            return (
              <MenuItem
                onClick={() => {
                  navigate(item.url);
                  setAnchorEl(null);
                }}
                className='user-dropdown-menu-item'
                key={"dropdown" + idx}>
                {t(item.title)}
              </MenuItem>
            );
          })}
          <Divider component='li' />
          <MenuItem onClick={doLogout} className='user-dropdown-menu-item'>
            {t("component.topnav.dropdown.logout")}
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}

function GuestInfo(): React.ReactNode | Iterable<React.ReactNode> {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className='user-login-container'>
        <button className='user-register' onClick={() => navigate("/register")}>
          {t("component.topnav.register")}
        </button>
        <button className='user-login' onClick={() => navigate("/login")}>
          {t("component.topnav.login")}
        </button>
      </div>
    </>
  );
}

export default Topnav;
