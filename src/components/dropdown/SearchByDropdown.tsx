import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { ArrowDropDown } from "@mui/icons-material";
import { ButtonBase, Menu, MenuItem } from "@mui/material";

import { useTranslation } from "react-i18next";

function SearchDropdown({
  searchBys,
  searchByIdx,
  setSearchByIdx,
}: {
  searchBys: {
    name: string;
  }[];
  searchByIdx: number;
  setSearchByIdx: Dispatch<SetStateAction<number>>;
}) {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <div className='search-by-dropdown'>
        <ButtonBase
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
          className='text-brand1! text-[15px] font-normal w-max p-2! pl-3!'>
          {t(searchBys[searchByIdx].name)} <ArrowDropDown />
        </ButtonBase>
        <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
          {searchBys.map((searchBy, index) => (
            <MenuItem
              key={"search-by" + index}
              onClick={() => {
                setSearchByIdx(index);
                setAnchorEl(null);
              }}>
              {t(searchBy.name)}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  );
}

export default SearchDropdown;
