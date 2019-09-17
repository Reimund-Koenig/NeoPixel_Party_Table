#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
 #include <avr/power.h> // Required for 16 MHz Adafruit Trinket
#endif
#define LED_PIN    3
#define LED_COUNT 240
int x;
int red;
int green;
int blue;
unsigned long ms;

Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  #if defined(__AVR_ATtiny85__) && (F_CPU == 16000000)
    clock_prescale_set(clock_div_1);
  #endif
  strip.begin();           // INITIALIZE NeoPixel strip object (REQUIRED)
  strip.show();            // Turn OFF all pixels ASAP
  strip.setBrightness(50); // Set BRIGHTNESS to about 1/5 (max = 255)
  // Serial.setTimeout(10);
  x = red = green = blue = 0;
  ms = millis() + 100;
  Serial.begin(9600); // opens serial port, sets data rate to 9600 bps
  while (!Serial); // wait for serial port to connect. Needed for native USB port only
  strip.setPixelColor(5, strip.Color(255,0,0));         //  Set pixel's color (in RAM)
}

byte c[4];
void loop() {
  // delay(1);
  if (Serial.available() >= 4) {
      // Serial.println("A " + String(Serial.available()));
      Serial.readBytes(c, 4);
      // Serial.println("L " + String(Serial.available()));
      x = (int)c[0];
      red = (int)c[1];
      green = (int)c[2];
      blue = (int)c[3];
      Serial.println(String(x) + "," + String(red) + "," + String(green) +"," + String(blue));
      // strip.setPixelColor(x, strip.Color(red,green,blue));         //  Set pixel's color (in RAM)
  }
  unsigned long msc = millis();
  if(msc>ms) {
      strip.show();
      ms = msc + 100;
  }
}
