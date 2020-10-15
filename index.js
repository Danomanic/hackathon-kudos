require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const db = require('monk')(process.env.DB_HOST);

app.use(express.static(__dirname + '/public'));
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({
    extended: true
}));

const kudos = db.get('kudos');

app.get('/', async (req, res) => {
    res.render('index.html')
});

app.post('/thankyou', async (req, res) => {
    const submission = req.body;
    kudos.insert({
        nominee: submission.nominee,
        nominator: submission.nominator,
        reason: submission.reason
    })
    res.render('thankyou.html')
})

app.get('/history', async (req, res) => {

    const history = await kudos.find({});

    res.render('history.html', { "history": history } );
});


app.listen(port, () => {
    console.log("'the server is listening on port 3000");
})