var RK=RK||{};RK.InputPlaceholder={cssClass:"placeholder",inputSelector:"input[placeholder]",elements:null,occlude:"rk-inputplaceholder-occlude",initialize:function(){this.placeholderSubmitPrevent();this.updateAllInputs()},updateAllInputs:function(){this.elements=$$(this.inputSelector);this.elements.each(function(a){this.updateInput(a);if(!a.retrieve(this.occlude)){a.addEvents({focus:this.inputFocus.bind(this),blur:this.inputBlur.bind(this)});a.store(this.occlude,true)}},this)},inputFocus:function(a){this.updateInput(a.target,true)},inputBlur:function(a){this.updateInput(a.target,false)},updateInput:function(b,a){var d=b.get("placeholder"),c=b.get("value");if(d==c||c==""){b.addClass(this.cssClass);b[a?"removeClass":"addClass"](this.cssClass);b.set("value",a?"":d)}},placeholderSubmitPrevent:function(){$$("form").addEvent("submit",function(a){this.getElements(inputSelector).each(function(b){if(b.value==b.get("placeholder")){b.set("value","")}})})}};if(!("placeholder" in new Element("input"))){document.addEvent("domready",function(){RK.InputPlaceholder.initialize()})};