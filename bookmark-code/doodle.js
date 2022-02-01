////////// 00-head.js ////////////////

/*jslint bitwise:false */
function activateGoggles() {
jQuery.noConflict();

(function($){ // <- hm, maybe not the best way of passing jquery in
  if (window.goggles && window.goggles.active) {
    window.goggles.stop(); window.goggles = null; return;
  }

////////// 10-utility.js ////////////////

// Utility functions
function bind(bindee, action) {
  return function() {
    return action.apply(bindee, Array.prototype.slice.call(arguments));
  };
}

function pointsFromEv(ev) {
  // given an event object, return the point's XY coordinates relative to
  // the screen
  if ('clientX' in ev) { // Firefox
    return [ev.clientX, ev.clientY];
  } else if ('offsetX' in ev) { // Opera
    return [ev.offsetX, ev.offsetY];
  }
}

////////// 15-jscolor.js ////////////////

/**
 * jscolor, JavaScript Color Picker
 *
 * @version 1.4.0
 * @license GNU Lesser General Public License, http://www.gnu.org/copyleft/lesser.html
 * @author	Jan Odvarko, http://odvarko.cz
 * @created 2008-06-15
 * @updated 2012-07-06
 * @link	http://jscolor.com
 */

var jscolor = {

	dir : window.GOGGLE_SERVER+'/../img/', // location of jscolor directory (leave empty to autodetect)

	getDir : function() {
		return jscolor.dir;
	},

	images : {
		pad : [ 181, 101 ],
		sld : [ 16, 101 ],
		cross : [ 15, 15 ],
		arrow : [ 7, 11 ]
	},


	imgRequire : {},
	imgLoaded : {},

	requireImage : function(filename) {
		jscolor.imgRequire[filename] = true;
	},


	loadImage : function(filename) {
		if(!jscolor.imgLoaded[filename]) {
			jscolor.imgLoaded[filename] = new Image();
			jscolor.imgLoaded[filename].src = jscolor.getDir()+filename;
		}
	},


	fetchElement : function(mixed) {
		return typeof mixed === 'string' ? document.getElementById(mixed) : mixed;
	},


	addEvent : function(el, evnt, func) {
		if(el.addEventListener) {
			el.addEventListener(evnt, func, false);
		} else if(el.attachEvent) {
			el.attachEvent('on'+evnt, func);
		}
	},


	fireEvent : function(el, evnt) {
		if(!el) {
			return;
		}
		if(document.createEvent) {
			var ev = document.createEvent('HTMLEvents');
			ev.initEvent(evnt, true, true);
			el.dispatchEvent(ev);
		} else if(document.createEventObject) {
			var ev = document.createEventObject();
			el.fireEvent('on'+evnt, ev);
		} else if(el['on'+evnt]) { // alternatively use the traditional event model (IE5)
			el['on'+evnt]();
		}
	},


	getElementPos : function(e) {
		var e1=e, e2=e;
		var x=0, y=0;
		if(e1.offsetParent) {
			do {
				x += e1.offsetLeft;
				y += e1.offsetTop;
			} while(e1 = e1.offsetParent);
		}
		while((e2 = e2.parentNode) && e2.nodeName.toUpperCase() !== 'BODY') {
			x -= e2.scrollLeft;
			y -= e2.scrollTop;
		}
		return [x, y];
	},


	getElementSize : function(e) {
		return [e.offsetWidth, e.offsetHeight];
	},


	getRelMousePos : function(e) {
		var x = 0, y = 0;
		if (!e) { e = window.event; }
		if (typeof e.offsetX === 'number') {
			x = e.offsetX;
			y = e.offsetY;
		} else if (typeof e.layerX === 'number') {
			x = e.layerX;
			y = e.layerY;
		}
		return { x: x, y: y };
	},


	getViewPos : function() {
		if(typeof window.pageYOffset === 'number') {
			return [window.pageXOffset, window.pageYOffset];
		} else if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
			return [document.body.scrollLeft, document.body.scrollTop];
		} else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
			return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
		} else {
			return [0, 0];
		}
	},


	getViewSize : function() {
		if(typeof window.innerWidth === 'number') {
			return [window.innerWidth, window.innerHeight];
		} else if(document.body && (document.body.clientWidth || document.body.clientHeight)) {
			return [document.body.clientWidth, document.body.clientHeight];
		} else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
			return [document.documentElement.clientWidth, document.documentElement.clientHeight];
		} else {
			return [0, 0];
		}
	},


	/*
	 * Usage example:
	 * var myColor = new jscolor.color(myInputElement)
	 */

	color : function(target, prop) {


		this.required = true; // refuse empty values?
		this.adjust = true; // adjust value to uniform notation?
		this.hash = true; // prefix color with # symbol?
		this.caps = true; // uppercase?
		this.slider = true; // show the value/saturation slider?
		this.valueElement = target; // value holder
		this.styleElement = target; // where to reflect current color
		this.onImmediateChange = null; // onchange callback (can be either string or function)
		this.hsv = [0, 0, 1]; // read-only	0-6, 0-1, 0-1
		this.rgb = [1, 1, 1]; // read-only	0-1, 0-1, 0-1
		this.minH = 0; // read-only	 0-6
		this.maxH = 6; // read-only	 0-6
		this.minS = 0; // read-only	 0-1
		this.maxS = 1; // read-only	 0-1
		this.minV = 0; // read-only	 0-1
		this.maxV = 1; // read-only	 0-1

		this.pickerOnfocus = false; // display picker on focus?
		this.pickerMode = 'HSV'; // HSV | HVS
		this.pickerPosition = 'right'; // left | right | top | bottom
		this.pickerSmartPosition = true; // automatically adjust picker position when necessary
		this.pickerButtonHeight = 20; // px
		this.pickerClosable = false;
		this.pickerCloseText = 'Close';
		this.pickerButtonColor = 'ButtonText'; // px
		this.pickerFace = 10; // px
		this.pickerFaceColor = 'ThreeDFace'; // CSS color
		this.pickerBorder = 1; // px
		this.pickerBorderColor = 'ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight'; // CSS color
		this.pickerInset = 1; // px
		this.pickerInsetColor = 'ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow'; // CSS color
		this.pickerZIndex = 100001;


		for(var p in prop) {
			if(prop.hasOwnProperty(p)) {
				this[p] = prop[p];
			}
		}

		this.isVisible = function(){
		  return isPickerOwner();
		}

		this.hidePicker = function() {
			if(isPickerOwner()) {
				removePicker();
			}
		};


		this.showPicker = function() {
			if(!isPickerOwner()) {
				var tp = [0,32];//jscolor.getElementPos(target); // target pos
			    var ts = [32,32];//jscolor.getElementSize(target); // target size
				var vp = jscolor.getViewPos(); // view pos
				var vs = jscolor.getViewSize(); // view size
				var ps = getPickerDims(this); // picker size
				var a, b, c;
				switch(this.pickerPosition.toLowerCase()) {
					case 'left': a=1; b=0; c=-1; break;
					case 'right':a=1; b=0; c=1; break;
					case 'top':	 a=0; b=1; c=-1; break;
					default:	 a=0; b=1; c=1; break;
				}
				var l = (ts[b]+ps[b])/2;

				// picker pos
				if (!this.pickerSmartPosition) {
					var pp = [
						tp[a],
						tp[b]+ts[b]-l+l*c
					];
				} else {
					var pp = [
						-vp[a]+tp[a]+ps[a] > vs[a] ?
							(-vp[a]+tp[a]+ts[a]/2 > vs[a]/2 && tp[a]+ts[a]-ps[a] >= 0 ? tp[a]+ts[a]-ps[a] : tp[a]) :
							tp[a],
						-vp[b]+tp[b]+ts[b]+ps[b]-l+l*c > vs[b] ?
							(-vp[b]+tp[b]+ts[b]/2 > vs[b]/2 && tp[b]+ts[b]-l-l*c >= 0 ? tp[b]+ts[b]-l-l*c : tp[b]+ts[b]-l+l*c) :
							(tp[b]+ts[b]-l+l*c >= 0 ? tp[b]+ts[b]-l+l*c : tp[b]+ts[b]-l-l*c)
					];
				}
				drawPicker(pp[a], pp[b]);
			}
		};


		this.importColor = function() {
			if(!valueElement) {
				this.exportColor();
			} else {
				if(!this.adjust) {
					if(!this.fromString(valueElement.value, leaveValue)) {
						styleElement.style.backgroundImage = styleElement.jscStyle.backgroundImage;
						styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
						styleElement.style.color = styleElement.jscStyle.color;
						this.exportColor(leaveValue | leaveStyle);
					}
				} else if(!this.required && /^\s*$/.test(valueElement.value)) {
					valueElement.value = '';
					styleElement.style.backgroundImage = styleElement.jscStyle.backgroundImage;
					styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
					styleElement.style.color = styleElement.jscStyle.color;
					this.exportColor(leaveValue | leaveStyle);

				} else if(this.fromString(valueElement.value)) {
					// OK
				} else {
					this.exportColor();
				}
			}
		};


		this.exportColor = function(flags) {
			if(!(flags & leaveValue) && valueElement) {
				var value = this.toString();
				if(this.caps) { value = value.toUpperCase(); }
				if(this.hash) { value = '#'+value; }
				valueElement.value = value;
			}
			if(!(flags & leaveStyle) && styleElement) {
				styleElement.style.backgroundImage = "none";
				styleElement.style.backgroundColor =
					'#'+this.toString();
				styleElement.style.color =
					0.213 * this.rgb[0] +
					0.715 * this.rgb[1] +
					0.072 * this.rgb[2]
					< 0.5 ? '#FFF' : '#000';
			}
			if(!(flags & leavePad) && isPickerOwner()) {
				redrawPad();
			}
			if(!(flags & leaveSld) && isPickerOwner()) {
				redrawSld();
			}
		};


		this.fromHSV = function(h, s, v, flags) { // null = don't change
			if(h !== null) { h = Math.max(0.0, this.minH, Math.min(6.0, this.maxH, h)); }
			if(s !== null) { s = Math.max(0.0, this.minS, Math.min(1.0, this.maxS, s)); }
			if(v !== null) { v = Math.max(0.0, this.minV, Math.min(1.0, this.maxV, v)); }

			this.rgb = HSV_RGB(
				h===null ? this.hsv[0] : (this.hsv[0]=h),
				s===null ? this.hsv[1] : (this.hsv[1]=s),
				v===null ? this.hsv[2] : (this.hsv[2]=v)
			);

			this.exportColor(flags);
		};


		this.fromRGB = function(r, g, b, flags) { // null = don't change
			if(r !== null) { r = Math.max(0.0, Math.min(1.0, r)); }
			if(g !== null) { g = Math.max(0.0, Math.min(1.0, g)); }
			if(b !== null) { b = Math.max(0.0, Math.min(1.0, b)); }

			var hsv = RGB_HSV(
				r===null ? this.rgb[0] : r,
				g===null ? this.rgb[1] : g,
				b===null ? this.rgb[2] : b
			);
			if(hsv[0] !== null) {
				this.hsv[0] = Math.max(0.0, this.minH, Math.min(6.0, this.maxH, hsv[0]));
			}
			if(hsv[2] !== 0) {
				this.hsv[1] = hsv[1]===null ? null : Math.max(0.0, this.minS, Math.min(1.0, this.maxS, hsv[1]));
			}
			this.hsv[2] = hsv[2]===null ? null : Math.max(0.0, this.minV, Math.min(1.0, this.maxV, hsv[2]));

			// update RGB according to final HSV, as some values might be trimmed
			var rgb = HSV_RGB(this.hsv[0], this.hsv[1], this.hsv[2]);
			this.rgb[0] = rgb[0];
			this.rgb[1] = rgb[1];
			this.rgb[2] = rgb[2];

			this.exportColor(flags);
		};


		this.fromString = function(hex, flags) {
			var m = hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
			if(!m) {
				return false;
			} else {
				if(m[1].length === 6) { // 6-char notation
					this.fromRGB(
						parseInt(m[1].substr(0,2),16) / 255,
						parseInt(m[1].substr(2,2),16) / 255,
						parseInt(m[1].substr(4,2),16) / 255,
						flags
					);
				} else { // 3-char notation
					this.fromRGB(
						parseInt(m[1].charAt(0)+m[1].charAt(0),16) / 255,
						parseInt(m[1].charAt(1)+m[1].charAt(1),16) / 255,
						parseInt(m[1].charAt(2)+m[1].charAt(2),16) / 255,
						flags
					);
				}
				return true;
			}
		};


		this.toString = function() {
			return (
				(0x100 | Math.round(255*this.rgb[0])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[1])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[2])).toString(16).substr(1)
			);
		};


		function RGB_HSV(r, g, b) {
			var n = Math.min(Math.min(r,g),b);
			var v = Math.max(Math.max(r,g),b);
			var m = v - n;
			if(m === 0) { return [ null, 0, v ]; }
			var h = r===n ? 3+(b-g)/m : (g===n ? 5+(r-b)/m : 1+(g-r)/m);
			return [ h===6?0:h, m/v, v ];
		}


		function HSV_RGB(h, s, v) {
			if(h === null) { return [ v, v, v ]; }
			var i = Math.floor(h);
			var f = i%2 ? h-i : 1-(h-i);
			var m = v * (1 - s);
			var n = v * (1 - s*f);
			switch(i) {
				case 6:
				case 0: return [v,n,m];
				case 1: return [n,v,m];
				case 2: return [m,v,n];
				case 3: return [m,n,v];
				case 4: return [n,m,v];
				case 5: return [v,m,n];
			}
		}


		function removePicker() {
			delete jscolor.picker.owner;
			document.getElementsByTagName('body')[0].removeChild(jscolor.picker.boxB);
		}


		function drawPicker(x, y) {
			if(!jscolor.picker) {
				jscolor.picker = {
					box : document.createElement('div'),
					boxB : document.createElement('div'),
					pad : document.createElement('div'),
					padB : document.createElement('div'),
					padM : document.createElement('div'),
					sld : document.createElement('div'),
					sldB : document.createElement('div'),
					sldM : document.createElement('div'),
					btn : document.createElement('div'),
					btnS : document.createElement('span'),
					btnT : document.createTextNode(THIS.pickerCloseText)
				};
				for(var i=0,segSize=4; i<jscolor.images.sld[1]; i+=segSize) {
					var seg = document.createElement('div');
					seg.style.height = segSize+'px';
					seg.style.fontSize = '1px';
					seg.style.lineHeight = '0';
					jscolor.picker.sld.appendChild(seg);
				}
				jscolor.picker.sldB.appendChild(jscolor.picker.sld);
				jscolor.picker.box.appendChild(jscolor.picker.sldB);
				jscolor.picker.box.appendChild(jscolor.picker.sldM);
				jscolor.picker.padB.appendChild(jscolor.picker.pad);
				jscolor.picker.box.appendChild(jscolor.picker.padB);
				jscolor.picker.box.appendChild(jscolor.picker.padM);
				jscolor.picker.btnS.appendChild(jscolor.picker.btnT);
				jscolor.picker.btn.appendChild(jscolor.picker.btnS);
				jscolor.picker.box.appendChild(jscolor.picker.btn);
				jscolor.picker.boxB.appendChild(jscolor.picker.box);
			}

			var p = jscolor.picker;

			// controls interaction
			p.box.onmouseup =
			p.box.onmouseout = function() { target.focus(); };
			p.box.onmousedown = function() { abortBlur=true; };
			p.box.onmousemove = function(e) {
				if (holdPad || holdSld) {
					holdPad && setPad(e);
					holdSld && setSld(e);
					if (document.selection) {
						document.selection.empty();
					} else if (window.getSelection) {
						window.getSelection().removeAllRanges();
					}
					dispatchImmediateChange();
				}
			};
			p.padM.onmouseup =
			p.padM.onmouseout = function() { if(holdPad) { holdPad=false; jscolor.fireEvent(valueElement,'change'); } };
			p.padM.onmousedown = function(e) {
				// if the slider is at the bottom, move it up
				switch(modeID) {
					case 0: if (THIS.hsv[2] === 0) { THIS.fromHSV(null, null, 1.0); }; break;
					case 1: if (THIS.hsv[1] === 0) { THIS.fromHSV(null, 1.0, null); }; break;
				}
				holdPad=true;
				setPad(e);
				dispatchImmediateChange();
			};
			p.sldM.onmouseup =
			p.sldM.onmouseout = function() { if(holdSld) { holdSld=false; jscolor.fireEvent(valueElement,'change'); } };
			p.sldM.onmousedown = function(e) {
				holdSld=true;
				setSld(e);
				dispatchImmediateChange();
			};

			// picker
			var dims = getPickerDims(THIS);
			p.box.style.width = dims[0] + 'px';
			p.box.style.height = dims[1] + 'px';

			// picker border
			p.boxB.style.position = 'fixed';
			p.boxB.style.clear = 'both';
			p.boxB.style.left = x+'px';
			p.boxB.style.top = y+'px';
			p.boxB.style.zIndex = THIS.pickerZIndex;
			p.boxB.style.border = THIS.pickerBorder+'px solid';
			p.boxB.style.borderColor = THIS.pickerBorderColor;
			p.boxB.style.background = THIS.pickerFaceColor;

			// pad image
			p.pad.style.width = jscolor.images.pad[0]+'px';
			p.pad.style.height = jscolor.images.pad[1]+'px';

			// pad border
			p.padB.style.position = 'absolute';
			p.padB.style.left = THIS.pickerFace+'px';
			p.padB.style.top = THIS.pickerFace+'px';
			p.padB.style.border = THIS.pickerInset+'px solid';
			p.padB.style.borderColor = THIS.pickerInsetColor;

			// pad mouse area
			p.padM.style.position = 'absolute';
			p.padM.style.left = '0';
			p.padM.style.top = '0';
			p.padM.style.width = THIS.pickerFace + 2*THIS.pickerInset + jscolor.images.pad[0] + jscolor.images.arrow[0] + 'px';
			p.padM.style.height = p.box.style.height;
			p.padM.style.cursor = 'crosshair';

			// slider image
			p.sld.style.overflow = 'hidden';
			p.sld.style.width = jscolor.images.sld[0]+'px';
			p.sld.style.height = jscolor.images.sld[1]+'px';

			// slider border
			p.sldB.style.display = THIS.slider ? 'block' : 'none';
			p.sldB.style.position = 'absolute';
			p.sldB.style.right = THIS.pickerFace+'px';
			p.sldB.style.top = THIS.pickerFace+'px';
			p.sldB.style.border = THIS.pickerInset+'px solid';
			p.sldB.style.borderColor = THIS.pickerInsetColor;

			// slider mouse area
			p.sldM.style.display = THIS.slider ? 'block' : 'none';
			p.sldM.style.position = 'absolute';
			p.sldM.style.right = '0';
			p.sldM.style.top = '0';
			p.sldM.style.width = jscolor.images.sld[0] + jscolor.images.arrow[0] + THIS.pickerFace + 2*THIS.pickerInset + 'px';
			p.sldM.style.height = p.box.style.height;
			try {
				p.sldM.style.cursor = 'pointer';
			} catch(eOldIE) {
				p.sldM.style.cursor = 'hand';
			}

			// "close" button
			function setBtnBorder() {
				var insetColors = THIS.pickerInsetColor.split(/\s+/);
				var pickerOutsetColor = insetColors.length < 2 ? insetColors[0] : insetColors[1] + ' ' + insetColors[0] + ' ' + insetColors[0] + ' ' + insetColors[1];
				p.btn.style.borderColor = pickerOutsetColor;
			}
			p.btn.style.display = THIS.pickerClosable ? 'block' : 'none';
			p.btn.style.position = 'absolute';
			p.btn.style.left = THIS.pickerFace + 'px';
			p.btn.style.bottom = THIS.pickerFace + 'px';
			p.btn.style.padding = '0 15px';
			p.btn.style.height = '18px';
			p.btn.style.border = THIS.pickerInset + 'px solid';
			setBtnBorder();
			p.btn.style.color = THIS.pickerButtonColor;
			p.btn.style.font = '12px sans-serif';
			p.btn.style.textAlign = 'center';
			try {
				p.btn.style.cursor = 'pointer';
			} catch(eOldIE) {
				p.btn.style.cursor = 'hand';
			}
			p.btn.onmousedown = function () {
				THIS.hidePicker();
			};
			p.btnS.style.lineHeight = p.btn.style.height;

			// load images in optimal order
			switch(modeID) {
				case 0: var padImg = 'hs.png'; break;
				case 1: var padImg = 'hv.png'; break;
			}
			p.padM.style.backgroundImage = "url('"+jscolor.getDir()+"cross.gif')";
			p.padM.style.backgroundRepeat = "no-repeat";
			p.sldM.style.backgroundImage = "url('"+jscolor.getDir()+"arrow.gif')";
			p.sldM.style.backgroundRepeat = "no-repeat";
			p.pad.style.backgroundImage = "url('"+jscolor.getDir()+padImg+"')";
			p.pad.style.backgroundRepeat = "no-repeat";
			p.pad.style.backgroundPosition = "0 0";

			// place pointers
			redrawPad();
			redrawSld();

			jscolor.picker.owner = THIS;
			document.getElementsByTagName('body')[0].appendChild(p.boxB);
		}


		function getPickerDims(o) {
			var dims = [
				2*o.pickerInset + 2*o.pickerFace + jscolor.images.pad[0] +
					(o.slider ? 2*o.pickerInset + 2*jscolor.images.arrow[0] + jscolor.images.sld[0] : 0),
				o.pickerClosable ?
					4*o.pickerInset + 3*o.pickerFace + jscolor.images.pad[1] + o.pickerButtonHeight :
					2*o.pickerInset + 2*o.pickerFace + jscolor.images.pad[1]
			];
			return dims;
		}


		function redrawPad() {
			// redraw the pad pointer
			switch(modeID) {
				case 0: var yComponent = 1; break;
				case 1: var yComponent = 2; break;
			}
			var x = Math.round((THIS.hsv[0]/6) * (jscolor.images.pad[0]-1));
			var y = Math.round((1-THIS.hsv[yComponent]) * (jscolor.images.pad[1]-1));
			jscolor.picker.padM.style.backgroundPosition =
				(THIS.pickerFace+THIS.pickerInset+x - Math.floor(jscolor.images.cross[0]/2)) + 'px ' +
				(THIS.pickerFace+THIS.pickerInset+y - Math.floor(jscolor.images.cross[1]/2)) + 'px';

			// redraw the slider image
			var seg = jscolor.picker.sld.childNodes;

			switch(modeID) {
				case 0:
					var rgb = HSV_RGB(THIS.hsv[0], THIS.hsv[1], 1);
					for(var i=0; i<seg.length; i+=1) {
						seg[i].style.backgroundColor = 'rgb('+
							(rgb[0]*(1-i/seg.length)*100)+'%,'+
							(rgb[1]*(1-i/seg.length)*100)+'%,'+
							(rgb[2]*(1-i/seg.length)*100)+'%)';
					}
					break;
				case 1:
					var rgb, s, c = [ THIS.hsv[2], 0, 0 ];
					var i = Math.floor(THIS.hsv[0]);
					var f = i%2 ? THIS.hsv[0]-i : 1-(THIS.hsv[0]-i);
					switch(i) {
						case 6:
						case 0: rgb=[0,1,2]; break;
						case 1: rgb=[1,0,2]; break;
						case 2: rgb=[2,0,1]; break;
						case 3: rgb=[2,1,0]; break;
						case 4: rgb=[1,2,0]; break;
						case 5: rgb=[0,2,1]; break;
					}
					for(var i=0; i<seg.length; i+=1) {
						s = 1 - 1/(seg.length-1)*i;
						c[1] = c[0] * (1 - s*f);
						c[2] = c[0] * (1 - s);
						seg[i].style.backgroundColor = 'rgb('+
							(c[rgb[0]]*100)+'%,'+
							(c[rgb[1]]*100)+'%,'+
							(c[rgb[2]]*100)+'%)';
					}
					break;
			}
		}


		function redrawSld() {
			// redraw the slider pointer
			switch(modeID) {
				case 0: var yComponent = 2; break;
				case 1: var yComponent = 1; break;
			}
			var y = Math.round((1-THIS.hsv[yComponent]) * (jscolor.images.sld[1]-1));
			jscolor.picker.sldM.style.backgroundPosition =
				'0 ' + (THIS.pickerFace+THIS.pickerInset+y - Math.floor(jscolor.images.arrow[1]/2)) + 'px';
		}


		function isPickerOwner() {
			return jscolor.picker && jscolor.picker.owner === THIS;
		}


		function blurTarget() {
			if(valueElement === target) {
				THIS.importColor();
			}
			if(THIS.pickerOnfocus) {
				THIS.hidePicker();
			}
		}


		function blurValue() {
			if(valueElement !== target) {
				THIS.importColor();
			}
		}


		function setPad(e) {
			var mpos = jscolor.getRelMousePos(e);
			var x = mpos.x - THIS.pickerFace - THIS.pickerInset;
			var y = mpos.y - THIS.pickerFace - THIS.pickerInset;
			switch(modeID) {
				case 0: THIS.fromHSV(x*(6/(jscolor.images.pad[0]-1)), 1 - y/(jscolor.images.pad[1]-1), null, leaveSld); break;
				case 1: THIS.fromHSV(x*(6/(jscolor.images.pad[0]-1)), null, 1 - y/(jscolor.images.pad[1]-1), leaveSld); break;
			}
		}


		function setSld(e) {
			var mpos = jscolor.getRelMousePos(e);
			var y = mpos.y - THIS.pickerFace - THIS.pickerInset;
			switch(modeID) {
				case 0: THIS.fromHSV(null, null, 1 - y/(jscolor.images.sld[1]-1), leavePad); break;
				case 1: THIS.fromHSV(null, 1 - y/(jscolor.images.sld[1]-1), null, leavePad); break;
			}
		}


		function dispatchImmediateChange() {
			if (THIS.onImmediateChange) {
				var callback;
				if (typeof THIS.onImmediateChange === 'string') {
					callback = new Function (THIS.onImmediateChange);
				} else {
					callback = THIS.onImmediateChange;
				}
				callback.call(THIS);
			}
		}


		var THIS = this;
		var modeID = this.pickerMode.toLowerCase()==='hvs' ? 1 : 0;
		var abortBlur = false;
		var
			valueElement = jscolor.fetchElement(this.valueElement),
			styleElement = jscolor.fetchElement(this.styleElement);
		var
			holdPad = false,
			holdSld = false;
		var
			leaveValue = 1<<0,
			leaveStyle = 1<<1,
			leavePad = 1<<2,
			leaveSld = 1<<3;

		// target
		jscolor.addEvent(target, 'focus', function() {
			if(THIS.pickerOnfocus) { THIS.showPicker(); }
		});
		jscolor.addEvent(target, 'blur', function() {
			if(!abortBlur) {
				window.setTimeout(function(){ abortBlur || blurTarget(); abortBlur=false; }, 0);
			} else {
				abortBlur = false;
			}
		});

		// valueElement
		if(valueElement) {
			var updateField = function() {
				THIS.fromString(valueElement.value, leaveValue);
				dispatchImmediateChange();
			};
			jscolor.addEvent(valueElement, 'keyup', updateField);
			jscolor.addEvent(valueElement, 'input', updateField);
			jscolor.addEvent(valueElement, 'blur', blurValue);
			valueElement.setAttribute('autocomplete', 'off');
		}

		// styleElement
		if(styleElement) {
			styleElement.jscStyle = {
				backgroundImage : styleElement.style.backgroundImage,
				backgroundColor : styleElement.style.backgroundColor,
				color : styleElement.style.color
			};
		}

		// require images
		switch(modeID) {
			case 0: jscolor.requireImage('hs.png'); break;
			case 1: jscolor.requireImage('hv.png'); break;
		}
		jscolor.requireImage('cross.gif');
		jscolor.requireImage('arrow.gif');

		this.importColor();
	}

};



