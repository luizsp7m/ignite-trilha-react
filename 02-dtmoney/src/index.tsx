import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [{
        id: 1,
        title: 'Portfólio',
        type: 'deposit',
        category: 'Desenvolvimento',
        amount: 900,
        createdAt: new Date('2021-12-11 09:00:00'),
      }, {
        id: 2,
        title: 'Água',
        type: 'withdraw',
        category: 'Casa',
        amount: 60,
        createdAt: new Date('2021-12-11 09:00:00'),
      }],
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);