const {config} =  require('dotenv')
config()


console.log(process.env.PORT)

const app = require('./app')

app.listen(process.env.PORT ?? 3000, () => {
  console.log(`Salve test backend started on ${process.env.PORT ?? 3000}`);
});
