import inquirer from 'inquirer';
import * as fs from 'node:fs';
import qr from 'qr-image';

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: "input",
        name: "url",
        message: "Enter the url:"
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.url;
    fs.writeFile("input.txt", url, (err) => {
        if (err) throw (err);
        console.log("URL saved in text file");
    })
    let qr_png = qr.image(url, {type: "png"});
    qr_png.pipe(fs.createWriteStream("qr_png.png"));
    
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("some error occured in rendering");
    } else {
      // Something else went wrong
      console.log("something went wrong");
    }
  });

