const { Router } = require('express');
const router = new Router();
const cheerio = require('cheerio');
const request = require('request-promise');
const colors = require('colors');

router.get('/', async (req, res) => {

    const $ = await request({
        uri: 'https://www.infobae.com/latinpower/',
        transform: body => cheerio.load(body)
    });

    const news = [];

    await $('a.cst_ctn').each((i, el) => {
        const title = $(el).find('h2.cst_hl span').text();
        const img = $(el).find('div.cst_img_ctn img').attr('src');
        const href = $(el).attr('href');

        let createdNews = {
            title,
            img,
            href: `https://www.infobae.com/${href}`
        }

        news.push(createdNews)
    })

    await $('a.nd-feed-list-card').each((i, el) => {
        const title = $(el).find('h2.nd-feed-list-card-headline-lean').text();
        const img = $(el).find('img').attr('src');
        const href = $(el).attr('href');

        let createdNews = {
            title,
            img,
            href: `https://www.infobae.com/${href}`
        }

        news.push(createdNews);
    })

    res.json({
        ok: true,
        data: news
    })

})

module.exports = router;