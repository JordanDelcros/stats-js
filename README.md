stats.js
========

#### JavaScript Performance Monitor ####

This class is a rework of the original `stats.js` from mrdoob.

It use a single canvas unlike the original that use DOM elements.

So, it provides a simple info box that will help you monitor your code performance.

* **FPS** Frames rendered in the last second. The higher the number the better.
* **MS** Milliseconds needed to render a frame. The lower the number the better.
* **MB** MBytes of allocated memory. (Run Chrome with `--enable-precise-memory-info`)


### Screenshots ###

![fps.png](https://cdn.rawgit.com/JordanDelcros/stats-js/master/assets/screenshot-fps.png)
![ms.png](https://rawgit.com/JordanDelcros/stats-js/master/assets/screenshot-ms.png)
![mb.png](https://rawgit.com/JordanDelcros/stats-js/master/assets/screenshot-mb.png)


### Usage ###

`Stats([realTime]);`

```javascript
var stats = new Stats(false);

document.body.appendChild(stats.DOMElement););

function update() {

  window.requestAnimationFrame(update);

	stats.start();

	// monitored code goes here

	stats.end();

};

window.requestAnimationFrame(update);
```