////////// 15-url-picker.js ////////////////

function getUrl() {
  // return a unique URL for this page
  //
  // due to a stupid mistake all URLs look like
  // http://foo.com//bar instead of
  // http://foo.com/bar like they should be.
  // too many slashes? sorry...

  if (window.URL_OVERRIDE) {
    return window.URL_OVERRIDE;
  }

  var l = document.location,
      base = l.protocol+"//"+l.host+"/"+l.pathname;

  //
  var needle = 'http:' + window.GOGGLE_SERVER.replace('page', '/live/'); //Yes, we account for the extra slash here
  if (base.indexOf(needle) > -1) {
    var parser = document.createElement('a');
    parser.href = decodeURIComponent(base.replace(needle, ''));

    base = parser.protocol+"//"+parser.host+"/"+parser.pathname;
  }

  //alert(base);

  // special cases
  if (l.host == 'board.iamlights.com') {
    base = base + l.search.replace(new RegExp('page__.*'), '');
    if (base[base.length-1] == '/') {
      base = base.substr(0, base.length-1);
    }
  } else if (l.host == 'twitter.com') {
    // twitter uses 'pretty' URLs
    if (l.hash.indexOf("#!")===0) {
      base = base + (l.hash.indexOf('/')==2? l.hash.substr(3)
                                           : l.hash.substr(2));
    }
  }

  return base;
}

