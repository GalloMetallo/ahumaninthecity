const fs = require('fs');
const cheerio = require('cheerio');

//open config file
let rawdata = fs.readFileSync('../config.json');
let config = JSON.parse(rawdata);

//generate home page
page_writer({ title: config.title, content: config.home_content, filename: 'index.html' })

//generate pages
config.pages.forEach((page)=>{
    console.log(page)
    page_writer(page)
})


function page_writer(page) {
    //load template
    const template = fs.readFileSync("../templates/page.html");
    //load into parser
    const $ = cheerio.load(template);
    $('title').html(page.title)
    $('body').append(page.content)
    //save file
    let pagename=(page.filename)?page.filename:page.title.toLowerCase().replace(' ','_')+'.html';

    fs.writeFileSync('../www/' + pagename, $.html());
}