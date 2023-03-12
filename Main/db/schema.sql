-- Delete employees Database 
DROP DATABASE IF EXISTS employees;
-- Create Employees Database
CREATE DATABASE employees;
-- Select employees Database
USE employees;

CREATE TABLE department ( -- Create table named deparment
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, -- Create a unique ID and is set as the primary key
    name VARCHAR(30) UNIQUE NOT NULL -- Name of department, max length 30 characters, unique and cannot be left empty.
);

CREATE TABLE role (-- Create table named role
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, -- Create a unique ID and is set as the primary key
    title VARCHAR(30) UNIQUE NOT NULL, -- title of the role, max length 30 characters, unique and cannot be NULL
    salary DECIMAL UNSIGNED NOT NULL, -- Salary of the role, non-negative decimal number and cannot be NULL
    department_id INT UNSIGNED NOT NULL, -- Department ID that the role belongs to, non-negative integer and cannot be NULL
    INDEX dep_ind (department_id), -- Index on the department_id 
    -- Create a constraint that links department_id to the department table and allows cascading deletes.
    CONSTRAINT foreignKeyDepartment FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee ( -- Create table named employee
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, -- Create a unique ID
    first_name VARCHAR(30) NOT NULL, --  employee first name
    last_name VARCHAR(30) NOT NULL, -- employee last name
    role_id INT UNSIGNED NOT NULL, -- role ID that the employee holds
    INDEX role_ind (role_id), -- Create index for role ID 
    -- Foreign key constraint for role_id referencing valid role ID in role table and cascading delete operations from role to employee table.
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INT UNSIGNED, -- Manager ID of the employee
    INDEX man_ind (manager_id), -- Index for the manager ID 
    -- Create a constraint that links the manager_id in the employee table to the id column in the same table and sets to NULL employee is deleted
    CONSTRAINT foreignKeymanager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