////////// 20-picker.js ////////////////

/*globals bind */

// Picker widget
function hex2rgb(hex) {
  if (hex.length==4) {
    return {r: parseInt(hex.substr(1,1),16)*17,
            g: parseInt(hex.substr(2,1),16)*17,
            b: parseInt(hex.substr(3,1),16)*17};
  } else if (hex.length==7) {
    return {r: parseInt(hex.substr(1,2),16),
            g: parseInt(hex.substr(3,2),16),
            b: parseInt(hex.substr(5,2),16)};
  } else {
    return {r:0,g:0,b:0};
  }
}
function Picker(onPickColor, onPickBrush) {
  //We need our font!
  $('<style>')
    .text('@import url(//fonts.googleapis.com/css?family=Merriweather+Sans:300,700,300italic);@import url(//fonts.googleapis.com/css?family=Ubuntu:bold);')
    .appendTo($('head'));

  var self = this;

  var $color_menu = $("<div>"); //Just so we can use it later

  this.colorsJq = $("<div>").css({
    position: "fixed",
    cursor: 'pointer',
    "z-index": "100002",
    top: "32px",
    left: "288px",
    width: "132px",
    border: 'solid 1px #000',
    'background': '#555'
  });
  var chosenColor = $();
  // different brush colors!

  // A true color picker!
  var truecolorpicker = $("<div>").css({"background-color": "#fff",
                                        "background-image":
                                        "url("+window.GOGGLE_SERVER+"/../img/color-picker.png)",
                                        'background-position': '0 -16px',
                                        "color": "#000",
                                        "line-height": '32px',
                                        'font-size': '300%',
                                        'text-align': 'center',
                                        'display': 'inline-block',
                                        width: 32, height: 32});
  var value_holder = $("<input>");
  function make_colorpicker_active(){
    var color = value_holder.get(0).value;
    truecolorpicker.css({"background-color":color});

    onPickColor(hex2rgb(color));
    $color_menu.css({'background': color});
    self.colorsJq.hide();
    self.jscp.hidePicker();

    chosenColor.text("");
    chosenColor = truecolorpicker;
    truecolorpicker.html("&bull;");
  }
  value_holder.change(make_colorpicker_active);
  this.jscp = new jscolor.color(value_holder.get(0));
  truecolorpicker.click(function(){
                          if (self.jscp.isVisible()) {
                            if (truecolorpicker == chosenColor) {
                              self.jscp.hidePicker();
                            } else {
                              make_colorpicker_active();
                            }
                          } else {
                            self.jscp.showPicker();
                          }
                        });
  truecolorpicker.appendTo(self.colorsJq);

  // A nice small palette for the rest of em!
  var colors = ["#000", "#fff", "#e50", "#fa0", "#1ba", "#e07", "#ab0"]
    .map(function(color) {
      var colorjq = $("<div>").css({"background-color": color,
                                    'color': (color=="#000"?"#fff":"#000"),
                                    'line-height': '32px',
                                    'font-size': '300%',
                                    'text-align': 'center',
                                    'display': 'inline-block',
                                    width: 32, height: 32});
      colorjq.click(function(){
        if (colorjq == chosenColor) { return; }

          onPickColor(hex2rgb(color));
          $color_menu.css({'background': color});
          self.colorsJq.hide();
          self.jscp.hidePicker();

          chosenColor.text("");
          chosenColor = colorjq;
          colorjq.html("&bull;");
        });
      colorjq.appendTo(self.colorsJq);
      return colorjq;
    });
  colors[0].click();

  //The main bar
  this.$toolbar = $("<div>")
    .css({
      position: "fixed",
      "z-index": "100002",
      top: "0",
      left: "0",
      'background-color':'#000',
      'background-image': 'linear-gradient(#222, #555)',
      //'border-bottom': 'solid 1px #666',
      'box-shadow': '0 0 6px #666',
      color:'#fff',
      margin:0,
      width: "100%"
    });

  //Meta info bar
  this.$meta = $("<div>").css({
    position: "fixed",
    "z-index": "100003",
    top: 32,
    left: 0,
    'background-color':'#555',
    //'border-bottom': 'solid 1px #666',
    'box-shadow': '0 0 6px #666',
    color:'#fff',
    margin:0,
    width: "100%"
  });

  //Branding
  $("<div>", {title: 'Draw on your favorite web sites'})
    .css({
      'font-family': "'Ubuntu', 'Merriweather Sans', 'Helvetica', 'Arial', 'sans-serif'",
      'font-weight': 'bold',
      'font-size': '20px',
      'display': 'inline-block',
      'vertical-align': 'top',
      'line-height': '32px',
      'margin-left': '8px',
      'margin-right': '8px',
      'cursor': 'pointer'
    })
    .attr('title', 'Click here for more info')
    .append($('<span>')
      .css({
        color: '#e50',
        'text-decoration': 'none'})
      .text('â–¼dudl.me'))
    .click(function() {
      if (self.$meta.is(':visible')) {
        self.$meta.slideUp('fast');
      } else {
        self.$meta.slideDown('fast');
      }
    })
    .appendTo(this.$toolbar);

  // different brush sizes!
  var chosenBrush = $();
  var brushes = [1,2,5,10,15,20]
    .map(function(size) {
        var brushJq = $("<div>")
              .css({
                display: 'inline-block',
                'vertical-align': 'top',
                cursor: 'pointer',
                width: "32px",
                padding:0,
                height: "32px"
              });
        brushJq.append($("<div>")
            .css({
                position: "absolute",
                height: size+"px",
                'background-color': "#fff",
                top: (16-size/2)+"px",
                width: "32px"
              }));
        brushJq.click(function(){
          if (brushJq == chosenBrush) { return; }
            onPickBrush(size);
            chosenBrush.css({'background-color': ""});
            //chosenBrush.find("div").css({'background-color': "#fff"});
            chosenBrush = brushJq;
            chosenBrush.css({'background-color': "#555"});
            //chosenBrush.find("div").css({'background-color': "#000"});
          });
        brushJq.attr('title', 'Change the stroke/font size: ' + size + 'px or ' + (size*3+1) + 'pt');
        brushJq.appendTo(self.$toolbar);
        return brushJq;
    });
  brushes[2].click();

  //Set a default color
  $color_menu.css({
      display: 'inline-block',
      'vertical-align': 'top',
      width: '32px',
      height: '32px',
      'text-align': 'right',
      'line-height': '32px',
      cursor: 'pointer',
      'margin': '0 4px 0 4px',
      'background': '#000'
    })
    .attr('title', 'Pick a color, any color')
    .text('â–¼')
    .click(function () {
      if (self.colorsJq.is(':visible'))
        self.colorsJq.hide();
      else
        self.colorsJq.slideDown('medium');
    })
    .appendTo(this.$toolbar);

  var button_factory = function (text, css, parent)
  {
    if (!parent) //CSS is actually the parent
    {
      parent = css;
      css = {};
    }

    return $('<div>')
      .css({
        display: 'inline-block',
        'vertical-align': 'top',
        cursor: 'pointer',
        width: "auto",
        padding: "0 8px",
        height: "32px",
        "font-family": "'Merriweather Sans', 'Helvetica', 'Arial', sans-serif",
        "font-size": "14px",
        "text-align": "center",
        "line-height": "32px"
        //color: '#e50'
      })
      .css(css)
      .text(text)
      .appendTo(parent);
  }

  this.$fill = button_factory('', self.$toolbar)
    .attr('title', 'Toggle fill or stroke')
    .append($('<div>').css({
      'border': 'solid 1px white',
      'background': 'white',
      'height': 20,
      'width': 30,
      'margin': 5
    }).text(''))
    .addClass('filled')
    .click(function () {
      if ($(this).hasClass('filled')) {
        $(this).find('div').css({'background': 'none'});
        $(this).removeClass('filled');
      } else {
        $(this).find('div').css({'background': 'white'});
        $(this).addClass('filled');
      }
    })

  this.tools = {};
  this.tools.$eraser = button_factory('eraser', self.$toolbar);
  this.tools.$pen = button_factory('pen', self.$toolbar);
  this.tools.$rect = button_factory('rect', self.$toolbar);
  this.tools.$ellipse = button_factory('ellipse', self.$toolbar);
  this.tools.$text = button_factory('text', self.$toolbar);

  //share a page
  this.shareJq = button_factory('share', {width: "64px", 'text-decoration': 'underline'}, self.$toolbar).attr('title', 'Share to the dudl.me gallery');

  //go home
  $('<a>', {'href': 'http://dudl.me/', 'target': '_blank'}).appendTo(this.$meta);

  //reconnect
  this.reconnectJq = button_factory(' (', self.$meta);//.hide();
  $('<a>')
    .css({
      color: '#fff',
      'text-decoration': 'underline'
    })
    .text('log in')
    .appendTo(this.reconnectJq);
  this.reconnectJq.append(')');
  $('<span>')
    .text('drawing locally')
    .attr('title', "Anything you draw will not be visible to others unless you log in")
    .prependTo(this.reconnectJq);

  //login info
  this.loginJq = button_factory('log in/register', {'text-decoration': 'underline'}, self.$toolbar);
  this.registerJq = button_factory('register', {'text-decoration': 'underline'}, self.$meta);
  this.logoutJq = button_factory('log out', {'text-decoration': 'underline'}, self.$meta).hide();
  this.$collab = button_factory('', {color: '', cursor: 'default'}, self.$meta).hide();

  this.$close = button_factory('X', {'float': 'right'}, self.$toolbar).attr('title', 'Close dudl.me');

  this.$newFeatures = $('<div>', {})
  .css({
    "font-size": "14px",
    "padding": '2px',
    'background': '#333',
    'border-top': 'solid 1px white'
  })
  .append($('<span>')
  .css({
    'float': 'right',
    'background': 'white',
    'color': '#333',
    'cursor': 'pointer',
    'padding-left': 4,
    'padding-right': 4
  })
  .click(bind(this, function () {this.$newFeatures.slideUp();}))
  .text('X'))
  .append('Just in case there' + "'" + 's still any confusion as to the future of dudl.me: The old dudl.me experience has moved over to <a style="color: #e50;" href="http://dudl.us/" target="_blank">dudl classic</a>; in order to use it, you will have to install the dudl classic bookmark. However, the app hosted at dudl.me has gained some new features (see above if you' + "'" + 're logged in) and become a <a style="color: #e50;" href="http://dudl.me/pricing" target="_blank">paid product</a>. No funny business, just a clean way to have two separate offerings to two separate audiences.')
  .appendTo(this.$toolbar);

  //where is it shared?
  this.sharedAtJq = $('<div>')
    .css({
      position: 'fixed',
      top: 32,
      left: 320,
      'z-index': "100001",
      display: 'block',
      background: '#555',
      padding:0,
      height: "28px",
      "text-align": "center",
      "line-height": "28px",
      "font-family": "'Merriweather Sans', 'Helvetica', 'Arial', sans-serif",
      "font-size": "14px"
    })
    .text('')
    .appendTo($("body"))
    .hide();
}
Picker.prototype.flashShareJqBanner = function() {
   // Quickly make a small widget
  var widget = $("<div>").css({
                    position: "fixed",
                    left: "300px",
                    top: "70px",
                    "z-index": "100002",
		                border: 'solid 3px #fa0',
                    'border-radius': '10px',
		                color: '#000',
                    padding: "25px",
                    "font-weight": "bold",
                    "font-size": "24px",
		                'background-color': '#e50'
                  }).text("Thanks for sharing!\nYour URL is up here.");
  // Arrow tip
  widget.append($("<div>").css({width:0,height:0,"border-left":"20px solid transparent","border-right": "20px solid transparent", "border-bottom":"20px solid #fa0","position":"fixed",left:"320px",top:"50px","z-index":"100003"}));
  widget.append($("<div>").css({width:0,height:0,"border-left":"20px solid transparent","border-right": "20px solid transparent", "border-bottom":"20px solid #e50","position":"fixed",left:"320px",top:"53px","z-index":"100004"}));
  widget.appendTo(this.$toolbar).hide().slideDown(400, function(){
                              setTimeout(function(){widget.slideUp();}, 3000);
                            });

}
Picker.prototype.del = function() {
  $("body").animate({'margin-top': '0'}, 'fast');
  this.colorsJq.slideUp('fast', bind(this,function(){this.colorsJq.remove();}));
  this.$meta.slideUp('fast', bind(this,function(){this.$meta.remove();}));
  this.$toolbar.slideUp('fast', bind(this,function(){this.$toolbar.remove();}));
  this.sharedAtJq.hide();
  this.jscp.hidePicker();
};
Picker.prototype.show = function() {
  this.$toolbar.hide().appendTo($("body")).slideDown('medium');
  this.colorsJq.hide().appendTo($("body"));
  this.$meta.hide().appendTo($("body"));
  $("body").animate({'margin-top': '32px'});
};

