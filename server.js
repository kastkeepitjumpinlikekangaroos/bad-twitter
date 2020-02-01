const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('build'));
const PORT = 8080;
let tweets = [];

app.get("/getAllTweets", (req, res) => {
    try {
        res.json({
            allTweets: tweets
        });
    } catch (err) {
        res.json({error: err});
    }
});

app.post('/tweet', (req, res) => {
    try {
        const tweet = req.body;
        tweets.push(tweet);
        console.log(tweets);
        res.json({
            allTweets: tweets
        });
    } catch (err) {
        res.json({error: err});
    }
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
