/*
 * arcChart.js
 *
 * Copyright (c) 2015 Philip Dootson and Andrew Berry
 * licensed under BSD license.
 *
 * http://bludino.github.io/arcChart/
 *
 * Version: 0.1.0
 */

function arcChart(divID, val, setOptions)
{
	// Set options and default values for function
	var options = $.extend({
		arcRadius: 70,			// Set radius of arc
		canvasHeight: 180,		// Set height of canvas
		canvasWidth: 180,		// Set width of canvas
		color: '#AAA',			// Alter colour of text and arc
		decimalPlaces: 0,		// Alter number of decimal places
		duration: 2500,			// Alter duration of animation
		easing: 'easeOutQuart',	// Alter easing of animation { see http://jqueryui.com/easing/ for options }
		fontBold: true,			// Set text weight to bold { true || false }
		fontFamily: 'Arial',	// Alter typeface of text
		fontSize: 'auto',		// Alter text size { 'auto' adjusts size based on length of value. Include units if not auto - e.g. 2em, 15px }
		glow: false,			// Add glow effect to arc { true || false }
		glowSpread: 10,			// Alter size of glow effect blur if glow = true
		lineCap: 'square',		// Alter end shape of arc { square || round }
		lineWidth: 8,			// Alter thickness of arc
		maxVal: 100,			// The value that would represent 100% completion of the arc
		numSeparator: true,		// Set whether number separators are displayed between each '000' { true || false }
		textPrefix: '',			// Add a prefix to the text { e.g. £ }
		textSuffix: ''			// Add a suffix to the text { e.g. % }
	}, setOptions);

	// Check browser for canvas support
	var canvasTest = $('html').hasClass('canvas');

	// Create canvas within supplied div
	var hostDiv = document.getElementById(divID);
	var canvas = document.createElement('canvas');
	canvas.setAttribute('width', options.canvasWidth);
	canvas.setAttribute('height', options.canvasHeight);
	hostDiv.appendChild(canvas);

	if (canvasTest == false) { canvas = G_vmlCanvasManager.initElement(canvas); } 
	var context = canvas.getContext('2d');
	var circ = Math.PI * 2;
	var quart = Math.PI / 2;
	var x = canvas.width / 2;
	var y = canvas.height / 2;

	// Setup for arc
	context.lineCap = options.lineCap;
	context.lineWidth = options.lineWidth;
	context.strokeStyle = options.color;

	// Setup for text
	context.font =
			(options.fontBold ? 'bold ' : '') +
			(options.fontSize == 'auto' ? autoTextSize().toString() + 'em ' : options.fontSize + ' ') +
			("'" + options.fontFamily + "'");
	context.fillStyle = options.color;
	context.textAlign = 'center';
	context.textBaseline = 'middle';

	// If browser supports canvas animate number from zero to supplied value, along with arc
	if (canvasTest == true)
	{
		$({someValue: 0}).animate({someValue: val}, {
		    duration: options.duration,
		    easing: options.easing,
		    step: function() {
		        drawCanvas(this.someValue.toFixed(options.decimalPlaces), this.someValue / options.maxVal);
		    },
		    complete:function(){
		        drawCanvas(this.someValue.toFixed(options.decimalPlaces), this.someValue / options.maxVal);
		    }
		});
	}
	else
	{
		// Draw final value without the animation, using switch to rectify bug caused when utilising excanvas
		var ratio = val / options.maxVal;
		switch (ratio) {
			case 1:
				drawCanvas(val.toFixed(options.decimalPlaces), 0.9999);
				break;
			case 0:
				drawCanvas(val.toFixed(options.decimalPlaces), 0.0001);
				break;
			default:
				drawCanvas(val.toFixed(options.decimalPlaces), ratio);
		}
		
	}

	// Automatically calculate text size within arc
	function autoTextSize()
	{
		var inputChars = 
				options.maxVal.toString().length +
				options.textPrefix.length +
				options.textSuffix.length +
				(options.decimalPlaces > 0 ? options.decimalPlaces + 1 : 0);
		var displayChars = 
				(options.numSeparator ? commaSeparateNumber(options.maxVal).toString().length : options.maxVal.toString().length) +
				options.textPrefix.length +
				options.textSuffix.length +
				(options.decimalPlaces > 0 ? options.decimalPlaces + 1 : 0);
		var q = displayChars < 7 ? (0.06 + (inputChars * 0.02)) : 0.2;

		var textSize = (q * options.arcRadius) / displayChars;

		return textSize;
	}

	// Clear canvas, update text value and draw arc around the text
	function drawCanvas(val, current)
	{
		context.clearRect (0 , 0 , canvas.width, canvas.height);
	    context.fillText(options.textPrefix + (options.numSeparator ? commaSeparateNumber(val) : val) + options.textSuffix, x, y);

		context.beginPath();
		if (options.glow)
		{
			context.shadowBlur = options.glowSpread;
			context.shadowColor = options.color;
		}
		context.arc(x, y, options.arcRadius, -(quart), ((circ) * current) - quart, false);
		context.stroke();
		if (options.glow)
		{
			context.shadowBlur = 0;
		}
	}

	// Add comma separators for thousands, millions, etc.
	function commaSeparateNumber(val)
	{
	    while (/(\d+)(\d{3})/.test(val.toString())){
		    val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	    }

	    return val;
	}
}