////////// 26-login.js ////////////////

//26-login

function LoginBox() {
	this.$layout = $("<div>").css({
		position: "fixed",
		"z-index": "100002",
		width: "400px",
		height: "400px",
		border: 'solid 1px #000',
        'border-radius': '10px',
		color: '#000',
		'background-color': '#aef',
		'font-family': 'arial',
		'text-align': 'center',
		'font-size': '12pt'
	});

	$("<h3>").text("Log into dudl.me").appendTo(this.$layout);

	this.$message = $("<div>").appendTo(this.$layout);

	$("<span>").html("Username:<br />").appendTo(this.$layout);
	this.$username = $("<input>", {
		type: "text",
		name: "username"
	}).appendTo(this.$layout);
	$("<br />").appendTo(this.$layout);
	$("<br />").appendTo(this.$layout);

	$("<span>").html("Password:<br />").appendTo(this.$layout);
	this.$password = $("<input>", {
		type: "password",
		name: "password"
	}).appendTo(this.$layout);
	$("<br />").appendTo(this.$layout);
	$("<br />").appendTo(this.$layout);

	this.$submit = $("<input>", {
		type: "button",
		value: "Log In"
	}).appendTo(this.$layout)
	.click(bind(this, this.login));
	this.$cancel = $("<input>", {
		type: "button",
		value: "Cancel"
	}).appendTo(this.$layout)
	.click(bind(this, this.cancel));
	$("<br />").appendTo(this.$layout);
	$("<br />").appendTo(this.$layout);

	$("<a>", {
		href: window.GOGGLE_SERVER.replace("page", "register"),
		target: "_new"
	}).text("Register").appendTo(this.$layout);
	this.$layout.append(' | ');
	$("<a>", {
		href: window.GOGGLE_SERVER.replace("page", "user/forgot"),
		target: "_new"
	}).text("Forgot Password").appendTo(this.$layout);
	$("<br />").appendTo(this.$layout);
	$("<br />").appendTo(this.$layout);

    $("<div>").css({
		"font-size": '10pt',
        "padding": '10px'
	}).text("Logging into dudl.me allows you to share screen shots in the dudl.me Gallery. We do"
	+ " not give your information to anyone and use it only for authentication, generating usage"
	+ " statistics, and periodically communicating with loyal dudl.me users.").appendTo(this.$layout);

	//Some more events to allow user to hit "enter" from username or password field
	var self = this;
	function keyPressEvent(evt) { if (evt.which == 13) self.$submit.click(); }
	this.$username.keypress(keyPressEvent);
	this.$password.keypress(keyPressEvent);
}

LoginBox.prototype.message = function(message) {
	this.$message.text(message);
	return this;
}

LoginBox.prototype.show = function(auth_cb, cancel_cb) {
	this.$layout.css({
	  top: Math.max(0, ($(window).height() - this.$layout.height())/2),
		left: ($(window).width() - this.$layout.width())/2
	});
	this.$layout.hide()
				.appendTo($("body"))
				.show();

	this.onAuthorized = auth_cb;
	this.onCanceled = cancel_cb;
}

LoginBox.prototype.del = function() {
	this.$layout.fadeOut('fast');
	this.$message.text('');
}

LoginBox.prototype.login = function() {
	var self = this;
	$.ajax({
		type: 'POST',
		url: window.GOGGLE_SERVER.replace('page', 'login'),
		dataType: 'json',
		crossDomain: true,
		xhrFields: {withCredentials: true},
		// note that in general this requires extra headers on the server to work
		data: {
			username: this.$username.val(),
			password: this.$password.val()
		},
		success: function(data) {
			if (!data)
				alert('Invalid username or password!');
			if (data && self.onAuthorized)
				self.onAuthorized(data);
		}
	});
}

LoginBox.prototype.cancel = function() {
	this.del();
	if (this.onCanceled)
		this.onCanceled();
};

////////// 30-shapes.js ////////////////

function intersect(p1, p2,  p3, p4) {
  // Given two lines (four endponits a1-a2 and b1-b2), return 'true' if they
  // intersect and 'false' if they do not.
  //
  // This function is pure magic. I did not develop it, see
  // http://web.archive.org/web/20071021153914/http://math.niu.edu/~rusin/known-math/95/line_segs
  //
  // from the above source:
  // The sign of the determinant
  //
  //                   | x1 y1 1 |
  // det(P1, P2, P3) = | x2 y2 1 |
  //                   | x3 y3 1 |
  //
  // identifies which side (e.g., north or south) of (extended) line 1 contains
  // P3.
  var det123 = (p2[0]-p1[0]) * (p3[1]-p1[1])-(p3[0]-p1[0]) * (p2[1]-p1[1]),
      det124 = (p2[0]-p1[0]) * (p4[1]-p1[1])-(p4[0]-p1[0]) * (p2[1]-p1[1]),
      det341 = (p3[0]-p1[0]) * (p4[1]-p1[1])-(p4[0]-p1[0]) * (p3[1]-p1[1]),
      det342 = det123 - det124 + det341;
    if (det123===0 || det124===0 || det341===0 || det342===0) {
      return undefined;
    }
    if (det123*det124<0 && det341*det342<0) {
      // if they have opposite signs
      return true;
    }
    return false;
}

