(function( self ){

	var Stats = function( realTime ){

		if( this instanceof Stats ){

			return Stats.methods.initialize(realTime);

		}
		else {

			return new Stats(realTime);

		};

	};

	var SIZE = {
		WIDTH: 80,
		HEIGHT: 50,
		FRAMES: {
			WIDTH: 74,
			HEIGHT: 32,
			X: 3,
			Y: 15
		},
		TEXT: {
			X: 4,
			Y: 10
		}
	};

	var MODES = {
		FPS: 0,
		MS: 1,
		MB: 2
	};

	Stats.methods = {
		initialize: function( realTime ){

			this.mode = MODES.MS;

			this.realTime = realTime || false;

			this.frameTime = 0;
			this.startTime = 0;
			this.endTime = 0;

			this.fps = {
				value: 0,
				current: 0,
				min: 0,
				max: 0,
				array: new Array(SIZE.FRAMES.WIDTH)
			};

			this.ms = {
				value: 0,
				current: 0,
				min: 0,
				max: 0,
				array: new Array(SIZE.FRAMES.WIDTH)
			};

			this.mb = {
				value: 0,
				current: 0,
				min: 0,
				max: 0,
				array: new Array(SIZE.FRAMES.WIDTH)
			};

			this.DOMElement = document.createElement("canvas");

			this.DOMElement.width = SIZE.WIDTH;
			this.DOMElement.height = SIZE.HEIGHT;

			this.context = this.DOMElement.getContext("2d");

			this.context.imageSmoothingEnabled = this.context.mozImageSmoothingEnabled = this.context.oImageSmoothingEnabled = this.context.webkitImageSmoothingEnabled = this.context.msImageSmoothingEnabled = false;
			this.context.font = "bold 8px sans-serif";

			console.log(this);

			return this;

		},
		start: function(){

			var now = window.performance.now();

			this.startTime = now;

		},
		end: function(){

			var now = window.performance.now();

			this.endTime = now;

			this.fps.current++;

			if( this.fps.current < this.fps.min ){

				this.fps.min = this.fps.current;

			}
			else if( this.fps.current > this.fps.max ){

				this.fps.max = this.fps.current;

			};

			this.ms.current = (this.endTime - this.startTime).toFixed(1);

			if( this.ms.current < this.ms.min ){

				this.ms.min = this.ms.current;

			}
			else if( this.ms.current > this.ms.max ){

				this.ms.max = this.ms.current;

			};

			if( (now - this.frameTime) > 1000 ){

				this.frameTime = now;

				this.fps.value = this.fps.current;
				this.ms.value = this.ms.current;

				for( var index = 0, length = SIZE.FRAMES.WIDTH; index < length; index++ ){

					this.fps.array[index] = this.fps.array[index + 1];
					this.ms.array[index] = this.ms.array[index + 1];

				};

				this.fps.array[this.fps.array.length - 1] = this.fps.value;
				this.ms.array[this.ms.array.length - 1] = this.ms.value;

				this.fps.current = 0;

			};

			if( this.realTime == true ){

				this.fps.value = this.fps.current;

				this.fps.array[this.fps.array.length - 1] = this.fps.value;

			};

			this.update();

		},
		update: function(){

			this.context.clearRect(0, 0, SIZE.WIDTH, SIZE.HEIGHT);

			if( this.mode == MODES.FPS ){

				this.context.fillStyle = "#1A1A38";
				this.context.fillRect(0, 0, SIZE.WIDTH, SIZE.HEIGHT);

				this.context.fillStyle = "#1B314C";
				this.context.fillRect(3, 15, SIZE.FRAMES.WIDTH, SIZE.FRAMES.HEIGHT);

				this.context.fillStyle = "#1AFFFF";
				if( this.realTime == true ){

					this.context.fillText(this.fps.current + " FPS (" + this.fps.min + "-" + this.fps.max + ")", 4, 10);

				}
				else {

					this.context.fillText(this.fps.value + " FPS (" + this.fps.min + "-" + this.fps.max + ")", 4, 10);

				};

				for( var line = 0, length = this.fps.array.length; line < length; line++ ){

					var height = (this.fps.array[line] / this.fps.max) * SIZE.FRAMES.HEIGHT;

					var x = SIZE.FRAMES.X + line;
					var y = (SIZE.FRAMES.Y + SIZE.FRAMES.HEIGHT) - height;

					this.context.fillRect(x, y, 1, height);

				};

			}
			else if( this.mode == MODES.MS ){

				this.context.fillStyle = "#1A381A";
				this.context.fillRect(0, 0, SIZE.WIDTH, SIZE.HEIGHT);

				this.context.fillStyle = "#1B4C1B";
				this.context.fillRect(SIZE.FRAMES.X, SIZE.FRAMES.Y, SIZE.FRAMES.WIDTH, SIZE.FRAMES.HEIGHT);

				this.context.fillStyle = "#1AFF1A";
				this.context.fillText(this.ms.current + " MS (" + this.ms.min + "-" + this.ms.max + ")", SIZE.TEXT.X, SIZE.TEXT.Y);

			};

		}
	};

	Stats.methods.initialize.prototype = Stats.methods;

	if( typeof define !== "undefined" && define instanceof Function && define.amd != undefined ){

		define(function(){

			return Stats;

		});

	}
	else if( typeof module !== "undefined" && module.exports ){

		module.exports = Stats;

	}
	else if( self != undefined ){

		self.Stats = Stats;

	};

})(this || {});