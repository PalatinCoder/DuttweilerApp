import express from 'express';
import { news_items } from "./data/news";
const server = express();

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})
server.get('/news.json', (req, res) => res.send(news_items))

server.listen(3000, () => console.log('Dummy API listening on port 3000'))
