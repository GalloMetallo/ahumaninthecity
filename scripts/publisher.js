const fs = require('fs');
const cheerio = require('cheerio');

//open config file
let rawdata = fs.readFileSync('../config.json');
let config = JSON.parse(rawdata);



//generate home page
page_writer({ title: config.title, content: config.home_content, filename: 'index.html' }, config.menu)


//generate pages
config.pages.forEach((page) => {
    console.log(page)
    page_writer(page, config.menu)
})


function page_writer(page, menu) {
    //load template
    const template = fs.readFileSync("../templates/page.html");
    //load into parser
    const $ = cheerio.load(template);
    $('title').html(page.title)
    $('body').append("<ul class='menu'></ul>")
    $('body').append("<h1>" + page.title + "</h1>")
    $('body').append("<p>" + page.content + "</p>")
    //append menu
    console.log(menu)
    menu.forEach((m) => {
        if (m.pages.length == 1)
            $(".menu").append("<li><a href='" + page_filename(m.pages[0]) + "'>" + m.title + "</a></p>")
        else {
            let submenu = '<li><ul>';
            m.pages.forEach((sm) => {
                config.pages.forEach((page) => {
                    console.log('submenu',page,sm)
                    if (sm == page.title) {
                        submenu += "<li><a href='"+page_filename (page.title)+"'>"+page.title+"</a></li>";

                    }
                })
            })
            submenu += '</ul></li>';
            $(".menu").append(submenu)

        }
    })
    //save file
    let pagename = (page.filename) ? page.filename : page_filename(page.title);

    fs.writeFileSync('../www/' + pagename, $.html());
}

function page_filename(name) {
    return name.toLowerCase().replace(' ', '_') + '.html'
}