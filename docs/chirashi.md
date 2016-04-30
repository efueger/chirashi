# Global





* * *

### getSelectorAll(selector) 

Get array of dom elements from selector.

**Parameters**

**selector**: `string`, The query selector

**Returns**: `Array`, domElements - The dom elements matching selector


### isDomElement(element) 

Test if element is a dom element.

**Parameters**

**element**: `HTMLElement | window | document | SVGElement`, If element doesn't match of this types false will be returned

**Returns**: `bool`, isDomElement - true if element is a dom element, false otherwise


### getSelector(selector) 

Get a dom element from selector.

**Parameters**

**selector**: `string`, The query selector

**Returns**: `HTMLElement | window | document | SVGElement`, domElement - The first dom element matching selector


### getElement(element) 

Get Dom Element from iterable or selector.

**Parameters**

**element**: `string | Array | HTMLElement | window | document | SVGElement`, The iterable or selector

**Returns**: `HTMLElement | window | document | SVGElement`, domElement - The dom element from element


### forEach$1(elements, callback, forceOrder) 

Iterates over elements and apply callback on each one.

**Parameters**

**elements**: `string | Array | NodeList | HTMLCollection`, The iterable

**callback**: `function`, The function to call for each iteratee

**forceOrder**: `bool`, Respect elements order

**Returns**: `string | Array | NodeList | HTMLCollection`, elements for chaining


### getElements(elements) 

Get Dom Element from iterable or selector.

**Parameters**

**elements**: `string | Array | HTMLElement | window | document | SVGElement`, The iterable or selector

**Returns**: `HTMLElement | window | document | SVGElement`, domElements - The dom elements from elements


### forElements(elements, callback, forceOrder) 

Iterates over dom elements and apply callback on each one.

**Parameters**

**elements**: `string | Array | NodeList | HTMLCollection`, The iterable or selector

**callback**: `function`, The function to call for each iteratee

**forceOrder**: `bool`, Respect elements order

**Returns**: `string | Array | NodeList | HTMLCollection`, elements for chaining


### forIn(object, callback, forceOrder) 

Iterates over object's keys and apply callback on each one.

**Parameters**

**object**: `Object`, The iterable

**callback**: `function`, The function to call for each iteratee

**forceOrder**: `bool`, Respect keys order

**Returns**: `Object`, object - The iterable for chaining


### addClass(elements, classes) 

Add all classes on each elements.

**Parameters**

**elements**: `string | Array | NodeList | HTMLCollection`, The iterable or selector

**classes**: `string`, The classes seperated with spaces

**Returns**: `string | Array | NodeList | HTMLCollection`, elements - The iterable for chaining


### createElement(string, attributes) 

Create a dom element from an HTML string or tag.

**Parameters**

**string**: `string | HTMLElement | SVGElement`, The html string or tag

**attributes**: `object`, The object of attributes

**Returns**: `HTMLElement | SVGElement`, element - The dom element created from the string


### append(elements, node) 

Append node to each element of elements.

**Parameters**

**elements**: `string | Array | NodeList | HTMLCollection`, The iterable or selector

**node**: `string | HTMLElement | SVGElement`, Dom element or html string or tag to create it

**Returns**: `string | Array | NodeList | HTMLCollection`, elements - The iterable for chaining


### setAttr(elements, attributes) 

Set attributes from attributes object keys to values on elements

**Parameters**

**elements**: `string | Array | NodeList | HTMLCollection`, The iterable or selector

**attributes**: `Object`, attribute names and values association

**Returns**: `string | Array | NodeList | HTMLCollection`, elements - The iterable for chaining


### getAttr(element, name) 

Get value of the name attribute on element.

**Parameters**

**element**: `string | HTMLElement | window | document | SVGElement`, The selector or dom element

**name**: `string`, The attribute's name

**Returns**: `string`, value - The value for the attribute


### attr(elements, option) 

Get attribute option from element if option is a string,
set attributes from option keys to option values on elements
if option is an object.