function pointNear(p, radius,  a,b) {
  /*
   * Given a point p, a "radius", and two more points a and b, return whether
   * the point p is within radius of line ab.
   *
   * We'll use a bounding box approach here.
   *
   *    +---+---------------------+--+
   *    |   | radius              |  |
   *    +---+ - - - - - - - - - - +--+
   *    |   |                  .-'|b |
   *    |         +         ,-'      |
   *    |   |    p \     ,-'      |  |
   *    |           \ ,-'            |
   *    |   |      ,-"            |  |
   *    |       ,-'                  |
   *    |   |,-'                  |  |
   *    +---+ - - - - - - - - - - +--+
   *    |   | a                   |  |
   *    +---+---------------------+--+
   *
   * Points A and B form an "inner" bounding box (dashed line). This is padded
   * by 'radius' units on all sides to form an "outer" bounding box (solid
   * line). If p lies outside of this outer bounding box, there is no
   * possibility of a collision. If p lies inside the bounding box, then a
   * standard point-line-distance test is used.
   *
   * This estimate will give false positives for the two corners nearest to b
   * and a where p lies inside the square but just outside the quarter-circle.
   */
  var x=p[0],
      y=p[1];
    if (x < Math.min(a[0], b[0])-radius ||    // left
        x > Math.max(a[0], b[0])+radius ||    // right
        y < Math.min(a[1], b[1])-radius ||    // top
        y > Math.max(a[1], b[1])+radius) {    // bottom
      // p lies outside the bounding box for this line segment
      return false;
    }

    var denominator = Math.sqrt( (b[0]-a[0])*(b[0]-a[0]) + (b[1]-a[1])*(b[1]-a[1]) );
    if (denominator==0) { return true; }
    // see http://mathworld.wolfram.com/Point-LineDistance2-Dimensional.html
    return (Math.abs( (b[0]-a[0])*(a[1]-p[1]) - (a[0]-p[0])*(b[1]-a[1]) ) /
            denominator) <= radius;

}

// SHAPES
function Shape(thickness, r,g,b,a, points, id) {
  // Takes a position, thickness, and rgba colors
  // Each shape looks like this:
  // {p: [ [x,y], [x,y], [x,y], ...], points
  //  t: 5                            thickness
  //  r: 250, g: 200, b: 125, a: 0.5  color
  //  id: 15                          shape ID (for fast deletions)
  // }
  this.t = thickness;
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
  this.p = points||[];
  this.id = (typeof id == 'undefined')? null : id;
}
Shape.prototype.appendPoint = function(point) {
  // Append a point to this shape.
  this.p.push(
    [Math.round(point[0]*10)/10, Math.round(point[1]*10)/10]
  );
};
Shape.prototype.drawLast = function(ctx) {
  // Given a canvas, draw the last line of the shape
  if (this.p.length >= 2) {
    var a = this.p[this.p.length-2],
        b = this.p[this.p.length-1];
    // draws part of the shape
    ctx.strokeStyle = "rgba("+this.r+","+this.g+","+this.b+","+this.a+")";
    ctx.lineWidth = this.t;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo.apply(ctx, a);
    ctx.lineTo.apply(ctx, b);
    ctx.stroke();
  }
};
Shape.prototype.draw = function(ctx) {
  // Draw a given shape if it is in view.
// this prematurely optimized bounding box test is done elsewhere, I think
//      if ((p.x + shape.s) > 0 &&
//          (p.y + shape.s) > 0 &&
//          (p.x - shape.s) < canvas.width &&
//          (p.y - shape.s) < canvas.height) {
    ctx.strokeStyle = "rgba("+this.r+","+this.g+","+this.b+","+this.a+")";
    ctx.lineWidth = this.t;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo.apply(ctx, this.p[0]);
    for (var i=0,l=this.p.length; i<l; i++) {
      ctx.lineTo.apply(ctx, this.p[i]);
    }
    ctx.stroke();
//       }
};
Shape.prototype.boundingBox = function() {
  // return the bounding box
  if (!(this.bbox) || this.npoints != this.p.length) {
    this.npoints = this.p.length;
    this.bbox = {
      left: Math.min.apply(null, this.p.map(function(point){return point[0];})),
      right: Math.max.apply(null, this.p.map(function(point){return point[0];})),
      top: Math.min.apply(null, this.p.map(function(point){return point[1];})),
      bottom: Math.max.apply(null, this.p.map(function(point){return point[1];}))
    };
  }
  return this.bbox;
};
Shape.prototype.pointIntersects = function(p, radius) {
  // Return true if the point p intersects any line in this shape with given
  // radius.
  radius+=this.t;
  var bb = this.boundingBox();
  if (p[0] < bb.left-radius ||
      p[0] > bb.right+radius ||
      p[1] < bb.top-radius ||
      p[1] > bb.bottom+radius) {
    // quick bounding box check
    return false;
  }
  for (var i=0,l=this.p.length-1; i<l; i++) {
    var a=this.p[i], b=this.p[i+1];
    //console.log("is ",p," near",a,b," with radius ",radius,"?");
    if (pointNear(p, radius, a, b)) {
      //console.log("yes, should remove");
      return true;
    }
  }
  return false;
};
Shape.prototype.lineIntersects = function(p1, p2) {
  // Return true if the line from p1 to p2 intersects any line in this shape
  for (var i=0,l=this.p.length-1; i<l; i++) {
    var p3=this.p[i], p4=this.p[i+1];
    if (intersect(p1, p2, p3, p4)) {
      return true;
    }
  }
  return false;
};
Shape.prototype.pointwiseEqualTo = function(other) {
  // Pointwise comparison
  if (other.p.length == this.p.length) {
    // Each point is equal?
    for (var i=0,l=this.p.length; i<l; i++) {
      if (this.p[i][0] != other.p[i][0] || this.p[i][1] != other.p[i][1]) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
};

function DouglasPeucker(pointList, threshDist, start, end) {
  // recursively simplify the points in pointList from starting index to ending
  // index
  //

  //console.log("Starting at "+start+" to "+end);

  // if they're next to each other
  if (Math.abs(end-start) <= 1) {
    return [pointList[start]];
  }
  // else, return a list of simplified points
  // if the furthest vertex is more than some threshhold distance away from the
  // line defined by pointList[start] -- pointList[end], recurse; otherwise,
  // just use that line.
  var maxDistance = 0, maxPointIndex=0,
      a = pointList[start], b = pointList[end];
  for (var i=start+1; i<end; i++) {
    var p = pointList[i],
        thisDistance = Math.abs( (b[0]-a[0])*(a[1]-p[1]) - (a[0]-p[0])*(b[1]-a[1]) ) /
                       Math.sqrt( (b[0]-a[0])*(b[0]-a[0]) + (b[1]-a[1])*(b[1]-a[1]) );
    if (thisDistance > maxDistance) {
      maxDistance = thisDistance;
      maxPointIndex = i;
    }
  }

  if (maxDistance > threshDist) {
    // too big! recurse!
    //console.log(maxDistance+" is too big, recursing");
    return DouglasPeucker(pointList,threshDist,start,maxPointIndex).concat(
           DouglasPeucker(pointList,threshDist,maxPointIndex,end));
  } else {
    //console.log(maxDistance+" is enough");
    return [pointList[start]];
  }
}

Shape.prototype.simplifyInPlace = function(){
  // TODO: convert shape to simpler representation
  for (var i=0,l=this.p.length; i<l; i++) {
    this.p[i][0] = parseInt(this.p[i][0],10);
    this.p[i][1] = parseInt(this.p[i][1],10);
  }

  this.p = DouglasPeucker(this.p, 3, 0, this.p.length-1).concat([this.p[this.p.length-1]]);
};

// we serialize our points to something similar to base64
// major changes: we use _ instead of / and - instead of + as the last
// characters (it's being sent in a query string)
var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
function numToB64(num) {
  // return a 3-digit base64 number that represents num
  num = parseInt(num, 10) + 131072; // this bias is 64**3 / 2 and allows us to represent negative numbers
  var result = "";
  for (var i = 0; i < 3; i++) {
    result = b64[ num%64 ] + result;
    num = parseInt(num / 64,10);
  }
  return result;
}
function b64ToNum(b) {
  var result = 0;
  for (var i=0,l=b.length; i<l; i++) {
    var chr = b64.indexOf(b[i]);
    if (chr == -1) {
      throw new Error("contained a char that wasn't our base64");
    }
    result *= 64;
    result += chr;
  }
  return result - 131072;
}
function b64ToPoints(b) {
  if ((b.length % 6) !== 0) {
    throw new Error("invalid point length");
  }
  var points = [];
  for (var i=0,l=b.length; i<l; i+=6) {
    var x = b64ToNum(b.substring(i,   i+3)),
        y = b64ToNum(b.substring(i+3, i+6));
      points.push( [x,y] );
  }
  return points;
}

Shape.prototype.serializePoints = function(){
  var result = "";
  for (var i=0,l=this.p.length; i<l; i++) {
    result += numToB64(this.p[i][0])+numToB64(this.p[i][1]);
  }
  return result;
};
Shape.fromJSON = function(shape) {
  // Convert an array of shapes to real shapes.
  if (shape.t == 'rect' || shape.t == 'rect|filled') {
    var points = b64ToPoints(shape.p),
        x = points[0][0],
        y = points[0][1],
        width = points[1][0],
        height = points[1][1],
        meta = points[2] || [null, null],
        thickness = meta[0] || 3,
        filled = (shape.t == 'rect|filled');
    return new DudlRect(x, y, width, height, {r: shape.r, g: shape.g, b: shape.b, a: shape.a}, filled, thickness, shape.id);
  } else if (shape.t == 'ellipse' || shape.t == 'ellipse|filled') {
    var points = b64ToPoints(shape.p),
        x = points[0][0],
        y = points[0][1],
        width = points[1][0],
        height = points[1][1],
        meta = points[2] || [null, null],
        thickness = meta[0] || 3,
        filled = (shape.t == 'ellipse|filled');
    return new DudlEllipse(x, y, width, height, {r: shape.r, g: shape.g, b: shape.b, a: shape.a}, filled, thickness, shape.id);
  } else if (typeof shape.t == 'string' && shape.t.substring(0, 4) == 'text') {
    var points = b64ToPoints(shape.p),
        x = points[0][0],
        y = points[0][1],
        width = points[1][0],
        height = points[1][1],
        font = shape.t.substring(5),
        text = points.slice(2).map(function (p) { return String.fromCharCode(p[0]) }).reduce(function(a, b) { return a + b; }, "");
    return new DudlText(x, y, width, height, {r: shape.r, g: shape.g, b: shape.b, a: shape.a}, text, font, shape.id);
  } else {
    return new Shape(shape.t, shape.r,shape.g,shape.b,shape.a, b64ToPoints(shape.p), shape.id);
  }
};

//A "shape" must have:
//  - .draw()
//  - .boundingBox()
//  - .serializePoints()
//  - .pointIntersects()
//  - .lineIntersects()
function DudlRect (x, y, width, height, color, filled, thickness, id) {
  this.x = Math.min(x, x + width);
  this.y = Math.min(y, y + height);
  this.width = Math.abs(width);
  this.height = Math.abs(height);
  this.color = color;
  this.filled = filled;
  this.thickness = thickness;

  //Keep the interface
  this.r = color.r;
  this.g = color.g;
  this.b = color.b;
  this.a = color.a;
  this.p = [[this.x, this.y], [this.width, this.height], [this.thickness, 0]];
  this.t = 'rect' + (this.filled? '|filled': '');
  this.id = (typeof id == 'undefined')? null : id;
}
DudlRect.prototype.draw = function (ctx) {
  ctx.fillStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+","+this.color.a+")";
  ctx.strokeStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+","+this.color.a+")";
  ctx.lineWidth = this.thickness;
  if (this.filled) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  } else {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
DudlRect.prototype.boundingBox = function () {
  return {
    left: this.x,
    right: this.x + this.width,
    top: this.y,
    bottom: this.y + this.height
  };
}
DudlRect.prototype.serializePoints = Shape.prototype.serializePoints;
DudlRect.prototype.pointwiseEqualTo = Shape.prototype.pointwiseEqualTo;
DudlRect.prototype.pointIntersects = function (p, radius) {
  var bb = this.boundingBox();
  if (p[0] < bb.left-radius ||
      p[0] > bb.right+radius ||
      p[1] < bb.top-radius ||
      p[1] > bb.bottom+radius) {
      // quick bounding box check
    return false;
  }
  if (p[0] > bb.left &&
      p[0] < bb.right &&
      p[1] > bb.top &&
      p[1] < bb.bottom &&
      this.filled) {
    return true;
  }
  var tl = [this.x, this.y],
      tr = [this.x + this.width, this.y],
      bl = [this.x, this.y + this.height],
      br = [this.x + this.width, this.y + this.height];
  return pointNear(p, radius, tl, tr) ||
         pointNear(p, radius, tr, br) ||
         pointNear(p, radius, br, bl) ||
         pointNear(p, radius, bl, tl);
}
DudlRect.prototype.lineIntersects = function () {}

function DudlEllipse (x, y, width, height, color, filled, thickness, id) {
  this.x = Math.min(x, x + width);
  this.y = Math.min(y, y + height);
  this.width = Math.abs(width);
  this.height = Math.abs(height);
  this.color = color;
  this.thickness = thickness;
  this.filled = filled;

  //Keep the interface
  this.r = color.r;
  this.g = color.g;
  this.b = color.b;
  this.a = color.a;
  this.p = [[this.x, this.y], [this.width, this.height], [this.thickness, 0]];
  this.t = 'ellipse' + (this.filled? '|filled': '');
  this.id = (typeof id == 'undefined')? null : id;
}
DudlEllipse.prototype.draw = function (ctx) {
  var cx = this.x + this.width/2,
      cy = this.y + this.height/2,
      rx = this.width/2,
      ry = this.height/2,
      rot = 0,
      sa = 0,
      ea = 2 * Math.PI;
  ctx.strokeStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+",1)";
  ctx.fillStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+",1)";
  ctx.lineWidth = this.thickness;
  //Ellipse doesn't exist everywhere yet, so we have a backup
  if (ctx.ellipse) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, rot, sa, ea);
  } else {
    ctx.save()
    ctx.translate(cx, cy);
    ctx.beginPath();
    ctx.scale(1, ry/rx);
    ctx.arc(0, 0, rx, sa, ea);
    ctx.restore();
  }
  if (this.filled) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}
DudlEllipse.prototype.boundingBox = function () {
  return {
    left: this.x,
    right: this.x + this.width,
    top: this.y,
    bottom: this.y + this.height
  };
}
DudlEllipse.prototype.serializePoints = Shape.prototype.serializePoints;
DudlEllipse.prototype.pointwiseEqualTo = Shape.prototype.pointwiseEqualTo;
DudlEllipse.prototype.pointIntersects = function (p, radius) {
  //This is a really bad way to detect collisions with an ellipse
  var bb = this.boundingBox();
  if (p[0] < bb.left-radius ||
      p[0] > bb.right+radius ||
      p[1] < bb.top-radius ||
      p[1] > bb.bottom+radius) {
      // quick bounding box check
    return false;
  }
  if (p[0] > bb.left &&
      p[0] < bb.right &&
      p[1] > bb.top &&
      p[1] < bb.bottom &&
      this.filled) {
    return true;
  }
  var tl = [this.x, this.y],
      tr = [this.x + this.width, this.y],
      bl = [this.x, this.y + this.height],
      br = [this.x + this.width, this.y + this.height];
  return pointNear(p, radius, tl, tr) ||
         pointNear(p, radius, tr, br) ||
         pointNear(p, radius, br, bl) ||
         pointNear(p, radius, bl, tl);
}
DudlEllipse.prototype.lineIntersects = function () {}


function DudlText (x, y, width, height, color, text, font, id) {
  this.x = Math.min(x, x + width);
  this.y = Math.min(y, y + height);
  this.width = Math.abs(width);
  this.height = Math.abs(height);
  this.color = color;
  this.text = text;
  this.font = font.length > 0 ? font : '16px Arial';

  //Keep the interface
  this.r = color.r;
  this.g = color.g;
  this.b = color.b;
  this.a = color.a;
  this.p = [[this.x, this.y], [this.width, this.height]]
  this.p = this.p.concat(Array.prototype.map.call(text, function (l) {return [l.charCodeAt(), 0]}));
  this.t = 'text|' + this.font;
  this.id = (typeof id == 'undefined')? null : id;
}
DudlText.prototype.draw = function (ctx) {
  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    /* from http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/ */
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }
  ctx.fillStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+","+this.color.a+")";
  ctx.font = this.font;
  var fontHeight = parseInt(this.font.replace(/[^0-9]/g, ''))
  wrapText(ctx, this.text, this.x, this.y + fontHeight, this.width, fontHeight*1.3);
}
DudlText.prototype.boundingBox = function () {
  return {
    left: this.x,
    right: this.x + this.width,
    top: this.y,
    bottom: this.y + this.height
  };
}
DudlText.prototype.serializePoints = Shape.prototype.serializePoints;
DudlText.prototype.pointwiseEqualTo = Shape.prototype.pointwiseEqualTo;
DudlText.prototype.pointIntersects = function (p, radius) {
  var bb = this.boundingBox();
  if (p[0] < bb.left-radius ||
      p[0] > bb.right+radius ||
      p[1] < bb.top-radius ||
      p[1] > bb.bottom+radius) {
      // quick bounding box check
    return false;
  }
  if (p[0] > bb.left &&
      p[0] < bb.right &&
      p[1] > bb.top &&
      p[1] < bb.bottom &&
      this.filled) {
    return true;
  }
  var tl = [this.x, this.y],
  tr = [this.x + this.width, this.y],
  bl = [this.x, this.y + this.height],
  br = [this.x + this.width, this.y + this.height];
  return pointNear(p, radius, tl, tr) ||
  pointNear(p, radius, tr, br) ||
  pointNear(p, radius, br, bl) ||
  pointNear(p, radius, bl, tl);
}
DudlText.prototype.lineIntersects = function () {}

