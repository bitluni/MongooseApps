load('api_gpio.js');
load('api_mqtt.js');
load('api_timer.js');


let pin = 2; //Wemos pin D4
let topic = 'home/switch0';
let state = 0;
let invert = true;

GPIO.set_mode(pin, GPIO.MODE_OUTPUT);
GPIO.write(pin, invert?state^1:state);

function received(conn, topic, msg)
{
	state = JSON.parse(msg);
	GPIO.write(pin, invert?state^1:state);
}

let subbed = false;
MQTT.setEventHandler(function(conn, ev, edata) 
	{
		if(ev === MQTT.EV_CONNACK)	//connection to MQTT established
		{
				if(subbed) return;	//check if already subbed
				print('Connected first time -> sub');
				MQTT.sub(topic, received);
				subbed = true;
		}
	}, null);

print('Waiting for mqtt to connect...');