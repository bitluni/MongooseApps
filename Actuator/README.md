# MQTT Actuator

## Overview

This is the app for the smalles WiFi button in the world. The
corresponding video can be found here:
https://youtu.be/ImVK5cGVrpQ
A servo signal wire is connected to D1 pin (gipio 5) of a WeMos microcontroller and
moves on a received MQTT message.

have fun
 - luni

## How to install this app

- Install and start [mos tool](https://mongoose-os.com/software.html)
- Switch to the Project page, find and import this app, build and flash it

## Configuration

- In the [mos tool](https://mongoose-os.com/software.html) go to device configuration
- Set your MQTT Server
- change the topic or feedName in the init.js if you like to use another MQTT topic.