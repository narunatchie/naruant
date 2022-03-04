const app = require('./app');
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.listen(port, () => {
  console.log("Sever is running on port"+port);
});
