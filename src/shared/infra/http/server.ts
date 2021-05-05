import '@shared/containers';
import { app } from './app';
import '@shared/infra/typeorm';

app.listen(3333, () => {
  console.log(`Service: Contents Iniciado`);
});
