# FrontEndAngular2

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.30.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Current dependency


```
                             _                           _  _
  __ _  _ __    __ _  _   _ | |  __ _  _ __         ___ | |(_)
 / _` || '_ \  / _` || | | || | / _` || '__|_____  / __|| || |
| (_| || | | || (_| || |_| || || (_| || |  |_____|| (__ | || |
 \__,_||_| |_| \__, | \__,_||_| \__,_||_|          \___||_||_|
               |___/
@angular/cli: 1.0.0-beta.30
node: 6.9.5
os: darwin x64
@angular/common: 2.4.7
@angular/compiler: 2.4.7
@angular/core: 2.4.7
@angular/forms: 2.4.7
@angular/http: 2.4.7
@angular/platform-browser: 2.4.7
@angular/platform-browser-dynamic: 2.4.7
@angular/router: 3.4.7
@angular/cli: 1.0.0-beta.30
@angular/compiler-cli: 2.4.7
@ngtools/webpack: 1.2.4

```




```
{
  "name": "front-end-angular2",
  "version": "0.0.0",
  "license": "MIT",
  "angular-cli": {},
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "test": "ng test",
    "pree2e": "webdriver-manager update --standalone false --gecko false",
    "e2e": "protractor"
  },
  "private": true,
  "dependencies": {
    "@angular/common": "^2.3.1",
    "@angular/compiler": "^2.3.1",
    "@angular/core": "^2.3.1",
    "@angular/forms": "^2.3.1",
    "@angular/http": "^2.3.1",
    "@angular/platform-browser": "^2.3.1",
    "@angular/platform-browser-dynamic": "^2.3.1",
    "@angular/router": "^3.3.1",
    "@ng-bootstrap/ng-bootstrap": "^1.0.0-alpha.20",
    "@ngtools/webpack": "^1.2.4",
    "@types/jquery": "^2.0.40",
    "angular2-datepicker": "^1.0.4",
    "angular2-material-datepicker": "^0.5.0",
    "angular2-modal": "^2.0.3",
    "angular2-moment": "^1.1.0",
    "bootstrap": "^3.3.7",
    "bootstrap-datepicker": "^1.6.4",
    "bootstrap-timepicker": "^0.5.2",
    "chart.js": "^2.4.0",
    "core-js": "^2.4.1",
    "mydatepicker": "^1.6.3",
    "mydaterangepicker": "^1.3.2",
    "ng2-bootstrap": "^1.3.2",
    "ng2-bs3-modal": "^0.10.4",
    "ng2-charts": "^1.5.0",
    "ng2-cli-sweetalert2": "0.0.4",
    "ng2-datepicker": "^1.4.10",
    "ng2-datetime": "^1.2.2",
    "ng2-toastr": "^1.4.1",
    "ng2-toasty": "^2.3.1",
    "primeng": "^2.0.0-rc.3",
    "rxjs": "^5.0.1",
    "sweetalert2": "^6.3.8",
    "ts-helpers": "^1.1.1",
    "zone.js": "^0.7.2"
  },
  "devDependencies": {
    "@angular/cli": "1.0.0-beta.30",
    "@angular/compiler-cli": "^2.3.1",
    "@types/jasmine": "2.5.38",
    "@types/node": "^6.0.42",
    "codelyzer": "~2.0.0-beta.1",
    "jasmine-core": "2.5.2",
    "jasmine-spec-reporter": "2.5.0",
    "karma": "1.2.0",
    "karma-chrome-launcher": "^2.0.0",
    "karma-cli": "^1.0.1",
    "karma-jasmine": "^1.0.2",
    "karma-remap-istanbul": "^0.2.1",
    "protractor": "~4.0.13",
    "ts-node": "1.2.1",
    "tslint": "^4.3.0",
    "typescript": "~2.0.3"
  }
}

```




## Knowing Issues
##### This project has to use `webpack 1.2.4` especially, this project has the version conflict by using `lazy router loader`
 
To solve this problem, simply by install the `webpack 1.2.4` will solve the problem.

`npm install @ngtools/webpack@1.2.4`



## Technical Detail

* Angular 2 Lazy Load router 

