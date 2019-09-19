#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
 #include <avr/power.h> // Required for 16 MHz Adafruit Trinket
#endif

#define LED_PIN    2
#define LED_COUNT 240
#define SERIAL_SPEED 115200
#define SLEEP_TIME_TILL_SHOW_MS 500
#define BRIGHTNESS_PERCENT 100

byte cmd[1];
byte c[4];int x;int red;int green;int blue;unsigned long ms;unsigned long msc;

Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  #if defined(__AVR_ATtiny85__) && (F_CPU == 16000000)
    clock_prescale_set(clock_div_1);
  #endif
  strip.begin();           // INITIALIZE NeoPixel strip object (REQUIRED)
  strip.setPixelColor(5,255,0,0);         //  Set pixel's color (in RAM)
  strip.show();
  strip.setBrightness(BRIGHTNESS_PERCENT); // Set BRIGHTNESS to about 1/5 (max = 255)
  x = red = green = blue = 0;
  ms = millis() + SLEEP_TIME_TILL_SHOW_MS;
  Serial.begin(SERIAL_SPEED); // opens serial port, sets data rate to 9600 bps
  while (!Serial); // wait for serial port to connect. Needed for native USB port only
}

void loop() {
  if (Serial.available() > 0) {
      Serial.readBytes(cmd,1);
      if((int)cmd[0] == 1) {
        while (Serial.available() < 4);
        Serial.readBytes(c, 4);
        x = (int)c[0]; red = (int)c[1]; green = (int)c[2]; blue = (int)c[3];
        strip.setPixelColor(x,red,green,blue); // RAM
      } else if ((int)cmd[0] == 2) {
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
      }
  } 
}