**Parameters**

**elements**: `string | Array | HTMLElement | window | document | SVGElement`, The iterable, selector or dom element

**option**: `string | Object`, attribute name or attribute names and values association

**Returns**: `string | Array | HTMLElement | window | document | SVGElement`, value or elements - Value for option attribute or elements for chaining


### clone(element) 

Clone element.

**Parameters**

**element**: `string | HTMLElement | SVGElement`, The dom element or selector

**Returns**: `HTMLElement | SVGElement`, clone - The clone of element


### closest(element, tested, level) 

Get closest element matching the tested value traveling up the DOM tree from element.

**Parameters**

**element**: `string | HTMLElement | SVGElement`, The dom element or selector

**tested**: `string | HTMLElement | SVGElement`, The selector or dom element to match

**level**: `Object`, The value is incremented for each parent tested

**Returns**: `bool | HTMLElement | SVGElement`, matchedElement - The matched element or false


### setData(elements, attributes) 

Set data attributes from attributes object keys to values on elements

**Parameters**

**elements**: `string | Array | NodeList | HTMLCollection`, The iterable or selector

**attributes**: `Object`, attribute names and values association

**Returns**: `string | Array | NodeList | HTMLCollection`, elements - The iterable for chaining


### getData(element, name) 

Get value of the name date attribute on element.

**Parameters**

**element**: `string | HTMLElement | window | document | SVGElement`, The selector or dom element

**name**: `string`, The data attribute's name

**Returns**: `string`, value - The value for the data attribute


### data(elements, option) 

Get data attribute option from element if option is a string,
set data attributes from option keys to option values on elements
if option is an object.

**Parameters**

**elements**: `string | Array | HTMLElement | window | document | SVGElement`, The iterable, selector or dom element

**option**: `string | Object`, data attribute name or data attribute names and values association

**Returns**: `string | Array | HTMLElement | window | document | SVGElement`, value or elements - Value for option data attribute or elements for chaining


### setHtml(elements, string) 

Set inner html of elements to string.

**Parameters**

**elements**: `string | Array | NodeList | HTMLCollection`, The iterable or selector

**string**: `string`, The content to inject in the elements

**Returns**: `string | Array | NodeList | HTMLCollection`, elements - The iterable for chaining


### empty(elements) 

Remove children of provided dom elements.

**Parameters**

**elements**: `string | Array | HTMLElement | window | document | SVGElement`, The iterable, selector or dom element

**Returns**: `string | Array | HTMLElement | window | document | SVGElement`, elements - The iterable for chaining


### filter(elements, tested) 

Filter items matching the tested value from elements.

**Parameters**

**elements**: `string | Array | HTMLElement | window | document | SVGElement`, The iterable, selector or dom element

**tested**: `string | HTMLElement | SVGElement`, The selector or dom element to match



### findOne(element, selector) 

Find the first element's child matching the selector.

**Parameters**

**element**: `string | HTMLElement | window | document | SVGElement`, The selector or dom element

**selector**: `string`, The selector

**Returns**: `HTMLElement | SVGElement`, element - The first child of element matching the selector


### find(element, selector) 

Find the element's children matching the selector.

**Parameters**

**element**: `string | HTMLElement | window | document | SVGElement`, The selector or dom element

**selector**: `string`, The selector

**Returns**: `Array`, elements - The children of element matching the selector


### getHtml(element) 

Get the inner html of the element.

**Parameters**

**element**: `string | HTMLElement | SVGElement`, The selector or dom element

**Returns**: `string`, innerHTML - The inner html of the element


### getProp(element, name) 

Get the value for the property name on the element.

**Parameters**

**element**: `string | HTMLElement | window | document | SVGElement`, The selector or dom element

**name**: `string`, The name of the property

**Returns**: `string`, innerHTML - The inner html of the element


### hasClass(element, classes) 

Test if element has all the classes.

**Parameters**

**element**: `string | HTMLElement | window | document | SVGElement`, The selector or dom element

