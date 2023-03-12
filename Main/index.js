// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database




// Display a prompt to the user
const { prompt } = require("inquirer");
const { default: Choices } = require("inquirer/lib/objects/choices");
const db = require("./db");
// Displays data in a table
require("console.table");

const art = require("asciiart-logo");


init();



function init() {
    const teamTrackArt = art({ name: "TeamTrack" }).render();
  
    console.log(teamTrackArt);
  
    displayChoices();
}




//// Displays menu to the user.
function displayChoices() {
    prompt([

        {
            type: "list",
            name: "choice",
            message: "Welcome to the TEAMTRACK ! Manage a company's employee database",
            choices: [
                {
                    name: "View All Departments",
                    value: "viewAllDepartments"
                },
                {
                    name: "View All Roles",
                    value: "viewRoles"
                },
                {
                    name: "View All Employees",
                    value: "viewAllEmployees"
                },
                {
                    name: "Add Department",
                    value: "addDepartment"
                },
                {
                    name: "Add Role",
                    value: "addRole"
                },
                {
                    name: "Add Employee",
                    value: "addEmployee"
                },
                {
                    name: "Update Employee Role",
                    value: "updateRole"
                },
                {
                    name: "View All Employees By Department",
                    value: "ViewEmployeeByDepartment"
                },
                {
                    name: "View All Employees By Manager",
                    value: "viewEmployeeByManager"
                },
                {
                    name: "Delete Employee",
                    value: "DeleteEmployee"
                },
                {
                    name: "Delete Department",
                    value: "DeleteDepartment"
                },
                {
                    name: "Delete Role",
                    value: "DeleteRole"
                },
                {
                    name: "Quit",
                    value: "Quit"
                }
            ]
        }
    ]).then(res => {
        // Assigns the user's selection'choice'
        let choice = res.choice;
        // switch statment that calls functions based on the users choice
        switch (choice) {
            case "viewAllDepartments":
                viewDepartments();
                break;
            case "viewRoles":
                viewRoles();
                break;
            case "viewAllEmployees":
                viewEmployees();
                break;
            case "addDepartment":
                addDepartment();
                break;
            case "addRole":
                addRole();
                break;
            case "addEmployee":
                addEmployee();
                break;
            case "updateRole":
                updateEmployeeRole();
                break;
            case "ViewEmployeeByDepartment":
                viewEmployeesByDepartment();
                break;
            case "viewEmployeeByManager":
                viewEmployeesByManager();
                break;
            case "DeleteEmployee":
                removeEmployee();
                break;
            case "DeleteDepartment":
                removeDepartment();
                break;
            case "DeleteRole":
                removeRole();
                break;
            default:
                quit();
        }
    })
}


//==========================================================

//              VIEW ALL DEPARTMENTS

//==========================================================


function viewDepartments() {
    db.findAllDepartments() // Retrieve all the departments from the database.
        .then(([rows]) => { //  Destructure the result 
            let departments = rows; // Store the results in a let
            console.log("\n"); // Adds a new line
            console.table(departments); // Display the department data
        })
        .then(() => displayChoices()); // Displays menu to the user.
}

//==========================================================

//                  VIEW ALL ROLES

//==========================================================


function viewRoles() {
    db.findAllRoles() // Retrieve all ROLES from the database.
        .then(([rows]) => { //  Destructure the result 
            let roles = rows;   // Store the results in a let
            console.log("\n");  // Adds a new line
            console.table(roles); // Display the Role data
        })
        .then(() => displayChoices()); // Displays menu to the user.
}

//==========================================================

//                  VIEW ALL EMPLOYEES

//==========================================================


function viewEmployees() {
    db.findAllEmployees() // Retrieve all EMPLOYEES from the database.
        .then(([rows]) => { // Destructure the result 
            let employees = rows; // Store the results in a let
            console.log("\n"); // Adds a new line
            console.table(employees); // Display the Employees data
        })
        .then(() => displayChoices()); // Displays menu to the user.
}


//==========================================================

//                   ADD DEPARTMENT

//==========================================================



function addDepartment() {
    prompt([ // Displays a message & Accepts user input.
        {
            name: "name",
            message: "What is the name of the department?"
        }
    ])
        .then(res => { 
            let name = res; // Input is stored in name
            db.createDepartment(name) // Adds new department to the database.
                .then(() => console.log(`Added ${name.name} to the database`)) // Will display the results on the console
                .then(() => displayChoices()) //Displays menu to the user.
        })
}


