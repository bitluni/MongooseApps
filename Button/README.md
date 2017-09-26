# Smalles WiFi Button in the world

## Overview

This is the app for the smalles WiFi button in the world. The
corresponding video can be found here:
https://youtu.be/ImVK5cGVrpQ
The button bublishes either on MQTT or call a web link.

have fun
 - luni

## How to install this app

- Install and start [mos tool](https://mongoose-os.com/software.html)
- Switch to the Project page, find and import this app, build and flash it

## Configuration

- In the [mos tool](https://mongoose-os.com/software.html) go to device configuration
- Set your MQTT Server
- In the init.js the requestUrl can be used to let the button call a link
- change the topic or feedName in the init.js if you like to use another MQTT topic.
