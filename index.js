const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
app.use(express.static(__dirname + '/public'));
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
const port = 3000;
app.use(bodyParser.urlencoded({ extended : true }));

app.get('/', (req, res) => {
       res.render('index.html')
   });

app.post('/thankyou', (req, res) => {
    res.render('thankyou.html')
})



app.listen(port, () => {
    console.log("'the server is listening on port 3000");
})


