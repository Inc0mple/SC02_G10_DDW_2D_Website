// Transcrypt'ed from Python, 2021-11-25 20:48:41
var random = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_random__ from './random.js';
__nest__ (random, '', __module_random__);
var __name__ = '__main__';
export var icuPred = false;
export var meanList = [175.098171, 30853510, 58.596521, 0.899823];
export var stdList = [216.521299, 58756310, 16.010481, 0.049789];
export var defaultFeatureValHtml = '\n<input id="featureVal1" type="number" step="any" class="featureValInput" name="featureVal1" placeholder="Feature 1 Value">\n<input id="featureVal2" type="number" step="any" class="featureValInput" name="featureVal2" placeholder="Feature 2 Value">\n<input id="featureVal3" type="number" step="any" class="featureValInput" name="featureVal3" placeholder="Feature 3 Value">\n<input id="featureVal4" type="number" step="any" class="featureValInput" name="featureVal4" placeholder="Feature 4 Value">\n';
export var defaultFeatureHtml = '\n<input id="feature1" type="text" class="featureInput" name="feature1" placeholder="Feature 1 name">\n<input id="feature2" type="text" class="featureInput" name="feature2" placeholder="Feature 2 name">\n<input id="feature3" type="text" class="featureInput" name="feature3" placeholder="Feature 3 name">\n<input id="feature4" type="text" class="featureInput" name="feature4" placeholder="Feature 4 name">\n';
export var defaultCoefficientHtml = '\n<input id="intercept" type="number" step="any" class="coefficientInput" name="coefficient1" placeholder="Intercept">\n<input id="coefficient1" type="number" step="any" class="coefficientInput" name="coefficient1" placeholder="Coefficient 1">\n<input id="coefficient2" type="number" step="any" class="coefficientInput" name="coefficient2" placeholder="Coefficient 2">\n<input id="coefficient3" type="number" step="any" class="coefficientInput" name="coefficient3" placeholder="Coefficient 3">\n<input id="coefficient4" type="number" step="any" class="coefficientInput" name="coefficient4" placeholder="Coefficient 4">\n';
export var icuFeatureValHtml = '\n<input id="featureVal1" type="number" step="any" class="featureValInput" name="featureVal1" placeholder="new_cases_smoothed_per_million">\n<input id="featureVal2" type="number" step="any" class="featureValInput" name="featureVal2" placeholder="population">\n<input id="featureVal3" type="number" step="any" class="featureValInput" name="featureVal3" placeholder="stringency_index">\n<input id="featureVal4" type="number" step="any" class="featureValInput" name="featureVal4" placeholder="human_development_index">\n';
export var icuFeatureHtml = '\n<input id="feature1" type="text" class="featureInput" name="feature1" readonly placeholder="Feature 1 name" value="new_cases_smoothed_per_million">\n<input id="feature2" type="text" class="featureInput" name="feature2" readonly placeholder="Feature 2 name" value="population">\n<input id="feature3" type="text" class="featureInput" name="feature3" readonly placeholder="Feature 3 name" value="stringency_index">\n<input id="feature4" type="text" class="featureInput" name="feature4" readonly placeholder="Feature 4 name" value="human_development_index">\n';
export var icuCoefficientHtml = '\n<input id="intercept" type="number" step="any" class="coefficientInput" readonly name="coefficient1" value="22.058856">\n<input id="coefficient1" type="number" step="any" class="coefficientInput" readonly name="coefficient1" value="16.522938">\n<input id="coefficient2" type="number" step="any" class="coefficientInput" readonly name="coefficient2" value="1.885017">\n<input id="coefficient3" type="number" step="any" class="coefficientInput" readonly name="coefficient3" value="5.626492">\n<input id="coefficient4" type="number" step="any" class="coefficientInput" readonly name="coefficient4" value="-1.746058">\n';
export var display = function (msg) {
	print (msg);
	document.getElementById ('outputMsg').innerHTML = msg;
};
export var gen_random_int = function (number, seed) {
	random.seed (seed);
	var result = [];
	for (var i = 0; i < number; i++) {
		result.append (i);
	}
	random.shuffle (result);
	return result;
};
export var predict = function () {
	var n = document.getElementsByClassName ('featureInput').length;
	for (var i = 0; i < n; i++) {
		var i = int (i);
		var featValIdStr = 'featureVal{0}'.format (i + 1);
		var coefIdStr = 'coefficient{0}'.format (i + 1);
		if (document.getElementById (featValIdStr).value == '' || document.getElementById (coefIdStr).value == '') {
			display ('Please enter a value for all features and coefficients');
			return ;
		}
	}
	var featureValList = [];
	var featureList = [];
	var betaList = [];
	var productsList = [];
	var targetName = document.getElementById ('target').value;
	var interceptVal = float (document.getElementById ('intercept').value);
	for (var i = 0; i < n; i++) {
		var featValIdStr = 'featureVal{0}'.format (i + 1);
		var featIdStr = 'feature{0}'.format (i + 1);
		var coefIdStr = 'coefficient{0}'.format (i + 1);
		var featVal = float (document.getElementById (featValIdStr).value);
		var feat = document.getElementById (featIdStr).value;
		var beta = float (document.getElementById (coefIdStr).value);
		featureValList.append (featVal);
		featureList.append (feat);
		betaList.append (beta);
	}
	if (__in__ ('', featureList) || targetName == '') {
		display ('Please enter a name for all your features and target');
	}
	else {
		if (icuPred) {
			for (var [idx, val] of enumerate (featureValList)) {
				featureValList [idx] = (val - meanList [idx]) / stdList [idx];
			}
		}
		for (var [featVal, betaVal] of zip (featureValList, betaList)) {
			productsList.append (featVal * betaVal);
		}
		var prediction = round (interceptVal + sum (productsList), 3);
		var output = 'Predicting {} with {} features:<br /><br />'.format (targetName, n);
		output += 'Intercept: {}<br />'.format (interceptVal);
		for (var i = 0; i < n; i++) {
			output += 'Coefficient for {}: {}<br />'.format (featureList [i], betaList [i]);
		}
		output += '<br />';
		for (var i = 0; i < n; i++) {
			output += 'Input value for X{} ({}): {}<br />'.format (i + 1, featureList [i], featureValList [i]);
		}
		output += '<br />';
		output += 'Equation: {}'.format (interceptVal);
		for (var i = 0; i < n; i++) {
			output += ' + {}*X{}'.format (betaList [i], i + 1);
		}
		output += ' = {}<br />'.format (prediction);
		output += '<br />';
		output += 'Final prediction for {}: {}'.format (targetName, prediction);
		display (output);
	}
};
export var reset = function () {
	document.getElementById ('featureValDiv').innerHTML = defaultFeatureValHtml;
	document.getElementById ('featureNameDiv').innerHTML = defaultFeatureHtml;
	document.getElementById ('coefficientDiv').innerHTML = defaultCoefficientHtml;
	display ('Features Reset!');
};
export var toggleIcuPred = function () {
	if (icuPred) {
		reset ();
		document.getElementById ('target').innerHTML = "<input id='target' type='text' class='targetInput' name='target' placeholder='Target Name'>";
		document.getElementById ('add').disabled = false;
		document.getElementById ('remove').disabled = false;
		document.getElementById ('reset').disabled = false;
		document.getElementById ('target').value = '';
		document.getElementById ('target').readonly = false;
		icuPred = false;
	}
	else {
		document.getElementById ('featureValDiv').innerHTML = icuFeatureValHtml;
		document.getElementById ('featureNameDiv').innerHTML = icuFeatureHtml;
		document.getElementById ('coefficientDiv').innerHTML = icuCoefficientHtml;
		document.getElementById ('target').value = 'Daily ICU occupancy per million';
		document.getElementById ('target').readonly = true;
		document.getElementById ('add').disabled = true;
		document.getElementById ('remove').disabled = true;
		document.getElementById ('reset').disabled = true;
		icuPred = true;
	}
};
export var addFeatures = function () {
	var newN = document.getElementsByClassName ('featureInput').length + 1;
	var featureValHtml = "<input id='featureVal{}' type='number' step='any' class='featureValInput' name='featureVal{}' placeholder='Feature {} Value'>".format (newN, newN, newN);
	var featureHtml = "<input id='feature{}' type='text' class='featureInput' name='feature{}' placeholder='Feature {} name'>".format (newN, newN, newN);
	var coefficientHtml = "<input id='coefficient{}' type='number' step='any' class='coefficientInput' name='coefficient{}' placeholder='Coefficient {}'>".format (newN, newN, newN);
	document.getElementById ('featureValDiv').innerHTML += featureValHtml;
	document.getElementById ('featureNameDiv').innerHTML += featureHtml;
	document.getElementById ('coefficientDiv').innerHTML += coefficientHtml;
	display ('Feature added!');
};
export var removeFeatures = function () {
	var n = document.getElementsByClassName ('featureInput').length;
	if (n > 1) {
		var featureValIdRemoved = 'featureVal{}'.format (n);
		var featureIdRemoved = 'feature{}'.format (n);
		var coefficientIdRemoved = 'coefficient{}'.format (n);
		document.getElementById (featureValIdRemoved).remove ();
		document.getElementById (featureIdRemoved).remove ();
		document.getElementById (coefficientIdRemoved).remove ();
		display ('Feature removed!');
	}
	else {
		display ('Too little features to remove');
	}
};
export var generate = function () {
	var number = 10;
	var seed = 200;
	array = gen_random_int (number, seed);
	var array_string = ','.join ((function () {
		var __accu0__ = [];
		for (var i of array) {
			__accu0__.append (str (i));
		}
		return py_iter (__accu0__);
	}) ());
	var array_str = array_string + '.';
	document.getElementById ('generate').innerHTML = array_str;
};
export var bubble_sort = function (array) {
	var n = len (array);
	for (var outer_index = 1; outer_index < n; outer_index++) {
		for (var inner_index = 1; inner_index < n; inner_index++) {
			var first_number = array [inner_index - 1];
			var second_number = array [inner_index];
			if (first_number > second_number) {
				var __left0__ = tuple ([array [inner_index - 1], array [inner_index]]);
				array [inner_index] = __left0__ [0];
				array [inner_index - 1] = __left0__ [1];
			}
		}
	}
};
export var sortnumber1 = function () {
	bubble_sort (array);
	var array_string = ','.join ((function () {
		var __accu0__ = [];
		for (var i of array) {
			__accu0__.append (str (i));
		}
		return py_iter (__accu0__);
	}) ());
	var array_str = array_string + '.';
	document.getElementById ('sorted').innerHTML = array_str;
};
export var sortnumber2 = function () {
	var value = document.getElementsByName ('numbers') [0].value;
	if (value == '') {
		window.alert ('Your textbox is empty');
		return ;
	}
	var value_str = (function () {
		var __accu0__ = [];
		for (var i of value.py_split (',')) {
			__accu0__.append (i.strip ());
		}
		return __accu0__;
	}) ();
	var value_int = (function () {
		var __accu0__ = [];
		for (var x of value_str) {
			__accu0__.append (int (x));
		}
		return __accu0__;
	}) ();
	bubble_sort (value_int);
	var sort_string = ','.join ((function () {
		var __accu0__ = [];
		for (var i of value_int) {
			__accu0__.append (str (i));
		}
		return py_iter (__accu0__);
	}) ());
	var array_str = sort_string + '.';
	document.getElementById ('sorted').innerHTML = array_str;
};
var sortnumber2 = function () {
	var value = document.getElementsByName ('numbers') [0].value;
	if (value == '') {
		window.alert ('Your textbox is empty');
		return ;
	}
	var value_str = (function () {
		var __accu0__ = [];
		for (var i of value.py_split (',')) {
			__accu0__.append (i.strip ());
		}
		return __accu0__;
	}) ();
	var value_int = (function () {
		var __accu0__ = [];
		for (var x of value_str) {
			__accu0__.append (int (x));
		}
		return __accu0__;
	}) ();
	bubble_sort (value_int);
	var sort_string = ','.join ((function () {
		var __accu0__ = [];
		for (var i of value_int) {
			__accu0__.append (str (i));
		}
		return py_iter (__accu0__);
	}) ());
	var array_str = sort_string + '.';
	document.getElementById ('sorted').innerHTML = array_str;
};

//# sourceMappingURL=library.map