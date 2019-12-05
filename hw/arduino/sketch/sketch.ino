#include <Adafruit_NeoPixel.h>
#include <Adafruit_GFX.h>
#include <Adafruit_NeoMatrix.h>
#ifdef __AVR__
 #include <avr/power.h> // Required for 16 MHz Adafruit Trinket

#endif

#define LED_PIN    2
#define LED_COUNT (256)
#define SERIAL_SPEED 921600
#define SLEEP_TIME_TILL_SHOW_MS 500
#define BRIGHTNESS_PERCENT 100

byte cmd[1];
byte c[4];int x;int red;int green;int blue;unsigned long ms;unsigned long msc;
int cnt=32;
//Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);
Adafruit_NeoMatrix strip = Adafruit_NeoMatrix(16, 16, 3,1,D1,
  NEO_MATRIX_TOP     + NEO_MATRIX_LEFT +
  NEO_MATRIX_COLUMNS + NEO_MATRIX_ZIGZAG,
  NEO_GRB            + NEO_KHZ800);

void setup() {

  //strip.setPixelColor(6,255,0,0);         //  Set pixel's color (in RAM)
  //strip.show();
  //strip.setBrightness(BRIGHTNESS_PERCENT); // Set BRIGHTNESS to about 1/5 (max = 255)
  x = red = green = blue = 0;
  ms = millis() + SLEEP_TIME_TILL_SHOW_MS;
  //strip.setPixelColor(7,255,0,0);         //  Set pixel's color (in RAM)
  //strip.show();
  Serial.begin(SERIAL_SPEED); // opens serial port, sets data rate to 9600 bps
  //strip.setPixelColor(8,255,0,0);         //  Set pixel's color (in RAM)
  //strip.show();
  while (!Serial); // wait for serial port to connect. Needed for native USB port only
  strip.begin();           // INITIALIZE NeoPixel strip object (REQUIRED)
  //strip.setPixelColor(9,255,0,0);         //  Set pixel's color (in RAM)
  //strip.show();
}

void loop() {
   //  Serial.println("Hurz");
   while(Serial.available() > 0) {
      Serial.readBytes(cmd,1);
   //  Serial.println(cmd[0], HEX);
       if((int)cmd[0] == 1) {
        while (Serial.available() < 4);
        Serial.readBytes(c, 4);
        x = (int)c[0]; red = (int)c[1]; green = (int)c[2]; blue = (int)c[3];
        strip.setPixelColor(x,red,green,blue); // RAM
      } else if ((int)cmd[0] == 2) {
       // if((cnt++)%2) 
        strip.show();
      } else if ((int)cmd[0] == 3) {
        // load complete matrix
        int COLORS = LED_COUNT*3;
        byte c[COLORS];
        Serial.readBytes(c, COLORS);
        int i=0;
        int idx=0;
        while(i<LED_COUNT) {
          strip.setPixelColor(i,(int)c[idx++],(int)c[idx++],(int)c[idx++]); // RAM
          i++;
        }
      
     
      } else {
//           strip.setPixelColor(cnt++,255,0,0);         //  Set pixel's color (in RAM)
//            strip.show();
 
      }
      
      
  } //delay(1000);
}