////////// 35-tools.js ////////////////

function Tool(mousedown, mousemove, mouseup) {
  this.mousedown = mousedown || function () {};
  this.mousemove = mousemove || function () {};
  this.mouseup   = mouseup   || function () {};
};
Tool.prototype.activate = function (goggles) {
  this.canvas = goggles.canvas;
  this.goggles = goggles;
  this.ctx = goggles.ctx;

  $(this.canvas).css({'cursor': 'crosshair'});

  this.canvas.onmousedown = bind(this, function(ev){
    // Begin drawing a shape until the mouse button is released
    var mdhandler = this.canvas.onmousedown;
    this.mousedown(ev);
    if (this.shapes !== null) {
      this.canvas.onmousedown = null;
      this.canvas.onmouseup   = bind(this, function (ev) {
        this.mouseup(ev);
        this.canvas.onmousedown = mdhandler;
        this.canvas.onmousemove = null;
        this.canvas.onmouseup = null;
      });
      this.canvas.onmousemove = bind(this, this.mousemove);
    }
  });
}
Tool.prototype.makeShape = function (type) {
  var self = this.goggles;
  this.curshape = new Shape(type||self.curBrushSize, self.curColor.r,self.curColor.g,self.curColor.b,1);
  self.waitingShapes.push(this.curshape); // add to our list of shapes we're waiting on
}
Tool.prototype.finishShape = function () {
  this.curshape.simplifyInPlace();
  if (this.curshape.p.length>=2) {
    this.goggles.sendShape(this.curshape);
  }
  //console.log(curshape);
  //self.redraw();
  this.curshape = null;
}

var Tools = {
  Pen: new Tool(function (ev) {
      //mousedown
      if (this.curshape) {this.finishShape(this.curshape);}
      this.makeShape();
    }, function(ev) {
      //mousemove
      this.curshape.appendPoint(this.goggles.untransform(pointsFromEv(ev)));
      if (this.curshape.p.length >= 1000) {
        //curshape.simplifyInPlace();
        this.finishShape(this.curshape);
        this.makeShape();
        this.curshape.appendPoint(this.goggles.untransform(pointsFromEv(ev)));
      }
      this.curshape.drawLast(this.ctx);
    }, function (ev) {
      //mouseup
      this.finishShape(this.curshape);
    }),
  Rectangle: new Tool(function (ev) {
      //mousedown
      this.color = this.goggles.curColor;
      $('<div>').addClass('__dudl_rect').css({
        position: 'absolute',
        'z-index': '100003',
        background: "rgba("+this.color.r+","+this.color.g+","+this.color.b+",1)"
      }).on('mousemove', bind(this, function (ev) {
        if (this.mousemove) {
          this.mousemove(ev.originalEvent);
        }
      })).appendTo($('body'));
    }, function (ev) {
      //mousemove
      this.origin = this.origin || pointsFromEv(ev);
      this.to = pointsFromEv(ev);
      $('div.__dudl_rect').css({
        top: Math.min(this.origin[1], this.to[1]) + window.scrollY,
        left: Math.min(this.origin[0], this.to[0]) + window.scrollX,
        width: Math.abs(this.origin[0] - this.to[0]),
        height: Math.abs(this.origin[1] - this.to[1])
      });
    }, function (ev) {
      //mouseup
      $('div.__dudl_rect').detach();
      var origin = this.goggles.untransform(this.origin);
      var to     = this.goggles.untransform(this.to);
      this.ctx.fillStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+",1)";
      this.ctx.strokeStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+",1)";
      this.ctx.lineWidth = this.goggles.curBrushSize;
      if (this.goggles.shouldFill()) {
        this.ctx.fillRect(origin[0], origin[1], to[0]-origin[0], to[1]-origin[1]);
      } else {
        this.ctx.strokeRect(origin[0], origin[1], to[0]-origin[0], to[1]-origin[1]);
      }
      var shape = new DudlRect(
        origin[0],
        origin[1],
        to[0]-origin[0],
        to[1]-origin[1],
        {r: this.color.r, g: this.color.g, b: this.color.b, a: 1},
        this.goggles.shouldFill(),
        this.goggles.curBrushSize
      );
      this.goggles.waitingShapes.push(shape);
      this.goggles.sendShape(shape);
      this.origin = null;
    }),
  Ellipse: new Tool(function (ev) {
      //mousedown
      this.color = this.goggles.curColor;
    }, function (ev) {
      //mousemove
      this.goggles.redraw();
      this.origin = this.origin || this.goggles.untransform(pointsFromEv(ev));
      this.to = this.goggles.untransform(pointsFromEv(ev));

      var cx = (this.origin[0] + this.to[0])/2,
          cy = (this.origin[1] + this.to[1])/2,
          rx = Math.abs(this.origin[0] - this.to[0])/2,
          ry = Math.abs(this.origin[1] - this.to[1])/2,
          rot = 0,
          sa = 0,
          ea = 2 * Math.PI;
      this.ctx.strokeStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+",1)";
      this.ctx.fillStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+",1)";
      this.ctx.lineWidth = this.goggles.curBrushSize;
      //Ellipse doesn't exist everywhere yet, so we have a backup
      if (this.ctx.ellipse) {
        this.ctx.beginPath();
        this.ctx.ellipse(cx, cy, rx, ry, rot, sa, ea);
      } else {
        this.ctx.save()
        this.ctx.translate(cx, cy);
        this.ctx.beginPath();
        this.ctx.scale(1, ry/rx);
        this.ctx.arc(0, 0, rx, sa, ea);
        this.ctx.restore();
      }
      if (this.goggles.shouldFill()) {
        this.ctx.fill();
      } else {
        this.ctx.stroke();
      }
    }, function (ev) {
      //mouseup
      var origin = this.origin;
      var to     = this.to;
      var shape = new DudlEllipse(
        origin[0],
        origin[1],
        to[0]-origin[0],
        to[1]-origin[1],
        {r: this.color.r, g: this.color.g, b: this.color.b, a: 1},
        this.goggles.shouldFill(),
        this.goggles.curBrushSize
      );
      shape.draw(this.ctx);
      this.goggles.waitingShapes.push(shape);
      this.goggles.sendShape(shape);
      this.origin = null;
    }),
  Eraser: new Tool(function (ev) {
      //mousedown
      this.curpoint = this.goggles.untransform(pointsFromEv(ev));
    }, function (ev) {
      //mousemove
      var curpoint = this.curpoint;
      bind(this.goggles, function(ev) {
        var newpoint = this.untransform(pointsFromEv(ev)),
            removedAShape = false;
        for (var i=0,l=this.shapes.length; i<l; i++) {
          if (this.shapes[i].pointIntersects(newpoint, this.curBrushSize/2) ||
            this.shapes[i].lineIntersects(curpoint, newpoint)) {
            // delete them
            // todo: we don't want to  KEEP the shape but at the same time we
            // also don't want to DISCARD the shape before we know it's been
            // erased.
            // so for now we'll just be sneaky! >:D
            this.sendDeleteShape(this.shapes[i]);
            this.shapes.splice(this.shapes.indexOf(this.shapes[i]), 1);
            i--;
            l--;
            removedAShape = true;
          }
        }
        if (removedAShape) {
          this.redraw();
        }
        curpoint = newpoint;
      })(ev);
      this.curpoint = curpoint;
    }, function (ev) {
      //mouseup

    }),
  Text: new Tool(function (ev) {
      //mousedown
      this.color = this.goggles.curColor;
      this.origin = this.origin || pointsFromEv(ev);
      $('<div>').addClass('__dudl_text').css({
        position: 'absolute',
        'z-index': '100003',
        'border': 'dashed 1px black',
        'color': "rgba("+this.color.r+","+this.color.g+","+this.color.b+",1)",
        'font-size': this.goggles.curBrushSize*3+1 + 'px',
        'font-family': 'Arial, sans-serif'
      }).on('mousemove', bind(this, function (ev) {
        if (this.mousemove) {
          this.mousemove(ev.originalEvent);
        }
      })).appendTo($('body'));
    }, function (ev) {
      //mousemove
      this.origin = this.origin || pointsFromEv(ev);
      this.to = pointsFromEv(ev);
      $('div.__dudl_text').css({
        top: Math.min(this.origin[1], this.to[1]) + window.scrollY,
        left: Math.min(this.origin[0], this.to[0]) + window.scrollX,
        width: Math.abs(this.origin[0] - this.to[0]),
        height: Math.abs(this.origin[1] - this.to[1])
      });
    }, function (ev) {
      //mouseup
      var tool   = this;
      var origin = this.goggles.untransform(this.origin);
      var to     = this.goggles.untransform(this.to);
      $('div.__dudl_text').css({
        'min-width': 100
      })
      .off('mousemove')
      .attr('contentEditable', true)
      .blur(function() {
        //Here's where we create a DudlText and render it
        var size = tool.goggles.curBrushSize*3+1;
        var family = 'Arial';
        var shape = new DudlText(
          origin[0],
          origin[1],
          to[0]-origin[0],
          to[1]-origin[1],
          {r: tool.color.r, g: tool.color.g, b: tool.color.b, a: 1},
          $(this).text(),
          '' + size + 'pt ' + family
        );
        tool.goggles.waitingShapes.push(shape);
        tool.goggles.sendShape(shape);
        $(this).detach();
        tool.origin = null;
      })
      .focus();
    })
};

