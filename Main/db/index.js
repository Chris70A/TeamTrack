const connection = require("./connection");

class database {
// Takes the connection parameter and sets it as a property instantiated object.
    constructor(connection) {
        this.connection = connection;
    }

    // Retrieve all department IDs and names from the department table
    findAllDepartments() {
        return this.connection.promise().query("SELECT department.id, department.name FROM department;");
    }


    // Joins the role table with the department
    // Displays id, title, name and salary columns for each row in 
    findAllRoles() {
        return this.connection.promise().query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;");
    }


    // Retrieves all employees with corresponding role, department, salary, and manager information.
    findAllEmployees() { // LEFT JOIN queries between the employee, role, and department tables
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );

    }
    // Adding a new department to the database
    createDepartment(department) { //  SQL INSERT statement with the provided department
        return this.connection.promise().query(
            "INSERT INTO department SET ?", department
        );
    }

    // Adding a new Role to the Role table 
    createRole(role) {
        return this.connection.promise().query(
            "INSERT INTO role SET ?", role
        );
    }

    // Adding a new Employee to the Employee table
    createEmployee(employee) {
        return this.connection.promise().query(
            "INSERT INTO employee SET ?", employee
        
        );
    }

    // Updating Employees Role
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
          "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]
        );
    }



    
    //Joining the employee, role, and department tables, and filtering by thedepartment ID.
    findAllEmployeesByDepartment(departmentId) {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;", departmentId
        );
    }


    findAllEmployeesByManager(managerId) {
        return this.connection.promise().query(
          "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;", managerId
        );
    }

    // Deletes employee from database based on ID.
    removeEmployee(employeeId) {
        return this.connection.promise().query(
          "DELETE FROM employee WHERE id = ?", employeeId
        );
    }



    // Deletes department from database based on ID
    removeDepartment(departmentId) {
        return this.connection.promise().query(
          "DELETE FROM department WHERE id = ?", departmentId
        );
    }


    // Deletes role from database based on ID.
    removeRole(roleId) {
        return this.connection.promise().query(
            "DELETE FROM role WHERE id = ?", roleId
        );
    }

}

module.exports = new database(connection);