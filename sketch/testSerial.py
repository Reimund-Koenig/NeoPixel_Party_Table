import serial
import time
 
s = serial.Serial('/dev/ttyACM0', 9600) # Namen ggf. anpassen
s.flushInput()

if s.isOpen():
    print("Port is already open")
    s.close()
    print("Port closed")
s.open()
print("Port opened")
time.sleep(5) # der Arduino resettet nach einer Seriellen Verbindung, daher muss kurz gewartet werden
 
counter = 0
color = 0
r = 255
g = 0
b = 0
print("Start counting")
try:
    print("-----------------------------------------------")
    print("-----------------------------------------------")
    while True:
        if color == 0:
            r=255
            g=0
            b=0
        elif color == 1:
            r=0
            g=255
            b=0
        elif color == 2:
            r=0
            g=0
            b=255
        color = (color + 1) % 3
        out = (str(counter) + "," + str(r) + "," + str(g) + "," + str(b) + ",")
        s.write((out + "\n").encode())
        # print("output: " + out)
        
        # myData = s.readline()
        # print("input: " + str(myData))
        # print("-----------------------------------------------")
        time.sleep(0.04)
        counter+=1
        counter = counter % 225
except KeyboardInterrupt:
    s.close()
