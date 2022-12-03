const fs = require('fs');
const fsp = require('fs').promises;
var sharp = require('sharp');

//define image max width
const max_width=1000;

//optimize and move images
fs.readdir('../images', (error, fileNames) => {
    if (error) throw error;
    fileNames.forEach(filename => {
        // console.log(filename)
        process_image(filename)
    })
})

async function process_image(filename) {
    const scaleByHalf = await sharp('../images/' + filename)
        .metadata()
        .then(({ width }) => {
            console.log(filename,width)
            if(width>max_width) width=max_width;
            return sharp('../images/' + filename)
            .resize(width)
            .toBuffer()
        }
        );
    fsp.writeFile('../www/img/' + filename, scaleByHalf);
  }