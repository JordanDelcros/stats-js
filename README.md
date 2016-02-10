[![npm version](https://badge.fury.io/js/%40jordandelcros%2Fstats-js.svg)](https://www.npmjs.com/package/@jordandelcros/stats-js)

# stats.js #

#### JavaScript Performance Monitor ####

This class is a rework of the original `stats.js` from mrdoob.

It use a single canvas unlike the original that use DOM elements.

So, it provides a simple info box that will help you monitor your code performance.

* **FPS** Frames rendered in the last second. The higher the number the better.
* **MS** Milliseconds needed to render a frame. The lower the number the better.
* **MB** MBytes of allocated memory. (Run Chrome with `--enable-precise-memory-info`)
* **PING** Milliseconds needed to ask request something to the server. The lower the number the better.
* **CUSTOM** Check any object : stats.addCustom(name,object,attribute)


### Screenshots ###

![fps.png](https://rawgit.com/JordanDelcros/stats-js/master/assets/screenshot-fps.png)
![ms.png](https://rawgit.com/JordanDelcros/stats-js/master/assets/screenshot-ms.png)
![mb.png](https://rawgit.com/JordanDelcros/stats-js/master/assets/screenshot-mb.png)
![ping.png](https://rawgit.com/JordanDelcros/stats-js/master/assets/screenshot-ping.png)

### NPM ###

```bash
	npm install @jordandelcros/stats-js
```

### Usage ###

`Stats([realTime]);`

```javascript
var stats = new Stats(false);

document.body.appendChild(stats.domElement););

function update() {

  window.requestAnimationFrame(update);

	stats.begin();

	// monitored code goes here

	stats.end();

};

window.requestAnimationFrame(update);
```

`addCustom(name,object,attribute)`

Monitor any numerical value, nothing more to do!

```javascript
// Size of an array
stats.addCustom('ArrayLength',array,'length')

// Any numerical variable
stats.addCustom('Players',server,'playerCount')

// Threejs values
stats.addCustom('DrawCall',renderer.info.render,'calls')
stats.addCustom('Faces',renderer.info.render,'faces')
stats.addCustom('Points',renderer.info.render,'points')
stats.addCustom('Vertices',renderer.info.render,'vertices')
stats.addCustom('Geometries',renderer.info.memory,'geometries')
stats.addCustom('Textures',renderer.info.memory,'textures')
```

to get the **PING** you need to call special methods into server's requests:

```javascript
// ...

function fakeServerRequest(){

	// Call on server request send
	stats.beginPing();

	// Fake server latency
	setTimeout(function(){

		// Call on server request response
		stats.endPing();
		fakeServerRequest();

	}, 65);

};

fakeServerRequest();

// ...
```
