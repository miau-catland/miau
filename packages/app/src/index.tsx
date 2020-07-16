import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import 'semantic-ui-less/semantic.less';

const app = document.createElement("div");
document.body.appendChild(app);

ReactDOM.render(
  <App />,
  app
);
