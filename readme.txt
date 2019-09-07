Architektur:

controller  -----> app_mgr <------- <application_1>  -------> viewcontroller ------> view
              /                \                          /                     \
conrtoller ---                   --- <application_2>  ---                         ---> serial (view)
               


Add new Application:
    - go into folder "apps", copy template.js and rename it to <NEW_APP_NAME>.js
    - go into folder "model" and add <NEW_APP_NAME>.js inside "app_mgr.js" by searching for "template"


ToDo:
    - switch joystick mode "flow/fix"
    - use second joystick as button