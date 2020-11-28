const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const api = require('./utils/api.js');
const generateMarkdown = require('./utils/generateMarkdown.js');

// array of questions for user
const questions = [
    {
        type: 'input',
        message: "What is your GitHub username? (No @ needed)",
        name: 'username',
        default: 'awarmath',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Please enter a valid GitHub username");
            }
            return true;
        }
    },
      {
        type: 'input',
        message: "What is the title of your project?",
        name: 'title',
        default: 'Title',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Please enter a valid project title");
            }
            return true;
        }
    },
      {
        type: 'input',
        message: "Write a description of your project.",
        name: 'description'
      },
      {
        type: 'input',
        message: "Describe the steps required to install your project for the Installation section.",
        name: "installation"
      },
      {
        type: 'input',
        message: "Provide instructions and examples of your project in use for the Usage section.",
        name: 'usage'
      },
      {
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license'
      },
      {
        type: 'input',
        message: "If applicable, provide guidelines on how other developers can contribute to your project.",
        name: 'contributing'
      },
      {
        type: 'input',
        message: "If applicable, provide any tests written for your application and provide examples on how to run them.",
        name: 'tests'
      },
];

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }

        console.log("Success! Your README.md file has been generated")
    });
}

const writeFileAsync = util.promisify(writeToFile);


// function to initialize program
async function init() {
    const userResponses = await inquirer.prompt(questions);
    console.log("Your responses: ", userResponses);
    console.log("Thank you for your responses! Fetching your GitHub data.");
    const userInfo = await api.apiCalls.getUser(userResponses);

    const userInfo = await api.getUser(userResponses);
    console.log("userInfo: ", userInfo);

    const markdown = await generateMarkdown(userResponses, userInfo);
    console.log(markdown);

    await writeFileAsync('ExampleREADME.md', markdown);
}

// function call to initialize program
init();
