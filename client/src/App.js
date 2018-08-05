import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { EtsyWizard } from './components/EtsyWizard';
import './App.css';

class App extends Component {

  render() {
    return (
      <Layout>
            <Route exact path='/' component={EtsyWizard} />
      </Layout>
    );
  }
}

export default App;