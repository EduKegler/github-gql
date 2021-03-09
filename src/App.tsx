import Layout, { Content } from 'antd/lib/layout/layout';
import React, { createContext } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import RepoList from './components/repoList/RepoList';

interface ISearchContext {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<ISearchContext>({} as ISearchContext);

const App = () => {

  const [search, setSearch] = React.useState('React');

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
    <Layout>
      <Navbar />
      <Content className='content'>
        <RepoList />
      </Content>
    </Layout>
    </SearchContext.Provider>
  );
}

export default App;
