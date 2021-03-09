import Search from 'antd/lib/input/Search';
import { Header } from 'antd/lib/layout/layout';
import React, { useContext } from 'react';
import { SearchContext } from '../../App';
import './navbar.css';

const Navbar = React.memo(() => {
    const { search, setSearch } = useContext(SearchContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <Header className='navbar'>
            <Search className='navbar__search' value={search} onChange={handleChange} />
        </Header>);
});

export default Navbar;
