import express, { Express } from 'express';
import config from './config';
import sequelize from './models';
import ingredientRouter from './routers/ingredient.router';
import categoryRouter from './routers/category.router';

const app : Express = express();

app.use(express.json());

app.use('/v1/ingredient', ingredientRouter);
app.use('/v1/category', categoryRouter);


(async function bootstrap () {
  try {
    await sequelize.sync();
    app.listen(config.PORT, () => {
      console.log(`[server]: Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();