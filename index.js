const fs = require("fs");
const util = require("util"); //* might not need this one
const inquirer = require("inquirer");

    const writeFileAsync = util.promisify(fs.writeFile);


function generateLicense(license) {
return `![license](https://img.shields.io/badge/license-${license}-blue.svg)`
}

function generateReadMe(answers){
    return `# ${answers.title} 
${generateLicense(answers.license)}
## Table of Contents 

* [Description](#description)
*  [Installation Instructions](#installation-instructions)
*  [Usage Instructions](#usage-instructions)
*  [Contributing](#contributing)
*  [Test Instructions](#test-instructions)
*  [License](#license)
*  [Have Questions?](#have-questions)

## Description
${answers.description}

## Installation Instructions
    ${answers.installation}

## Usage Instructions
    ${answers.usage}

## Contributing
    ${answers.contribution}

## Test Instructions
    ${answers.tests}

## License
    ${answers.license}

## Have Questions? 
    Contact me!
    GitHub username: ${answers.github}
    Email: ${answers.email}
    `
}

// function to initialize program
function init() {

    inquirer.prompt([
        {
        message: "What is your project title?",
        name: "title",
        default: "project"
      },
      {
          message: "Write a description of your project:",
          name: "description"
      },
      {
          message: "What commands need to be ran to install your project?",
          name: "installation",
          default: "npm i"
      },
      {
          message: "Write any information needed for usage:",
          name: "usage"
      },
      {
        message: "Write contribution guidelines:",
        name: "contribution"
      },
      {
        message: "What commands need to be ran to test your project?",
        name: "tests",
        default: "npm test"
      },
      {
          message: "Choose a type of license",
          type: "rawlist",
          choices: ["MIT", "GNU GPLv3", "Apache License 2.0", "ISC"],
          default: "no license",
          name: "license"
      },
      {
        message: "What is your github username?",
        name: "github"
      },
      {
        message: "What is your email address?",
        name: "email"
      }]
      ).then((responses)=> {
          writeFileAsync(responses.title + ".md", generateReadMe(responses));
      })
}

// function call to initialize program
init();


