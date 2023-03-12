-- Use the "employees" database
use employees;
-- seeds four departments into the "department" table
INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');





-- seed roles into table, with their department IDs
INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 120000, 1),
    ('Salesperson', 100000, 1),
    ('Lead Engineer', 250000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 145000, 3),
    ('Legal Team Lead', 260000, 4),
    ('Lawyer', 290000, 4);






-- employees into table with their role and manager IDs
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Christian', 'Plasencia', 1, NULL),
    ('Marissa', 'Soriano', 2, 1),
    ('Carter', 'Lopez', 3, NULL),
    ('Kevin', 'Chow', 4, 3),
    ('justin', 'Medina', 5, NULL),
    ('Sam', 'Brown', 6, 5),
    ('Robert', 'Rincon', 7, NULL),
    ('Erick', 'Pinto', 8, 7);
