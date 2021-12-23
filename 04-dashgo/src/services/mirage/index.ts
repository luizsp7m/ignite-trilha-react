import { createServer, Factory, Model } from 'miragejs';
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        
        email() {
          return faker.internet.email().toLowerCase();
        },

        createdAt() {
          return faker.date.recent(10); // A partir da data atual 10 dias
        },
      }),
    },

    seeds(server) { // Gera dados estáticos
      server.createList('user', 7);
    },

    routes() {
      this.namespace = 'api'; // api/users, no entanto, o Next.js também tem rotas na api, então temos que "resetar" esse caminho no final.
      
      this.timing = 750; // todas as requisições no Mirage vão levar 750ms, usado para loadings.
      this.get('/users');
      this.post('/users');

      this.namespace = '';
      this.passthrough();
    }
  });

  return server;
}