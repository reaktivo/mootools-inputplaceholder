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
		this.placeholderSubmitPrevent();
		this.updateAllInputs();
		if(console) console.log(this);
	},
	
	updateAllInputs: function() {
		this.elements.each(function(el) {
			this.updateInput(el, true);
		}, this);
	},
	
	setCssClass: function(cssClass) {
		this.cssClass = cssClass;
		
	},
	
	setInputSelector: function(inputSelector) {
		if(inputSelector) this.inputSelector = inputSelector;
		if(this.elements) {
			this.elements.removeEvent('focus', this.inputFocus.bind(this));
			this.elements.removeEvent('blur', this.inputBlur.bind(this));
		}
		
		this.elements = $$(this.inputSelector);
		this.elements.addEvents({
			focus: this.inputFocus,
			blur: this.inputBlur
		});
		
	},
	
	inputFocus: function(e) {
		this.updateInput(e.target, true);
	},
	
	inputBlur: function(e) {
		this.updateInput(e.target, false);
	},
	
	updateInput: function(el, focus) {
	
		var placeholder = el.get('placeholder'),
			value = el.get('value');
		
		if(placeholder == value || value == '') {
			el.addClass(this.cssClass);
			el[focus ? 'removeClass' : 'addClass'](this.cssClass);
			el.set('value', focus ? '' : placeholder);	
		}
	},
	
	placeholderSubmitPrevent: function() {
		$$('form').addEvent('submit', function(e) {
			this.getElements(inputSelector).each(function(input) {
				if(input.value == input.get('placeholder')) {
					input.set('value', '');
				}
			});
		});
	}
	
}

// Automatically initialize
//if( !('placeholder' in new Element('input')) ) {
	document.addEvent('domready', function() {
		RK.InputPlaceholder.initialize();
	});
//}

