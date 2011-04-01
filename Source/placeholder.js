/*
---
description: This simple plugin provides HTML 5 placeholder attribute to all browsers.

license: MIT-style

authors:
- Marcel Miranda

requires:
  core/1.2.4: '*'

provides:
  RK.InputPlaceholder

...
*/
var RK = RK || {};

RK.InputPlaceholder = {
	
	cssClass: 'placeholder',
	inputSelector: 'input[placeholder]',
	elements: null,
	
	initialize: function() {
		this.setInputSelector();
	},
	
	setCssClass: function(cssClass) {
		this.cssClass = cssClass;
		
	},
	
	setInputSelector: function(inputSelector) {
		if(inputSelector) this.inputSelector = inputSelector;
		if(this.elements) {
			this.elements.removeEvent('focus', this.inputFocus);
			this.elements.removeEvent('blur', this.inputBlur);
		}
		
		this.elements = $$(this.inputSelector);
		this.elements.addEvents({
			focus: this.inputFocus,
			blur: this.inputBlur
		})
	},
	
	inputFocus: function(e) {
		console.log(e.target);
	},
	
	inputBlur: function(e) {
		console.log(e.target);
	}
	
}

// Automatically initialize
if( !('placeholder' in new Element('input')) ) {
	document.addEvent('domready', function() {
		RK.InputPlaceholder.initialize();
	});
}