////////// 40-goggles.js ////////////////

/*jslint bitwise:false */
/*globals getUrl picker bind Picker Shape pointsFromEv */

// GOGGLES
function Goggles(ajaxroot) {
  // Here is our goggles object.

  var dudl = this;
  var activate_tool = function () {
    if (!dudl.user || !dudl.user.capabilities.advanced_tools) return;
    for (key in dudl.picker.tools) {
      dudl.picker.tools[key].css({'background': 'none'});
    }
    this.css({'background-color': '#333'});
    this.tool.activate(dudl);
  };

  var upgradeFunc = function () {
    window.open(window.GOGGLE_SERVER.replace('page', 'user/upgrade'));
  }

  var self = this;
  var showLoggedIn = function (__x, user)
  {
    console.log("Showing logged in: " + JSON.stringify(user));
    self.user = user;
    var show = !!user && user.capabilities.add_shapes;
    if (show) {
      //self.picker.loginJq.hide();
      self.picker.registerJq.hide();
      self.picker.reconnectJq.find('span').text('drawing publicly');
      if (self.user.capabilities.private_zones)
        self.picker.reconnectJq.find('a').text('switch');
      else
        self.picker.reconnectJq.find('a').text('upgrade');

      //Show the tools
      self.picker.tools.$pen.show().click();
      self.picker.tools.$eraser.show();
      self.picker.tools.$rect.show();
      self.picker.tools.$ellipse.show();
      self.picker.tools.$text.show();

      //Show the sharing feature
      if (self.user.capabilities.sharing)
        self.picker.shareJq.show();
      else
        self.picker.shareJq.hide();

      if (self.user.capabilities.advanced_tools) {
        self.picker.tools.$pen.css({'text-decoration': 'none'}).attr('title', '').off('click').click(bind(self.picker.tools.$pen, activate_tool));
        self.picker.tools.$eraser.css({'text-decoration': 'none'}).attr('title', '').off('click').click(bind(self.picker.tools.$eraser, activate_tool));
        self.picker.tools.$rect.css({'text-decoration': 'none'}).attr('title', '').off('click').click(bind(self.picker.tools.$rect, activate_tool));
        self.picker.tools.$ellipse.css({'text-decoration': 'none'}).attr('title', '').off('click').click(bind(self.picker.tools.$ellipse, activate_tool));
        self.picker.tools.$text.css({'text-decoration': 'none'}).attr('title', '').off('click').click(bind(self.picker.tools.$text, activate_tool));
      } else {
        self.picker.tools.$pen.css({'text-decoration': 'line-through'}).attr('title', 'Upgrade to use these features (click to upgrade)').off('click').click(upgradeFunc);
        self.picker.tools.$eraser.css({'text-decoration': 'line-through'}).attr('title', 'Upgrade to use these features (click to upgrade)').off('click').click(upgradeFunc);
        self.picker.tools.$rect.css({'text-decoration': 'line-through'}).attr('title', 'Upgrade to use these features (click to upgrade)').off('click').click(upgradeFunc);
        self.picker.tools.$ellipse.css({'text-decoration': 'line-through'}).attr('title', 'Upgrade to use these features (click to upgrade)').off('click').click(upgradeFunc);
        self.picker.tools.$text.css({'text-decoration': 'line-through'}).attr('title', 'Upgrade to use these features (click to upgrade)').off('click').click(upgradeFunc);
      }
      self.picker.reconnectJq.find('a').show();
      self.picker.logoutJq.show();
      self.picker.loginJq.hide();
      //self.picker.welcomeJq.text('welcome, ' + user.username).show();
      $(self.canvas).css({cursor: 'default'}).attr({'title': null});
      self.picker.$collab.show();
    } else {
      self.picker.reconnectJq.find('span').text('drawing locally');
      self.picker.reconnectJq.find('a').text('log in');
      self.picker.logoutJq.hide();

      //Hide the tools
      self.picker.tools.$pen.hide();
      self.picker.tools.$eraser.hide();
      self.picker.tools.$rect.hide();
      self.picker.tools.$ellipse.hide();
      self.picker.tools.$text.hide();

      //Hide the sharing feature
      self.picker.shareJq.hide();

      self.picker.$collab.hide();
      self.picker.loginJq.show();
      self.picker.registerJq.show();
      $(self.canvas).css({cursor: 'not-allowed'}).attr({'title': 'You must be logged in for your changes to be saved'});
    }
    self.updateCollabLink();
    self.url = getUrl();
    self.connect();
  }

  this.canvas = $("<canvas>").css({
    position: "fixed",
    "z-index": "100000",
    top: "0",
    left: "0",
    "pointer-events": "auto"
  }).appendTo(document.body)[0];

  this.url = getUrl();
  this.serverUrl = ajaxroot;//+"?callback=?";
  this.user = false;

  this.ctx = this.canvas.getContext('2d');

  this.shapes = null;
  // the list of shapes to draw.

  this.waitingShapes = [];
  // the list of shapes we've sent to the server but haven't heard back about.

  this.active = true;
  // used to find out whether we've stopped or not

  this.historyStream = null;

  // Center coordinate
  // Guess at where the text probably is
  this.centerCoord = 0;

  // Color picker
  this.curColor = {r:0,g:0,b:0};
  this.curBrushSize = 5;
  this.picker = new Picker(bind(this,function(color){
      this.curColor = color;
    }), bind(this,function(size){
      this.curBrushSize = size;
    }));

  this.picker.shareJq.click(bind(this, function(ev) {
    var self = this;
    if (!this.user) {
      this.login
      .message('To share to the gallery, you need to log in')
      .show(function(user) {
        self.login.del();
        showLoggedIn(true, user);
        self.share();
      }, function() {
        //Need to do anything here?
      });
    } else {
      //No need to log in
      this.share();
    }
    return false;
  }));

  this.level = 0;
  this.picker.reconnectJq.find('a').click(bind(this, function() {
    //console.log("Clicked the link");
    if (this.user && this.level > 0) { //"switch", Switch to public
      //console.log("Switch to public drawing");
      this.level = 0;
      this.url = getUrl();
      this.picker.reconnectJq.find('span').text('drawing publicly');
      this.connect();
      this.updateCollabLink();
    } else if (this.user && this.user.capabilities.private_zones) { //"switch", Switch to private
      //console.log("Switch to private drawing");
      this.level = 1;
      this.url = this.user.username + '@' + getUrl();
      this.picker.reconnectJq.find('span').text('drawing privately');
      this.connect();
      this.updateCollabLink();
    } else if (this.user) { //"upgrade"
      //console.log("Open upgrade page");
      window.open(window.GOGGLE_SERVER.replace('page', 'user') +'/upgrade', '_blank');
    } else { //"log in"
      //console.log("Log in");
      this.do_login();
    }
  }));

  //Login used to be its own button
  this.do_login = bind(this, function(ev) {
    var self = this;
    this.login.show(function(user) {
      self.login.del();
      //Do something to indicate that you're logged in!
      showLoggedIn(true, user);
    }, function() {
      //Need to do anything here?
      showLoggedIn(false, false);
    });
    return false;
  });

  this.picker.loginJq.click(this.do_login);

  this.picker.registerJq.click(function(){
    var win = window.open(window.GOGGLE_SERVER.replace('page', 'register'), '_blank');
  })
  this.picker.logoutJq.click(bind(this, function(ev) {
    var self = this;
    this.logout(function () {
      showLoggedIn(false, false);
      self.url = getUrl();
      self.connect();
    })
  }));

  this.login = new LoginBox();

  // Events
  this.canvas.oncontextmenu = function(){ return false; };

  //Tools
  this.picker.tools.$pen.tool = Tools.Pen;
  this.picker.tools.$rect.tool = Tools.Rectangle;
  this.picker.tools.$ellipse.tool = Tools.Ellipse;
  this.picker.tools.$eraser.tool = Tools.Eraser;
  this.picker.tools.$text.tool = Tools.Text;

  for (idx in this.picker.tools) {
    var $picker = this.picker.tools[idx];
    $picker.click(bind($picker, activate_tool));
  }

  this.picker.tools.$pen.click();
  //Tools.Pen.activate(this);
  //Tools.Rectangle.activate(this.canvas, this, this.ctx);

  this.picker.$close.click(bind(this, this.stop));

  // Window resize and scroll handlers
  this.resizeTimer = null;
  window.onresize = bind(this, function() {
    // Resize later
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(bind(this, this.resizeCanvas), 100);
  });
  window.onscroll = bind(this, this.redraw);
  this.resizeCanvas();

  // And connect
  //this.connect(bind(this, function(){
    if (!window.GOGGLES_READONLY) {
      this.picker.show();
      //if it's read-only, we don't care if the user is logged in
      this.getCapabilities(function (data) {
        showLoggedIn(true, data);
      });
    }
  //}));
}

