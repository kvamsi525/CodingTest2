const app = require('../app');
const mongoose = require('mongoose');
const port = 4000;
 mongoose.connect('mongodb://localhost/codingtest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

module.exports = app;