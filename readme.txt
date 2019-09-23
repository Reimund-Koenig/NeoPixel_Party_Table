Architektur:

controller  -----> app_mgr <------- <application_1>  -------> viewcontroller ------> view
              /                \                          /                     \
conrtoller ---                   --- <application_2>  ---                         ---> serial (view)
               

Add new Application:
    - go into folder "apps", copy folder template and rename it to your appname
    - go into folder "model" and add <NEW_APP_NAME>.js inside "app_mgr.js" by searching for "template"


ToDo:
    - switch joystick mode "flow/fix"