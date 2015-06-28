arcChart.js
========

arcChart.js is a JavaScript plugin that uses jQuery's animate function to render an animated arc with incrementing value inside a HTML5 canvas. It requires jQuery and jQueryUI in order to function. Please view the [demo of arcChart.js](http://bludino.github.io/arcChart/) to see it in action.

Cross-browser support includes IE9+, Firefox, Chrome, Safari and Opera (if you need to support IE8, arcChart-ie8.js is bundled*)

**To support IE8 you will also need to include Modernizr and excanvas (bundled). See IE8 demo below*

Example Usage
--------

This is the bare minimum you need to use arcChart.js

```html
    <!DOCTYPE html>
    <html>
        <head></head>
        <body>
            <div id="canvas"></div>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
            <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
            <script src="arcChart.min.js"></script>
            <script>
                arcChart('canvas', 100);
            </script>
        </body>
    </html>
```

The function *arcChart* requires two parameters: the id of the div you want to target and the number you want to animate to (from 0). How far the arc travels around the number is determined by the value set as the maximum value (maxVal). By default maxVal is set to 100, so in this instance the arc will form a complete circle upon finishing its animation (100 out of 100). Changing the value in the second parameter to '50' will draw only half an arc (50 out of 100).

### The Options Parameter


The *arcChart* function also supports a third, optional parameter - options. The function with options is called as demonstrated below:

```js
    arcChart('canvas', 27.62, {
        color: '#99E8C0',
        decimalPlaces: 2,
        duration: 7500,
        glow: true,
        maxVal: 50,
        textPrefix: "£"
    });
```

There are numerous options that you can configure. The following list demonstrates all the configurables:

```js
    // Set options and default values for function
    var options = $.extend({
        arcRadius: 70,             // Set radius of arc
        canvasHeight: 180,         // Set height of canvas
        canvasWidth: 180,          // Set width of canvas
        color: '#AAA',             // Alter colour of text and arc
        decimalPlaces: 0,          // Alter number of decimal places
        duration: 2500,            // Alter duration of animation
        easing: 'easeOutQuart',    // Alter easing of animation { see http://jqueryui.com/easing/ for options }
        fontBold: true,            // Set text weight to bold { true || false }
        fontFamily: 'Arial',       // Alter typeface of text
        fontSize: 'auto',          // Alter text size { 'auto' adjusts size based on length of value. Include units if not auto - e.g. 2em, 15px }
        glow: false,               // Add glow effect to arc { true || false }
        glowSpread: 10,        	   // Alter size of glow effect blur if glow = true
        lineCap: 'square',         // Alter end shape of arc { square || round }
        lineWidth: 8,              // Alter thickness of arc
        maxVal: 100,               // The value that would represent 100% completion of the arc
        numSeparator: true,        // Set whether number separators are displayed between each '000' { true || false }
        textPrefix: '',            // Add a prefix to the text { e.g. £ }
        textSuffix: ''             // Add a suffix to the text { e.g. % }
    }, setOptions);
```

Example Usage - IE8
--------

To display the canvas in IE8, arcChart.js needs a little help. This comes in the form of Modernizr and excanvas, both of which are bundled with this plugin. Include references to these within the &lt;head&gt; tags of your html when building your page.

You will also need to switch the version of *arcChart.js* to *arcChart-ie8.js* and ensure that you are using a version of jQuery that supports IE8 (version 1.xx.x) . *arcChart-ie8.js* works in much the same way as the original, adding extra functionality to allow IE8 to render the canvas.

Due to buggy performance when attempting to animate on a HTML5 canvas in browsers that don't natively support it, the animation effect is removed for IE8, instead displaying the final value and final position of the arc. Any browsers that do support canvas natively will render the animation as normal when using *arcChart-ie8.js*.

```html
    <!DOCTYPE html>
    <html>
        <head>
            <script type="text/javascript" src="modernizr.js"></script>
            <script type="text/javascript" src="excanvas.compiled.js"></script>
        </head>
        <body>
            <div id="canvas"></div>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
            <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
            <script src="arcChart-ie8.min.js"></script>
            <script>
                arcChart('canvas', 100);
            </script>
        </body>
    </html>
```

From my admittedly limited testing in the older versions of IE, this seems to display correctly all the way down to IE5.5 (should you ever feel the need to time-travel back to the year 2000).

License
-----

This plugin is released under the [BSD License](http://opensource.org/licenses/BSD-3-Clause).