Goggles.prototype.stop = function() {
  // Destroy a goggles object with optional callback
  this.active = false;
  this.picker.del();
  this.login.del();
  window.onresize = null;
  window.onscroll = null;
  if (this.historyStream) {
    this.historyStream.stop();
  }
  clearTimeout(this.resizeTimer);
  $(this.canvas).fadeOut('fast', bind(this, function() {
      $(this.canvas).remove();
    }));
};
Goggles.prototype.transform = function(p) {
  // Point transformation functions
  // Establish a new coordinate system. (0, 0) is at the top MIDDLE of
  // the page, +x is right and -x is left.
  // This accomodates pages that have fixed-width or centered layouts.
  // todo: actually I would really like this to be relative to either
  // the left of the content or the middle of the page.
  //
  // Given an absolute point in our new coordinate system, return the
  // point's position on the screen
  return [
    p[0]-window.scrollX + this.centerCoord,
    p[1]-window.scrollY
  ];
};
Goggles.prototype.untransform = function(p) {
  // Given an point wrt the screen, return the point's absolute position
  // wrt our coordinate system
  return [
    p[0]+window.scrollX - this.centerCoord,
    p[1]+window.scrollY
  ];
};
Goggles.prototype.recalculateCenter = function() {
  // this calculates what X-coordinate will be the 'focus' of our web
  // page.
  //
  // essentially, we want our x=0 coordinate to be the left edge of the
  // content. this works reasonably well in practice except for
  // dynamically generated things and line wrapping.

  this.centerCoord = (
    ($("#header").offset() || {left:0}).left ||
    ($(".header").offset() || {left:0}).left ||
    ($(".inner").offset()  || {left:0}).left ||
    ($(".content").offset()|| {left:0}).left ||
    ($("#content").offset()|| {left:0}).left ||

    // hackernews
    ($("body>center>table").offset()||{left: 0}).left ||
    // table-based layouts
    ($("body>table").offset()||{left: 0}).left ||

    // gogole results pages
    ($("#center_col").offset()||{left:0}).left ||

    (this.canvas.width/2)
  );
};

Goggles.prototype.shouldFill = function () {
  return this.picker.$fill.hasClass('filled');
}

Goggles.prototype.updateCollabLink = function () {
  var url = GOGGLE_SERVER.replace('/page', '/live/') + encodeURIComponent(this.url);
  this.picker.$collab.text('Others can draw with you at: ')
    .append($('<a>', {href: url, target: '_blank'}).css({
      'color': '#fff'
    }).text(url));
}

////////// 60-canvas-rendering.js ////////////////

/*globals Goggles */
// Drawing functions
Goggles.prototype.redraw = function() {
  // Redraw entire canvas
  if (this.shapes === null) {
    this.drawLoading();
  } else {
    var ctx = this.ctx;
    // clear
    this.resetCanvasXform();
    var toDraw = this.shapes.concat(this.waitingShapes);
    for (var i=0,l=toDraw.length; i<l; i++) {
      var bb = toDraw[i].boundingBox();
      // clip invisible shapes
      if (bb.right - window.scrollX + this.centerCoord > 0 &&
          bb.left - window.scrollX + this.centerCoord < this.canvas.width &&
          bb.bottom - window.scrollY > 0 &&
          bb.top - window.scrollY < this.canvas.height) {
        toDraw[i].draw(ctx);
      }
    }
  }
};
Goggles.prototype.resetCanvasXform = function() {
  this.ctx.setTransform(1,0,
                        0,1,  0, 0);
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.setTransform(1,0,
                        0,1,
    this.centerCoord-window.scrollX,
    -window.scrollY);
};
Goggles.prototype.resizeCanvas = function() {
  // Fix the canvas when resized
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.recalculateCenter();
  this.redraw();
};

// Loading... screen
Goggles.prototype.drawLoading = function() {
  this.ctx.setTransform(1,0,
                        0,1,  0, 0);
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.fillStyle = "rgba(128,128,128,0.2)";
  this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
};

////////// 75-ajax.js ////////////////

/*globals Goggles Shape */
// AJAX functions
//
// TODO: handle timeouts
function ajaxRequest(url, data, cb) {
  if (this.user) data.__goggles_authToken = this.user.auth_token;
  // just like jQuery.getJSON but unlike jquery, this handles timeouts in a sane way.
  return $.ajax({
    url: url,
    //dataType: 'json',
    dataType: 'jsonp',
    jsonp: 'jsonp',
    data: data,
    xhrFields: {withCredentials: true},
    success:
      function(data, textStatus) {
        if (typeof data == 'object' && 'exception' in data) {
          alert("An error appears: " + data.exception);
        } else {
          cb(data, textStatus);
        }
      },
    error:
      function(xhr, e, exception) {
        if (e == 'timeout') {
          ajaxRequest(url, data, cb);
        } else {
          //alert("Network error: " + e);
        }
      }
  });
}
function StreamingHistory(url, data, startTime, cb) {
  // todo: the server shouldn't take longer than 10s so timeout after 12s.
  // note that we need to properly handle cases where the server sends us
  // something eventually after we've requested the next batch (remember: we
  // gotta ignore the first response). We also need some way of notifying the
  // user thaht their connection is fuzzy and when/if they were able to
  // reconnect.

  // This object will run a callback when something on the server changes.
  // Give it a URL to ping and a callback to execute whenever that
  // happens and it'll go on its way. Whenever the server does something,
  // the callback will run with the server's response. This is done in such
  // a way so you won't ever skip history you missed.
  // See: history.js
  this.cb = cb;
  this.url = url;
  this.data = data;
  this.time = startTime;

  this.active = true;

  var self = this;
  this.nextHist();
}
StreamingHistory.prototype.nextHist = function() {
  // Carry out the next action in the history, calling callback if we get
  // anything.
  if (!this.active) {
    return;
  }
  var self = this;
  this.data.stream = this.time;
  this.xhr = ajaxRequest(this.url, this.data,
    function (actions) {
      if (!self.active) {
        return;
      }
      for (var i = 0, l = actions.length; i < l; i++) {
        self.cb(actions[i]);
        self.time++;
      }
      self.nextHist();
    });
};
StreamingHistory.prototype.stop = function() {
  // Stop current request and stop streaming from the server.
  // TODO: this doesn't actually work because JSONP requests are nothing more
  // than adding <script> tags at the end of the document which are loaded and
  // executed serially. :<
  this.active = false;
  if (this.xhr !== undefined) {
    this.xhr.abort();
  }
};

function deleteShape(list, shape) {
  // Delete the shape given by 'shape' from the list.
  // Note that the shapes are not referentially identical
  for (var i=0,l=list.length; i<l; i++) {
    if (shape.pointwiseEqualTo(list[i])) {
      list.splice(i, 1);
      break;
    }
  }
}

function deleteShapeWithID(list, id) {
  // Delete the shape with the certain ID from the list.
  // Note that the shapes are not referentially identical
  for (var i=0,l=list.length; i<l; i++) {
    if (list[i].id == id) {
      list.splice(i, 1);
      i--; l--;
      break;
    }
  }
}

Goggles.prototype.connect = function(cb) {
  // Initial connection from the server.
  cb = cb || function(){};
  var self = this;
  ajaxRequest(this.serverUrl, {
      page: this.url
    }, function(json) {
      if (json.err) {
        alert(json.err);
        return self.stop();
      }
      if (self.active) {
        // collect things
        self.shapes = json.shapes.map(Shape.fromJSON);
        self.redraw();
        cb();
        self.historyStream = new StreamingHistory(self.serverUrl, {page: self.url},
          json.nextUpdate,
          function(event) {
            if (event.add_shape) {
              var shape = Shape.fromJSON(event.add_shape);
              self.shapes.push(shape);
              deleteShape(self.waitingShapes, shape);
              self.redraw();
            } else if (event.delete_shape) {
              deleteShapeWithID(self.shapes, parseInt(event.delete_shape, 10));
              self.redraw();
            }
          });
      }
    });
};
Goggles.prototype.sendShape = function(shape) {
  // todo: find a way of telling that we couldn't send the shape and
  // recovering
  var self = this;
  ajaxRequest(this.serverUrl, {
      page: this.url, add: 't', title: document.title.replace(/'/g,""),
      r: shape.r, g:shape.g, b:shape.b, a:shape.a,t:shape.t,
      p:shape.serializePoints()},
    function(data){
      if (data && data.err) {
        alert("There was a problem sending the shapes to the server.");
        self.stop();
      }
    });
};
Goggles.prototype.sendDeleteShape = function(shape) {
  // todo: find a way of telling that we couldn't erase the shape and
  // recovering
  var self = this;
  if (shape.id === null) { return; }
  ajaxRequest(this.serverUrl, {
      page: this.url, del: 't', title: document.title.replace(/'/g,""),
      id: shape.id},
    function(data){
      if (data && data.err) {
        alert("There was a problem deleting the shape.");
        self.stop();
      }
    });
};
Goggles.prototype.share = function() {
  var self = this;
  this.picker.shareJq.text('').css({"background": "url("+window.GOGGLE_SERVER+"/../img/spinner.gif) center no-repeat"});
  // cheesy camera flash :)
  $("<div>").css({
        position: "fixed",
        "z-index": "100001",
        top: "0",
        left: "0",
        "background-color":"#fff",
        width: $(window).width(), height: $(window).height(),
        "pointer-events": "auto"
  }).appendTo(document.body).fadeOut(function(){$(this).remove();});
  ajaxRequest(this.serverUrl.replace('page', 'share'), {
      page: this.url,
      title: document.title.replace(/'/g,""),
      x: $(window).scrollLeft(),
      y: $(window).scrollTop(),
      w: $(window).width(),
      h: $(window).height()
    },
    function(data){
      if (data && data.err) {
        self.picker.shareJq.text('share').css({"background": "none"});
        alert("There was a problem sharing the page.");
      } else {
        self.claim(data.fileId, data.date, function() {
          self.picker.shareJq.text('share').css({"background": "none"});
          self.picker.sharedAtJq.text(data.url).show('fast');
          self.picker.flashShareJqBanner();
        });
      }
    });
};
Goggles.prototype.claim = function(fileId, date, cb) {
  var self = this;
  $.ajax({
    type: 'POST',
    url: window.GOGGLE_SERVER.replace('page', 'claim'),
    dataType: 'json',
    crossDomain: true,
	xhrFields: {withCredentials: true},
    data: {
      __goggles_authToken: this.user.auth_token,
      fileId: fileId,
      date: date
    },
    success: function(data) {
      cb();
    }
  });
}
Goggles.prototype.logout = function(cb) {
  ajaxRequest(window.GOGGLE_SERVER.replace('page', 'user/logout'), {}, function (data, status) {
    cb(data);
  });
}
Goggles.prototype.getCapabilities = function(cb) {
  ajaxRequest(window.GOGGLE_SERVER.replace('page', 'user'), {}, function (data, status) {
    cb(data);
  });
}

////////// 95-bootstrap.js ////////////////

/*globals Goggles */
window.goggles = new Goggles(window.GOGGLE_SERVER);


////////// 99-foot.js ////////////////

})(jQuery);}

if (typeof window.goggles == 'undefined') {
  // First time: we want to load OUR version of jquery
  var jQ = document.createElement('script');
  jQ.type = 'text/javascript';
  jQ.onload=activateGoggles;
  jQ.src = '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
  document.body.appendChild(jQ);
} else {
  // Subsequent loads: we already have our jquery so it should be fine
  activateGoggles();
}

//Unminified js seems to get that last brace cut of