//==========================================================

//                       ADD ROLE

//==========================================================


function addRole() {
    db.findAllDepartments() // Retrieve all Departments from the database.
        .then(([rows]) => { //Destructure the result
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({ // New array object with the id and name properties.
                name: name,
                value: id
            }));
  
            prompt([ // Displays a message & Accepts user input.
                {
                    name: "title",
                    message: "What is the name of the role?"
                },
                {
                    name: "salary",
                    message: "What is the salary of the role?"
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Which department does the role belong to?",
                    choices: departmentChoices
                }
            ])
                .then(role => {
                    db.createRole(role) // Add new role to the database 
                        .then(() => console.log(`Added ${role.title} to the database`)) // console logs the result
                        .then(() => displayChoices()) //Displays menu to the user.
                })
        })
}


//==========================================================

//                   ADD EMPLOYEE

//==========================================================

function addEmployee() {
    prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the employee's last name?"
        }
    ])
        .then(res => {
            let firstName = res.first_name; // Input is stored in firstname varible
            let lastName = res.last_name; // Input is stored in lasttname varible
  
            db.findAllRoles() // Retrieve roles in the database
                .then(([rows]) => { // Destructure the result
                    let roles = rows; 
                    const roleChoices = roles.map(({ id, title }) => ({ // mapping to create a new Array
                        name: title, // name property = role title
                        value: id   //  value property = role ID.
                    }));
  
                    prompt({ //Displays a message & Accepts user input.
                        type: "list",
                        name: "roleId",
                        message: "What is the employee's role?",
                        choices: roleChoices
                    })
                        .then(res => {
                            let roleId = res.roleId; // results of User input
  
                            db.findAllEmployees()
                                .then(([rows]) => {
                                        let employees = rows;
                                        const managerChoices = employees.map(({ id, first_name, last_name }) => ({ //mapping to create a new Array from the Input
                                            name: `${first_name} ${last_name}`,
                                            value: id
                                        }));
                                        // adds a "None" option with a null value to the beginning of the array of choices
                                    managerChoices.unshift({ name: "None", value: null });
    
                                    prompt({ ////Displays a message & Accepts user input.
                                        type: "list",
                                        name: "managerId",
                                        message: "Who is the employee's manager?",
                                        choices: managerChoices
                                    })
                                        .then(res => { // Employee object is created with Manager ID, Role ID, first name, and last name properties.
                                            let employee = {
                                                manager_id: res.managerId,
                                                role_id: roleId,
                                                first_name: firstName,
                                                last_name: lastName
                                            }
    
                                            db.createEmployee(employee); //Add new Employee to Database
                                        })
                                        .then(() => console.log( //success message is logged to the console
                                            `Added ${firstName} ${lastName} to the database`
                                        ))
                                        .then(() => displayChoices()) //Displays menu to the user.
                                })
                        })
                })
        })
}


//==========================================================

//                  UPDATE EMPLOYEE

//==========================================================

function updateEmployeeRole() {
    db.findAllEmployees() // Retrieve Employees in the database
        .then(([rows]) => {  // Destructure the result
            let employees = rows;
            // Maps the employee data to a new array of objects 
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({ 
                name: `${first_name} ${last_name}`, // Employee's full name as a string  
                value: id // ID as a value. 
            }));
  
            prompt([ //Displays a message & Accepts user input.
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee's role do you want to update?",
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employeeId = res.employeeId;
                    db.findAllRoles() // Retrieve roles in the database
                        .then(([rows]) => {  // Destructure the result
                            let roles = rows;
                            // Creates array of role choices with each choice
                            const roleChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }));
  
                            prompt([ //Displays a message & Accepts user input.
                                {
                                    type: "list",
                                    name: "roleId",
                                    message: "Which role do you want to assign?",
                                    choices: roleChoices
                                }
                            ])  // Update employee role in Database.
                                .then(res => db.updateEmployeeRole(employeeId, res.roleId)) 
                                .then(() => console.log("Updated employee's role"))
                                .then(() => displayChoices()) //Displays menu to the user.
                        });
                });
        })
}


//==========================================================

//              VIEW EMPLOYEE BY DEPARTMENT

//==========================================================

