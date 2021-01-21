import fs from 'fs';

const ACCEPTABLE_FILE_EXT = [".html", ".md", "LICENSE", ".txt", "LICENCE", "LISENSE"];

function walk(dir) {
  let matches = [];
  // console.log({dir});
  let list = fs.readdirSync(dir);
  let file;

  for (let i = 0; i < list.length; i++) {
    file = dir + "/" + list[i];
    let stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      matches = matches.concat(walk(file));
    } else if (ACCEPTABLE_FILE_EXT.some(ext => file.endsWith(ext))) {
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


function updateOutdatedFiles(files) {
  // spit out list of files with old copyright notices
  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    const body = fs.readFileSync(fileName).toString();
    // TODO: Make this check more sophisticated
    const newBody = body.replace(/copyright 2020/gi, "Copyright 2021");

    if (body === newBody) {
      continue;
    }

    // const newBody = body.replace("Copyright 2020", "Copyright 2021");
    fs.writeFileSync(fileName, newBody, {mode: 0o644});
  }
}

updateOutdatedFiles(walk(process.argv[2]));
