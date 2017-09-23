load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_timer.js');

let led = Cfg.get('pins.led');
let topicStartTime = 'PingPong/startTime';
let topicState = 'PingPong/state';
let startTime = "0";
let me = "ping";
let playDelay = 1000;

// Get ready to blink built-in
GPIO.set_mode(led, GPIO.MODE_OUTPUT);

function receivedStartTime(conn, topic, msg)
{
	let t = JSON.parse(msg);
	if(t === startTime) return;
	print('I am pong');
	me = "pong";
	GPIO.write(led, 0);
	Timer.set(playDelay, false, action, null);
}

function receivedState(conn, topic, msg)
{
	let s = JSON.parse(msg);
	if(s === me) return;
	print('got ' + s);
	GPIO.write(led, 0);
	Timer.set(1000, false, action, null);
}

function action()
{
	print('sending ' + me);
	MQTT.pub(topicState, JSON.stringify(me), 1);
}

let subbed = false;
MQTT.setEventHandler(function(conn, ev, edata) 
	{
		if(ev === MQTT.EV_CONNACK)	//connection to MQTT established
		{
				if(subbed) return;	//check if already subbed
				print('Connected first time -> subbing');
				MQTT.sub(topicStartTime, receivedStartTime);	//sub to startTime
				MQTT.sub(topicState, receivedState);	//sub to state
				//workaround to SUBACK
				Timer.set(3000, false, function(){
					startTime = Timer.now();
					print('Starting game');
					MQTT.pub(topicStartTime, JSON.stringify(startTime), 1);
					action();
				}, null);	//start in few seconds
				subbed = true;
		}
		if(ev === MQTT.EV_PUBACK)	//pub acknowledge ... toggle led again
			GPIO.write(led, 1);
	}, null);

print('Waiting for mqtt to connect...');