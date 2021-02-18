import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FetchWorker } from './components/Worker/FetchWorker';
import { AddWorker } from './components/Worker/AddWorker';
import { EditWorker } from './components/Worker/EditWorker';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/fetch-worker' component={FetchWorker} />
        <Route path='/add-worker' component={AddWorker} />
        <Route path='/edit-worker' component={EditWorker} /> 
      </Layout>
    );
  }
}
