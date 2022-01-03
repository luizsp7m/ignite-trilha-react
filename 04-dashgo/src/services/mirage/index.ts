import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs';
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

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
      server.createList('user', 200);
    },

    routes() {
      this.namespace = 'api'; // api/users, no entanto, o Next.js também tem rotas na api, então temos que "resetar" esse caminho no final.
      this.timing = 750; // todas as requisições no Mirage vão levar 750ms, usado para loadings.
      
      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
        .users
        .slice
        (pageStart, pageEnd);

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users }
        )
      });

      this.post('/users');
      this.get('/users/:id');

      this.namespace = '';
      this.passthrough();
    }
  });

  return server;
}