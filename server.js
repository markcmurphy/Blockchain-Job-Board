const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('I am listening...');
});

app.get ('/', (req, res)=> {
  res.render('index.ejs');
});
