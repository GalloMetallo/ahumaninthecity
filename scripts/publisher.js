const fs = require('fs');
const cheerio = require('cheerio');

//open config file
let rawdata = fs.readFileSync('../config.json');
let config = JSON.parse(rawdata);



//generate home page
page_writer({ title: config.title, content: config.home_content, filename: 'index.html' }, config.menu)


//generate pages
config.pages.forEach((page) => {
    // console.log(page)
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
    // console.log(menu)
    menu.forEach((m) => {
        if (m.pages.length == 1)
            $(".menu").append("<li><a href='" + page_filename(m.pages[0]) + "'>" + m.title + "</a></p>")
        else {
            let submenu = "<li class='submenu'>";
            submenu += m.title;
            submenu += "<ul>";
            m.pages.forEach((sm) => {
                config.pages.forEach((page) => {
                    // console.log('submenu',page,sm)
                    if (sm == page.title) {
                        submenu += "<li><a href='"+page_filename (page.title)+"'>"+page.title+"</a></li>";
                    }
                })
            })
            submenu += '</ul></li>';
            $(".menu").append(submenu)

        }
    })
    // add images
    if(page.images!=null){
        // console.log(page.title+' has images')
        // $('body').append(`
        // <div class='gallery grid' data-masonry='{   "itemSelector": ".grid-item",  "fitWidth": true,  "transitionDuration": "0.8s", "columnWidth": 100,  "gutter": 10 }'>
       
        // </div>`)
        $('body').append(`<div class='gallery grid'></div>`)

        //add masonry library
        $('head').append('<script defer="" src="js/masonry.js" type="text/javascript"></script>')


        page.images.forEach((img)=>{
            $('.gallery').append("<div class='grid-item'><img src='./"+img+"'></div>")

        })
    }
    //add galleries
    if(page.galleries!=null){
        console.log(page.title+' has gallery')
        $('body').append("<div class='galleries'></div>")

        page.galleries.forEach((gallery)=>{
            //check witch page is part of this gallery
            config.pages.forEach((page)=>{
                console.log(gallery,' ',page.title)
                if(gallery==page.title){
                    let tot_images = page.images.length;
                    let first_image = page.images[0];
                    $('.galleries').append("<div><h2>"+gallery+" - images "+tot_images+"</h2><a href='"+page_filename( page.title)+"'><img src='./"+first_image+"'></a></div>")

                }
            })

        })
    }
    //save file
    let pagename = (page.filename) ? page.filename : page_filename(page.title);

    fs.writeFileSync('../www/' + pagename, $.html());
}

function page_filename(name) {
    return name.toLowerCase().replace(' ', '_') + '.html'
}