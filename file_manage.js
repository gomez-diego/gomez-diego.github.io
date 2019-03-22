const dir = ['./images/logos/', './images/illustrations/'];
const fs = require('fs');
let illustrations = {}
let logos = {}
let index = 0;

dir.forEach(directory => {
    fs.readdirSync(directory).forEach(file => {
        let ext = file.split(".")[1];
        fs.rename(directory + file, directory + index + "." + ext, (err) => {
            if (err) console.log(err);
        })
        let attributes = new Object();
        attributes["image"] = directory + index + "." + ext;
        if (directory == './images/logos/')
            logos[index] = attributes;
        else
            illustrations[index] = attributes;
        index++;
    });

    index = 0;
});

illustrations = JSON.stringify(illustrations);0
logos = JSON.stringify(logos);

fs.writeFile('./scripts/files.js', 'let illustrations=' + illustrations + '\nlet logos=' + logos, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
});