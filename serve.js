
var querystring = require('querystring');
var express = require('express');
const fs = require("fs");
var app = express();
var bodyParser = require('body-parser');

const tg = require("./tg")
require('dotenv').config()

tg.init()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.listen(8001, async function() {
    console.log('sms-forward-server start')
})
app.get('/ping', async function(req, res) {
    console.log(req.query)
    res.status(200).send({
        "code": 200,
        "data": res.locals.auth
    })
})


app.get('/sms', async function(req, res) {
    console.log(req.query)
    const bot = tg.getBot()
    await bot.sendMessage(process.env.UID,
`*Recive SMS message from :*
\`${req.query.sender}\`

*Message* : 
\`${req.query.msg}\`    
`, {
        parse_mode: 'MarkDown',
        disable_web_page_preview: "true",
        reply_markup: JSON.stringify({
            inline_keyboard: []
        })
    });
    res.status(200).send({
        "code": 200,
        "data": res.locals.auth
    })
})


