import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import App from './components/app';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostShow from './components/postShow';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
        <App>
          <Switch>
            <Route exact path="/" component={PostsIndex} />
            <Route exact path="/posts/new" component={PostsNew} />
            <Route exact path="/posts/:id" component={PostShow} />
          </Switch>
        </App>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
