const fs = require('fs');
const cheerio = require('cheerio');

//open config file
let rawdata = fs.readFileSync('../config.json');
let config = JSON.parse(rawdata);

//generate home page

//load template
const template = fs.readFileSync("../templates/page.html");
//load into parser
const $ = cheerio.load(template);
$('title').html(config.title)
$('body').append(config.home_content)
//save file
fs.writeFileSync('../www/index.html', $.html());