**classes**: `string`, The classes seperated with spaces

**Returns**: `bool`, hasClass - True if element has all the classes, false otherwise


### html(elements, string) 

Set inner html of elements if string is provided, get it otherwise.

**Parameters**

**elements**: `string | Array | NodeList | HTMLCollection`, The iterable or selector

**string**: `string`, The content to inject in the elements

**Returns**: `string | Array | HTMLElement | window | document | SVGElement`, innerHTML or elements - The inner html of the elements or elements for chaining


### indexInParent(element) 

Get the position of element in his parent's children.

**Parameters**

**element**: `string | HTMLElement | SVGElement`, The selector or dom element

**Returns**: `number`, index - The position of element in his parent's children


### insertAfter(elements, node) 

Insert node to each element's parent of elements after element.

**Parameters**

**elements**: `string | Array | NodeList | HTMLCollection`, The iterable or selector

**node**: `string | HTMLElement | SVGElement`, Dom element or html string or tag to create it

**Returns**: `string | Array | NodeList | HTMLCollection`, elements - The iterable for chaining


### insertBefore(elements, node) 

Insert node to each element's parent of elements after element.

**Parameters**

**elements**: `string | Array | NodeList | HTMLCollection`, The iterable or selector

**node**: `string | HTMLElement | SVGElement`, Dom element or html string or tag to create it

**Returns**: `string | Array | NodeList | HTMLCollection`, elements - The iterable for chaining


### next(element) 

Get the next sibling of element.

**Parameters**

**element**: `string | HTMLElement | SVGElement`, The selector or dom element

**Returns**: `HTMLElement | SVGElement`, element - The next element


### parent(element) 

Get the parent node of the element.

**Parameters**

**element**: `string | HTMLElement | SVGElement`, The selector or dom element

**Returns**: `HTMLElement | SVGElement`, element - The parent node


### prev(element) 

Get the previous sibling of element.

**Parameters**

**element**: `string | HTMLElement | SVGElement`, The selector or dom element

**Returns**: `HTMLElement | SVGElement`, element - The previous element


### setProp(elements, props) 

Set properties from props object keys to values on elements

**Parameters**

**elements**: `string | Array | NodeList | HTMLCollection`, The iterable or selector

**props**: `Object`, properties names and values association

**Returns**: `string | Array | NodeList | HTMLCollection`, elements - The iterable for chaining


### prop(elements) 

Get property option from element if option is a string,
set properties from option keys to option values on elements
if option is an object.

**Parameters**

**elements**: `string | Array | HTMLElement | window | document | SVGElement`, The iterable, selector or dom element

**Returns**: `string | Array | HTMLElement | window | document | SVGElement`, value or elements - Value for option property or elements for chaining


### removeClass(elements, classes) 

Remove all classes on each elements.

**Parameters**

**elements**: `string | Array | NodeList | HTMLCollection`, The iterable or selector

**classes**: `string`, The classes seperated with spaces

**Returns**: `string | Array | NodeList | HTMLCollection`, elements - The iterable for chaining


### remove(elements) 

Remove all elements from dom.

**Parameters**

**elements**: `string | Array | NodeList | HTMLCollection`, The iterable or selector

**Returns**: `string | Array | NodeList | HTMLCollection`, elements - The removed elements


### toggleClass(elements, classes) 

Toggle all classes on each elements.

**Parameters**

**elements**: `string | Array | NodeList | HTMLCollection`, The iterable or selector

**classes**: `string`, The classes seperated with spaces

**Returns**: `string | Array | NodeList | HTMLCollection`, elements - The iterable for chaining


### drag(elements, move, begin, end) 

Bind drag listener on each element of elements.

**Parameters**

**elements**: `string | Array | NodeList | HTMLCollection`, The iterable or selector

**move**: `function`, The move callback

**begin**: `function`, The begin callback

**end**: `function`, The end callback

**Returns**: `object`, undragProperties - The object to pass to undrag for unbinding



* * *










