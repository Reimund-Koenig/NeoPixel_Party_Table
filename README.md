# Table

## Run it the first time

* cd ~/your/workspace/table
* sudo apt install npm
* npm install
* npm audit fix // optional if new vulnerabilities occured

## Architecture

controller  -----> app_mgr <------- <application_1>  -------> viewcontroller ------> view
              /                \                          /                     \
conrtoller ---                   --- <application_2>  ---                         ---> serial (view)

## Add new Application

    - go into folder "apps", copy folder template and rename it to your appname
    - open ./server/controller/app_mgr.js
    - search for "template" and copy all occurences of template
    - rename the copies to <NEW_APP_NAME>

## ToDo

    - switch joystick mode "flow/fix"
