Architektur:

controller  -----> app_mgr <------- <application_1>  -------> viewcontroller ------> view
              /                \                          /                     \
conrtoller ---                   --- <application_2>  ---                         ---> serial (view)
               


Add new Application:
    - copy template.js (inside application folder) and rename it to <NEW_APP_NAME>.js
    - add your <NEW_APP_NAME>.js to "app_mgr.js"


ToDo:
    - switch joystick mode "flow/fix"
    - use second joystick as button