function viewEmployeesByDepartment() {
    db.findAllDepartments() // Retrieve Departments in the database
        .then(([rows]) => { // Destructure the result
            let departments = rows; // rows is assigned to the departments variable
            const departmentChoices = departments.map(({ id, name }) => ({ //create a new array
                name: name,
                value: id
            }));
  
            prompt([
                {
                    type: "list",
                    name: "departmentId",
                    message: "Which department would you like?",
                    choices: departmentChoices
                }
            ])  // Department ID is used to get all employees in that department.
                .then(res => db.findAllEmployeesByDepartment(res.departmentId))
                .then(([rows]) => { // Destructure the result
                    let employees = rows; 
                    console.log("\n");  // Adds a new line
                    console.table(employees); // Display the Employee data
                })
                .then(() => displayChoices()) //Displays menu to the user.
        });
}


//==========================================================

//               VEIW EMPLOYEE BY MANAGER

//==========================================================


function viewEmployeesByManager() {
    db.findAllEmployees() // Retrieve Employees in the database
        .then(([rows]) => { // Destructures it into an array called "rows"
            let managers = rows; // array to a new variable named managers
            const managerChoices = managers.map(({ id, first_name, last_name }) => ({ // new array of objects with each manager's name and ID
                name: `${first_name} ${last_name}`,
                value: id
            }));
  
            prompt([
                {
                    type: "list",
                    name: "managerId",
                    message: "Which employee do you want to see direct reports for?",
                    choices: managerChoices
                }
            ])  // object using the manager ID selected by the user
                .then(res => db.findAllEmployeesByManager(res.managerId))
                .then(([rows]) => { // destructures it into an array called "rows"
                    let employees = rows; //  new variable named "employees"
                    console.log("\n");
                    if (employees.length === 0) { // Checks if there are any employees that report to the manager
                        console.log("The selected employee has no manager."); // console log if they have no manager.
                    } else {
                        console.table(employees);// Display Employee 
                    }
                })
                .then(() => displayChoices()) // Displays menu to the user
        });
}












//==========================================================

//                 DELETE EMPLOYEE

//==========================================================

function removeEmployee() {
    db.findAllEmployees() // Retrieve Employees in the database
        .then(([rows]) => { // Destructure the result
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({ //create a new array
                name: `${first_name} ${last_name}`,
                value: id
            }));
  
            prompt([
                {
                    type: "list",
                    name: "employeeId",
                     message: "Which employee do you want to remove?",
                    choices: employeeChoices
                }
            ])  // user input as an argument to remove employee from the database.
                .then(res => db.removeEmployee(res.employeeId))
                .then(() => console.log("Removed employee from the database")) 
                .then(() => displayChoices()) //Displays menu to the user.
        })
}

//==========================================================

//              DELETE DEPARTMENT

//==========================================================

// Removes a department from the database.
function removeDepartment() {
    db.findAllDepartments() // Returns departments in Database
        .then(([rows]) => {  // Destructure the result
            let departments = rows; // stored in let departments
            // Creates new array of objects with the name and value properties.
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));
  
            prompt({
                type: "list",
                name: "departmentId",
                message: "Which department would you like to remove?",
                choices: departmentChoices
            })  // User input to remove a department from the database
                .then(res => db.removeDepartment(res.departmentId))
                .then(() => console.log(`Removed department from the database`)) // console log the results
                .then(() => displayChoices()) //Displays menu to the user.
        })
}


//==========================================================

//              DELETE Role

//==========================================================

function removeRole() {
    db.findAllRoles() // Returns Roles in Database
        .then(([rows]) => { // Destructure the result
            let roles = rows; // stored in let roles
            // Array of choice objects where each choice object has a name and a value property.
            const roleChoices = roles.map(({ id, title }) => ({
                 name: title,
                value: id
            }));
  
            prompt([
                {
                    type: "list",
                    name: "roleId",
                    message: "Which role do you want to remove?",
                    choices: roleChoices
                }
            ])  // removing the role that the user has selected from the database
                .then(res => db.removeRole(res.roleId)) 
                .then(() => console.log("Removed role from the database")) // console log the results
                .then(() => displayChoices())  //Displays menu to the user.
        })
}


//==========================================================

//                      QUIT APP

//==========================================================

function quit() {
    console.log("Thank you for using TeamTrack!")
    process.exit();
}