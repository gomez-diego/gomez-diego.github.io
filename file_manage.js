const dir = ['images/logos/', 'images/illustrations/', 'images/albumcovers/'];
const fs = require('fs');
var illustrations = {}
var logos = {}
var albumcovers = {}

dir.forEach(directory => {
    var index = 0;
    try{
        fs.readdirSync(directory).forEach(file => {
            var attributes = new Object();
            attributes["image"] = directory + file;
            if (directory == 'images/logos/')
                logos[index] = attributes;
            else if (directory == 'images/illustrations/')
                illustrations[index] = attributes;
            else
                albumcovers[index] = attributes;
            index++;
        });
        console.log(directory," : complete.");
    } catch (err) {
        console.error(err);
    }
});

illustrations = JSON.stringify(illustrations);
logos = JSON.stringify(logos);
albumcovers = JSON.stringify(albumcovers);

try {
    fs.writeFileSync('scripts/files.js', 'var illustrations=' + illustrations + '\nvar logos=' + logos + '\nvar albumcovers=' + albumcovers);
    console.log('scripts/files.js'," : File Created.");
} catch (err) {
    console.error(err);
}
