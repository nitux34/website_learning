# WEBSITE
This repo has a front end built with angular and bootstrap. It also has a back end storing files using node framework express.

## SETUP:
* Install Node.js: https://nodejs.org/en/download/
* Run "npm install" to install all dependencies
* Setup a mysql database and add a file with information about it as below
Add file back-end/config/global_variables.js and store the following information:
\
module.exports = {\
    basePath: 'D:/.../back-end/website_content/',\
    db_password: 'password',\
    db_name: "website_db",\
    db_root_user: "root_user",\
    db_host: "localhost"\
}
