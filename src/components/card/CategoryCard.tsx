import {
  Paper,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';

import { CATEGORY } from '@/common/variables';
import { ComponentProps, Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { getCategoryFromNumber } from '@/functions';
function CategoryCard({
  categories,
  setCategories,
  ...props
}: {
  categories: number;
  setCategories: Dispatch<SetStateAction<number>>;
} & ComponentProps<typeof Paper>) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { t } = useTranslation();

  const removeCategory = (value: number) => {
    setCategories((prev) => prev & ~value);
  };

  const addCategory = (value: number) => {
    setCategories((prev) => prev | value);
  };

  return (
    <Paper
      id='category-card'
      className='accordion'
      sx={{ boxShadow: 'none' }}
      {...props}
    >
      <Accordion
        disableGutters
        sx={{ boxShadow: 'none' }}
        className='accordion-item rounded-t-xl!'
      >
        <AccordionSummary onClick={() => setIsCollapsed((prev) => !prev)}>
          <span>카테고리 선택</span>
          {isCollapsed ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} />
          )}
        </AccordionSummary>
        <AccordionDetails>
          <ul className='category-list'>
            {Object.entries(CATEGORY).map(([_, category], index) => {
              return (
                <li
                  className={
                    'category-item ' +
                    (category.value & categories ? 'selected' : '')
                  }
                  key={'category' + index}
                  onClick={
                    categories & category.value
                      ? () => removeCategory(category.value)
                      : () => addCategory(category.value)
                  }
                >
                  {t(category.name)}
                </li>
              );
            })}
          </ul>
        </AccordionDetails>
      </Accordion>

      <div className='selected-category-container rounded-b-xl!'>
        {categories == 0 ? (
          <div className='no-category'>선택한 카테고리가 없습니다.</div>
        ) : (
          getCategoryFromNumber(categories).map((category, index) => {
            return (
              <div
                className='selected-category'
                key={'selected-category' + index}
              >
                <span>{t(category.name)}</span>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => removeCategory(category.value)}
                />
              </div>
            );
          })
        )}
      </div>
    </Paper>
  );
}

export default CategoryCard;
