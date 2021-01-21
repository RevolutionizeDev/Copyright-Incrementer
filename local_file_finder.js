import fs from 'fs';

const ACCEPTABLE_FILE_EXT = [".html", ".md", "LICENSE", ".txt", "LICENCE", "LISENSE"];

function walk(dir) {
  const matches = [];
  // lowercase file types
  // return an array of matching file names
  let list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = dir + "/" + file;
    let stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      matches = matches.concat(walk(file));
    } else {
      /* Is a file */
      matches.push(file);
    }
  });

  
  return matches;
}


if (process.argv.length === 0) {
  console.log("Give me a file path, mother fucker. This is RevDev, not Google. #spluckfree");
  process.exit(1);
}


walk(process.argv[1]);

/*
input: 
output: 
rules: 
  - 
Explicit requirements:
  -
Implicit requirements:
  - 
*/
