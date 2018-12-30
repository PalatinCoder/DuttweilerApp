const server = require('express')();
const news_items = require('./data/news');
const events_items = require('./data/events');

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})
server.get('/news.json', (req, res) => res.send(news_items))
server.get('/events.json', (req, res) => res.send(events_items))

server.listen(3000, () => console.log('Dummy API listening on port 3000'))
