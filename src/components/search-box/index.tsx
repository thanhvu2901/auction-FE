import { PageURL } from 'enum/PageURL';
import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
  // initialText?: string;
  
  onBlur?: () => void;
  onFocus?: () => void;
}

const SearchBar = (props: Props) => {
  const { onBlur, onFocus  } = props;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const history = useHistory();

  function onSearchTextChange(e: FormEvent<HTMLInputElement>) {
    setSearchQuery(e.currentTarget.value);
  }

  function onSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //! check for min 4 character only
    history.push(PageURL.Search + `?keyword=${searchQuery}`);
  }

  return (
    <div className="hero__search__form my-0">
      <form onSubmit={onSearchSubmit}>
        <input
          type="text"
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder="What do yo u need?"
          onChange={onSearchTextChange}
        />
        <button type="submit" className="site-btn">
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
