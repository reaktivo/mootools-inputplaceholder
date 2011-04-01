
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
	inputSelector: 'input[placeholdern]',
	elements: null,
	occlude: 'rk-inputplaceholder-occlude',
	
	initialize: function() {
		this.placeholderSubmitPrevent();
		this.updateAllInputs();

	},
	
	updateAllInputs: function() {
			
		this.elements = $$(this.inputSelector);
		this.elements.each(function(el) {
			this.updateInput(el);
			
			if(!el.retrieve(this.occlude)) {
				el.addEvents({
					focus: this.inputFocus.bind(this),
					blur: this.inputBlur.bind(this)
				});
				el.store(this.occlude, true);
			}
			
		}, this);
		
	},
		
	inputFocus: function(e) {
		this.updateInput(e.target, true);
	},
	
	inputBlur: function(e) {
		this.updateInput(e.target, false);
	},
	
	updateInput: function(el, focus) {
	
		var placeholder = el.get('placeholdern'),
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
				if(input.value == input.get('placeholdern')) {
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

