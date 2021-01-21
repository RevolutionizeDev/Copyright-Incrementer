import fs from 'fs';

const ACCEPTABLE_FILE_EXT = [".html", ".md", "LICENSE", ".txt", "LICENCE", "LISENSE"];

function walk(dir) {
  const matches = [];
  console.log({dir});
  let list = fs.readdirSync(dir);
  let file;

  for (let i = 0; i < list.length; i++) {
    file = dir + "/" + list[i];
    let stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      matches = matches.concat(walk(file));
    } else {
      /* Is a file */
      matches.push(file);
    }
  }

  return matches;
}

if (process.argv.length < 3) {
  console.log("Give me a file path, mother fucker. This is RevDev, not Google. #spluckfree");
  process.exit(1);
}

walk(process.argv[2]);
