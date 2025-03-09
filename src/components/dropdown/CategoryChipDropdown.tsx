import { Dispatch, SetStateAction, useState } from 'react';

import { Popper, MenuItem, Paper, ClickAwayListener } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import { useTranslation } from 'react-i18next';

import {
  addCategory,
  getCategoryFromNumber,
  removeCategory,
} from '@/functions';

import { CATEGORY } from '@/common/variables';
import { DebateType, SummaryType } from '@/types/data';

function CategoryDropdown({
  setData,
  data,
}: {
  setData:
    | Dispatch<SetStateAction<DebateType>>
    | Dispatch<SetStateAction<SummaryType>>;
  data: { category: number };
}) {
  // (show: { book: boolean; category: boolean; }, setDebateData, setShow, t, debateData: DebateType) {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        <div className='input-container'>
          <label htmlFor='category'>카테고리</label>

          <div
            className='input-box category-input'
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <div className='category-container'>
              {data.category == 0
                ? '토론 주제의 카테고리를 선택해주세요'
                : getCategoryFromNumber(data.category).map(
                    (category, index) => {
                      return (
                        <div
                          className='selected-category'
                          key={'selected-category' + index}
                        >
                          <span>{t(category.name)}</span>
                          <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() =>
                              setData((prev: any) => {
                                return {
                                  ...prev,
                                  category: removeCategory(
                                    prev.category,
                                    category.value
                                  ),
                                };
                              })
                            }
                          />
                        </div>
                      );
                    }
                  )}
            </div>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>

          <Popper
            className='category-dropdown-menu'
            open={open}
            anchorEl={anchorEl}
            onBlur={() => setAnchorEl(null)}
            disablePortal
            placement='bottom'
            modifiers={[
              {
                name: 'flip',
                enabled: false,
              },
              {
                name: 'preventOverflow',
                enabled: false,
              },
            ]}
          >
            <Paper sx={{ maxHeight: 400, overflow: 'auto' }}>
              {Object.keys(CATEGORY).map((category) => {
                return (
                  <MenuItem
                    key={'category' + CATEGORY[category].value}
                    onClick={() => {
                      setData((prev: any) => {
                        return {
                          ...prev,
                          category: addCategory(
                            prev.category,
                            CATEGORY[category].value ?? 0
                          ),
                        };
                      });
                      setAnchorEl(null);
                    }}
                  >
                    {t(CATEGORY[category].name)}
                  </MenuItem>
                );
              })}
            </Paper>
          </Popper>
        </div>
      </ClickAwayListener>
    </>
  );
}

export default CategoryDropdown;
