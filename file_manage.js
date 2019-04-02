const dir = ['./images/logos/', './images/illustrations/'];
const fs = require('fs');
let illustrations = {}
let logos = {}

dir.forEach(directory => {
    let index = 0;

    try{
        fs.readdirSync(directory).forEach(file => {
            let attributes = new Object();
            attributes["image"] = directory + file;
            if (directory == './images/logos/')
                logos[index] = attributes;
            else
                illustrations[index] = attributes;
            index++;
        });
        console.log(directory," : complete.");
    } catch (err) {
        console.error(err);
    }
    


});

illustrations = JSON.stringify(illustrations);
logos = JSON.stringify(logos);

try {
    fs.writeFileSync('./scripts/files.js', 'let illustrations=' + illustrations + '\nlet logos=' + logos);
    console.log('./scripts/files.js'," : File Created.");
} catch (err) {
    console.error(err);
}
