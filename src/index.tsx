import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, createHttpLink, ApolloLink, ApolloProvider, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
})

const afterwareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
    }
  });
  return forward(operation);
});

export const client = new ApolloClient({
  link: ApolloLink.from([
    afterwareLink.concat(httpLink),
  ]),
  cache: new InMemoryCache(),
})


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
