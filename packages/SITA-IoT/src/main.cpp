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

SHT1x sht1x(dataPin, clockPin, SHT1x::Voltage::DC_3_3v);
AsyncWebServer server(80);
StaticJsonDocument<250> jsonDocument;
char buffer[250];
float temperature, humidity;

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

void sensor_data(float temperature, float humidity) {
  jsonDocument.clear();
  jsonDocument["temperature"] = temperature;
  jsonDocument["humidity"] = humidity;
  serializeJson(jsonDocument, buffer);
}

void getEnv(AsyncWebServerRequest *request) {
  temperature = sht1x.readTemperatureC();
  humidity = sht1x.readHumidity();
  sensor_data(temperature, humidity);
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
  connectToWiFi();
  setup_routes();
}

void loop() {
}