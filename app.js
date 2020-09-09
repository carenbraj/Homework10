const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const teamMembers = []

function createTeam() {

    inquirer
        .prompt([

            {
                type: "list",
                name: "memberChoice",
                message: "What type of team member are you?",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                    "No more employees"
                ]
            }

        ]).then(userResponse => {
            // pass in the variable
            switch (userResponse.memberChoice) {
                // in case userResponse
                case "Manager":
                    addManager();
                    break;

                case "Engineer":
                    addEngineer();
                    break;

                case "Intern":
                    addIntern();
                    break;

                case "No more employees":
                    render(teamMembers);
                    break

            }
        })


    function addManager() {

        inquirer
            .prompt([

                {
                    type: "input",
                    message: "What is your first name?",
                    name: "managerName"
                },

                {
                    type: "input",
                    message: "What is your employee ID?",
                    name: "managerID"
                },

                {
                    type: "input",
                    message: "What is your email?",
                    name: "managerEmail"
                },

                {
                    type: "input",
                    message: "What is your office number?",
                    name: "managerOfficeNumber"
                }

            ]).then(userResponse => {
                console.log(userResponse);

                const manager = new Manager(userResponse.managerName, userResponse.managerID, userResponse.managerEmail, userResponse.managerOfficeNumber)

                teamMembers.push(manager)

                createTeam();

            })


    }


    function addEngineer() {
        inquirer
            .prompt([

                {
                    type: "input",
                    message: "What is your first name?",
                    name: "engineerName"
                },

                {
                    type: "input",
                    message: "What is your employee ID?",
                    name: "engineerID"
                },

                {
                    type: "input",
                    message: "What is your email?",
                    name: "engineerEmail"
                },

                {
                    type: "input",
                    message: "What is your GitHub username?",
                    name: "gitHubUsername"
                }
            ]).then(userResponse => {
                console.log(userResponse);

                const engineer = new Engineer(userResponse.engineerName, userResponse.engineerID, userResponse.engineerEmail, userResponse.gitHubUsername)

                teamMembers.push(engineer)

                createTeam();

            })
    }




    function addIntern() {

        inquirer
            .prompt([

                {
                    type: "input",
                    message: "What is your first name?",
                    name: "internName"
                },

                {
                    type: "input",
                    message: "What is your employee ID?",
                    name: "internID"
                },

                {
                    type: "input",
                    message: "What is your email?",
                    name: "internEmail"
                },

                {
                    type: "input",
                    message: "What is your school?",
                    name: "internSchool"
                }
            ]).then(userResponse => {
                console.log(userResponse);

                const intern = new Intern(userResponse.internName, userResponse.internID, userResponse.internEmail, userResponse.internSchool)

                teamMembers.push(intern)

                createTeam();
            })
    }
    function buildTeam() {
        // write team members to a html file
        fs.writeFileSync(outputPath, mainHTML(teamMembers), 'utf-8');
      }
}


createTeam();