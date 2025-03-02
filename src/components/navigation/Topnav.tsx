import axios from "axios";
import React, { useEffect } from "react";
import cookie from "react-cookies";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ArrowDropDown } from "@mui/icons-material";
import {
  Menu,
  MenuItem,
  Button,
  IconButton,
  Drawer,
  Divider,
  Box,
  Paper,
  List,
  ListItem,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";

import i18n from "@/locales/i18n";

import logo from "@/assets/images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faXmark,
  faHouse,
  faComments,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { selectUser, unsetUser, UserState } from "@/stores/user";

import { LinkItemType } from "@/types/components";
import ProfileIcon from "../base/ProfileIcon";
import KR from "@/assets/images/flags/kr.svg?react";
import US from "@/assets/images/flags/us.svg?react";

import { TopNavSearchBar } from "@/components/input/searchbar";

const navTabs: LinkItemType[] = [
  {
    title: "component.topnav.main-page",
    url: "/",
    icon: <FontAwesomeIcon icon={faHouse} />,
  },
  {
    title: "component.topnav.debate",
    url: "/debate",
    icon: <FontAwesomeIcon icon={faComments} />,
  },
  {
    title: "component.topnav.summary",
    url: "/summary",
    icon: <FontAwesomeIcon icon={faFileLines} />,
  },
  {
    title: "component.topnav.search",
    url: "/search",
    icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
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
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { t } = useTranslation();
  const changeLanguage = (item: { name: string; value: string }) => {
    localStorage.setItem("lang", item.value);
    i18n.changeLanguage(item.value);
  };

  useEffect(() => {}, [user]);

  const dispatch = useAppDispatch();
  const doLogout = () => {
    dispatch(unsetUser());
    axios.defaults.headers.common["Authorization"] = "";
    cookie.remove("Authorization", { path: "/" });
    navigate("/login");
  };

  return (
    <>
      <div id='topnav' style={{ zIndex: "10" }}>
        <div className='upper-container grid grid-cols-3 md:grid-cols-5'>
          <div className='left-container ml-4! my-2! md:mt-5!'>
            <Link to={"/"} className='logo-container'>
              <img src={logo} alt='doktalk logo' className='logo' />
            </Link>
          </div>

          <div className='right-container col-span-2 md:col-span-1 md:order-3 '>
            <div className='user-container'>
              {user.id != 0 ? (
                <LoginedInfo doLogout={doLogout} />
              ) : (
                <GuestInfo />
              )}

              <div className='language-dropdown md:mr-5!'>
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

              <IconButton
                className='drawer-button md:hidden! mr-4!'
                onClick={() => setDrawerOpen(true)}>
                <FontAwesomeIcon icon={faBars} />
              </IconButton>
            </div>
          </div>

          <TopNavSearchBar />
        </div>

        <div className='lower-container hidden md:block'>
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

        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              top: "33%",
              height: "66%", // 전체 높이의 2/3만큼만 차지
            },
          }}>
          <Box className='w-screen! h-1/2!'>
            <div className='flex justify-between px-10!'>
              <span>탐색</span>
              <IconButton onClick={() => setDrawerOpen(false)}>
                <FontAwesomeIcon icon={faXmark} />
              </IconButton>
            </div>
            <List>
              {navTabs.map((tab, idx) => {
                return (
                  <ListItem key={"drawer" + idx}>
                    <Link
                      to={tab.url}
                      onClick={() => setDrawerOpen(false)}
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
                  </ListItem>
                );
              })}
            </List>
            <Divider />
            <List>
              {dropdownItems.map((item, idx) => {
                return (
                  <ListItem
                    onClick={() => {
                      navigate(item.url);
                      setDrawerOpen(false);
                    }}
                    className='user-dropdown-menu-item'
                    key={"dropdown" + idx}>
                    {t(item.title)}
                  </ListItem>
                );
              })}
            </List>
            <Divider />

            <ListItem onClick={doLogout} className='user-dropdown-menu-item'>
              {t("component.topnav.dropdown.logout")}
            </ListItem>
          </Box>
        </Drawer>
      </div>

      <BottomNav />
    </>
  );
}

function BottomNav() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pageIdx, setPageIdx] = React.useState(0);

  return (
    <>
      <div className='bottom-nav md:hidden'>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}>
          <BottomNavigation
            showLabels
            value={pageIdx}
            onChange={(event, newPageIdx) => {
              setPageIdx(newPageIdx);
              navigate(navTabs[newPageIdx].url);
            }}>
            {navTabs.map((item, idx) => (
              <BottomNavigationAction label={t(item.title)} icon={item.icon} />
            ))}
          </BottomNavigation>
        </Paper>
      </div>
    </>
  );
}

function LoginedInfo({
  doLogout,
}: {
  doLogout: Function;
}): React.ReactNode | Iterable<React.ReactNode> {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <FontAwesomeIcon icon={faBell} className='user-notification' />
      <div className='user-dropdown hidden md:block'>
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
