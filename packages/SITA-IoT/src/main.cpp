#include <Arduino.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include <AsyncJson.h>
#include <SHT1x-ESP.h>

#define SSID "please"
#define PWD "trialnetwork"
#define dataPin 15
#define clockPin 2
#define RE 32
#define DE 33

SHT1x sht1x(dataPin, clockPin, SHT1x::Voltage::DC_3_3v);
AsyncWebServer server(80);
StaticJsonDocument<250> jsonDocument;
char buffer[250];
float temperature, humidity;
const byte nitro[] = {0x01, 0x03, 0x00, 0x1e, 0x00, 0x01, 0xe4, 0x0c};
const byte phos[] = {0x01, 0x03, 0x00, 0x1f, 0x00, 0x01, 0xb5, 0xcc};
const byte pota[] = {0x01, 0x03, 0x00, 0x20, 0x00, 0x01, 0x85, 0xc0};
byte values[11];
byte nitrogen, phosphorus, potassium;

void connectToWiFi() {
  Serial.print("Connecting to: ");
  Serial.print(SSID);
  WiFi.begin(SSID, PWD);

  while(WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(200);
  }

  Serial.print("Connected with IP: ");
  Serial.print(WiFi.localIP());
}

void hello_json(AsyncWebServerRequest *request) {
  jsonDocument.clear();
  jsonDocument["hello"]="world";
  serializeJson(jsonDocument, buffer);
  request->send(200, "application/json", buffer);
}

void sensor_data(float temperature, float humidity, byte nitrogen, byte phosphorus, byte potassium) {
  jsonDocument.clear();
  jsonDocument["temperature"] = temperature;
  jsonDocument["humidity"] = humidity;
  jsonDocument["nitrogen"] = nitrogen;
  jsonDocument["phosphorus"] = phosphorus;
  jsonDocument["potassium"] = potassium;
  serializeJson(jsonDocument, buffer);
}

byte readSensor(const byte *query, uint8_t querySize) {
  Serial2.flush();
  digitalWrite(DE, HIGH);
  digitalWrite(RE, HIGH);
  delay(1);
  
  for (uint8_t i = 0; i < querySize; i++) {
    Serial2.write(query[i]);
  }
  
  Serial2.flush();
  digitalWrite(DE, LOW);
  digitalWrite(RE, LOW);
  delay(500);

  byte index = 0;
  while (Serial2.available()) {
    values[index++] = Serial2.read();
    delay(10);
  }
  return values[4];
}


void getEnv(AsyncWebServerRequest *request) {
  temperature = sht1x.readTemperatureC();
  humidity = sht1x.readHumidity();
  nitrogen = readSensor(nitro, sizeof(nitro));
  phosphorus = readSensor(phos, sizeof(phos));
  potassium = readSensor(pota, sizeof(pota));
  sensor_data(temperature, humidity, nitrogen, phosphorus, potassium);
  request->send(200, "application/json", buffer);
}

void setup_routes() {
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, "application/json", "{\"message\":\"Welcome\"}");
  });
  server.on("/hello", HTTP_GET, hello_json);
  server.on("/env", HTTP_GET, getEnv);
  server.begin();
}

void setup() {
  Serial.begin(9600);
  Serial2.begin(9600, SERIAL_8N1, 16, 17);
  pinMode(RE, OUTPUT);
  pinMode(DE, OUTPUT);
  digitalWrite(DE, LOW);
  digitalWrite(RE, LOW);
  connectToWiFi();
  setup_routes();
}

void loop() {
}