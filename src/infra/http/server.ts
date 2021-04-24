import { app } from './app';
import '@infra/typeorm';

app.listen(3333, () => {
  console.log(`Service: Contents Iniciado`);
});
