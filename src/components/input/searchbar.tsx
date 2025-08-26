import { useTranslation } from 'react-i18next';

import { faMagnifyingGlass, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEventHandler, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchBar({
  value,
  onChange,
  placeholder,
  children = <div className='offset w-5'></div>,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder: string;
  children?: ReactNode | ReactNode[] | undefined;
}) {
  return (
    <>
      {/* reset.scss와 충돌이 있어 border를 border!로 사용함. */}
      <div className='search-bar flex items-center border! border-brand1! w-full h-10 mt-5! px-3.5! py-0! rounded-xl border-solid'>
        <FontAwesomeIcon icon={faSearch} className='search-icon text-brand1' />
        {children}
        <input
          type='text'
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className='search-input w-full font-normal border-[none];'
        />
      </div>
    </>
  );
}

export function TopNavSearchBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(
        `/integrated-search?search=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='searchbar-container flex flex-[7] items-center justify-center pb-4! col-span-3 md:pb-0! md:order-2'>
      <div className='searchbar w-7/10 h-12 border-brand1! flex items-center ml-5 rounded-[48px] border-2! border-solid'>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className='searchbar-icon text-xl stroke-[2px] text-brand1 ml-5! cursor-pointer'
          onClick={handleSearch}
        />
        <input
          type='text'
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder={t('component.topnav.search-bar.placeholder')}
          className='searchbar-input w-full text-[15px] font-semibold mx-5! my-0 border-0 placeholder:text-brand5 placeholder:font-semibold placeholder:text-[15px]'
        />
      </div>
    </div>
  );
}
