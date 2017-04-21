**Note: This Project created by using angular 4 (Frontend) & PHP(Backend).**

## Environment:
* Nodejs 6.x LTS
* PHP 7.x
* Mysql 5.6.x

## Environment preparation
* install angular/cli  
`npm install -g @angular/cli`

## Front End
#### Basic angular cli   
* `ng serve`
* `ng build `
* `ng build --aot --prod` (recommend) 

Go to Angular/cli  [https://github.com/angular/angular-cli](https://github.com/angular/angular-cli) for more information 

#### Start front end  
Go to folder `ng4 frontend`, then use command-line in the `ng4frontend` to type `ng serve` or `ng s`.

#### Build front end  for distribution 
Go to folder `ng4 frontend`, then use command-line in the `ng4frontend` to type `ng build --aot --prod`.
The `@angular/cli` will generate a `dist` folder for the production application.

E.g Build the Front End to `/neutrino/ng4frontend/dist/?`
 the command is `ng build --aot --prod --base-href /neutrino/ng4frontend/dist/`  
See here : [https://github.com/angular/angular-cli/wiki/build](https://github.com/angular/angular-cli/wiki/build)

#### Change call backend API:

Open `ng4frontend\src\app\app-config.ts`:  


* At Line `86` `apiEndpoint` for host IP/Domain and port number.
* At `apiPath` for the PHP index path. 

E.g : If the path of the PHP backend URL is `http://127.0.0.1:8080/neutrino/backEndAPI/index.php`, then the `apiEndpoint` must be `http://127.0.0.1:8080` and the `apiPath` should be `/neutrino/backEndAPI/index.php`.  

**Check the `/` !**

#### services
* Services are located at `ng4frontend\src\app\shared`. 

* Any thing about OKRs system that will be located at `ng4frontend\src\app\main\okr\okr-shared\services`

#### Classes
* Classes are located `ng4frontend\src\app\shared\classes`.

* Any thing about OKRs system that will be located at `ng4frontend\src\app\main\okr\okr-shared\classes`

## Database
* database name : `okrs`
* the `neutrino\database\okrs.sql` is the structure of the database.
* the `neutrino\database\okrs_new_fk_with_dummy.sql` is the the database dummy data & database structure.


## PHP

Change `neutrino\backEndAPI\application\config\database.php` for mysql database IP/domain, username and password.