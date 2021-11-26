from org.transcrypt.stubs.browser import *
import random

icuPred = False

meanList = [175.098171,30853510,58.596521,0.899823]
stdList = [216.521299,58756310,16.010481,0.049789]

defaultFeatureValHtml = """
<input id="featureVal1" type="number" step="any" class="featureValInput" name="featureVal1" placeholder="Feature 1 Value">
<input id="featureVal2" type="number" step="any" class="featureValInput" name="featureVal2" placeholder="Feature 2 Value">
<input id="featureVal3" type="number" step="any" class="featureValInput" name="featureVal3" placeholder="Feature 3 Value">
<input id="featureVal4" type="number" step="any" class="featureValInput" name="featureVal4" placeholder="Feature 4 Value">
"""

defaultFeatureHtml = """
<input id="feature1" type="text" class="featureInput" name="feature1" placeholder="Feature 1 name">
<input id="feature2" type="text" class="featureInput" name="feature2" placeholder="Feature 2 name">
<input id="feature3" type="text" class="featureInput" name="feature3" placeholder="Feature 3 name">
<input id="feature4" type="text" class="featureInput" name="feature4" placeholder="Feature 4 name">
"""

defaultCoefficientHtml = """
<input id="intercept" type="number" step="any" class="coefficientInput" name="coefficient1" placeholder="Intercept">
<input id="coefficient1" type="number" step="any" class="coefficientInput" name="coefficient1" placeholder="Coefficient 1">
<input id="coefficient2" type="number" step="any" class="coefficientInput" name="coefficient2" placeholder="Coefficient 2">
<input id="coefficient3" type="number" step="any" class="coefficientInput" name="coefficient3" placeholder="Coefficient 3">
<input id="coefficient4" type="number" step="any" class="coefficientInput" name="coefficient4" placeholder="Coefficient 4">
"""

icuFeatureValHtml = """
<input id="featureVal1" type="number" step="any" class="featureValInput" name="featureVal1" placeholder="new_cases_smoothed_per_million">
<input id="featureVal2" type="number" step="any" class="featureValInput" name="featureVal2" placeholder="population">
<input id="featureVal3" type="number" step="any" class="featureValInput" name="featureVal3" placeholder="stringency_index">
<input id="featureVal4" type="number" step="any" class="featureValInput" name="featureVal4" placeholder="human_development_index">
"""

icuFeatureHtml = """
<input id="feature1" type="text" class="featureInput" name="feature1" readonly placeholder="Feature 1 name" value="new_cases_smoothed_per_million">
<input id="feature2" type="text" class="featureInput" name="feature2" readonly placeholder="Feature 2 name" value="population">
<input id="feature3" type="text" class="featureInput" name="feature3" readonly placeholder="Feature 3 name" value="stringency_index">
<input id="feature4" type="text" class="featureInput" name="feature4" readonly placeholder="Feature 4 name" value="human_development_index">
"""

icuCoefficientHtml = """
<input id="intercept" type="number" step="any" class="coefficientInput" readonly name="coefficient1" value="22.058856">
<input id="coefficient1" type="number" step="any" class="coefficientInput" readonly name="coefficient1" value="16.522938">
<input id="coefficient2" type="number" step="any" class="coefficientInput" readonly name="coefficient2" value="1.885017">
<input id="coefficient3" type="number" step="any" class="coefficientInput" readonly name="coefficient3" value="5.626492">
<input id="coefficient4" type="number" step="any" class="coefficientInput" readonly name="coefficient4" value="-1.746058">
"""
def display(msg):
	print(msg)
	document.getElementById("outputMsg").innerHTML = msg

def gen_random_int(number,seed):
	random.seed(seed)
	result = []
	for i in range(0,number):
		result.append(i)
	random.shuffle(result)
	return result

def predict():
	global icuPred
	n = document.getElementsByClassName("featureInput").length
	for i in range(n):
		i = int(i)
		#print(document.getElementById(f"featureVal{i+1}").value)
		featValIdStr = "featureVal{0}".format(i+1)
		coefIdStr ="coefficient{0}".format(i+1)
		if document.getElementById(featValIdStr).value == "" or document.getElementById(coefIdStr).value == "":
			display("Please enter a value for all features and coefficients")
			return
	featureValList = []
	featureList = []
	betaList = []
	productsList = []
	targetName = document.getElementById("target").value
	interceptVal = float(document.getElementById("intercept").value)
	for i in range(n):
		featValIdStr = "featureVal{0}".format(i+1)
		featIdStr = "feature{0}".format(i+1)
		coefIdStr ="coefficient{0}".format(i+1)
		featVal = float(document.getElementById(featValIdStr).value)
		feat = document.getElementById(featIdStr).value
		beta = float(document.getElementById(coefIdStr).value)
		featureValList.append(featVal)
		featureList.append(feat)
		betaList.append(beta)
	if "" in featureList or targetName == "":
		display("Please enter a name for all your features and target")
	else:
		if icuPred:
			#perform transformation for ICU feats
			for idx, val in enumerate(featureValList):
				featureValList[idx] = (val - meanList[idx])/stdList[idx]

		for featVal, betaVal in zip(featureValList, betaList):
			productsList.append(featVal * betaVal)
		prediction = round(interceptVal + sum(productsList),3)
		output = f"Predicting {targetName} with {n} features:<br /><br />"
		output += f"Intercept: {interceptVal}<br />"
		for i in range(n):
			output += f"Coefficient for {featureList[i]}: {betaList[i]}<br />"
		output += "<br />"
		for i in range(n):
			output += f"Input value for X{i+1} ({featureList[i]}): {featureValList[i]}<br />"
		output += "<br />"
		output += f"Equation: {interceptVal}"
		for i in range(n):
			output += f" + {betaList[i]}*X{i+1}"
		output += f" = {prediction}<br />"
		output += "<br />"
		output += f"Final prediction for {targetName}: {prediction}"
		display(output)

def reset():
	document.getElementById("featureValDiv").innerHTML = defaultFeatureValHtml
	document.getElementById("featureNameDiv").innerHTML = defaultFeatureHtml
	document.getElementById("coefficientDiv").innerHTML = defaultCoefficientHtml
	display("Features Reset!")

def toggleIcuPred():
	global icuPred
	if icuPred: # Mean it was alrdy on, we are turning it off
		reset()
		document.getElementById("target").innerHTML = "<input id='target' type='text' class='targetInput' name='target' placeholder='Target Name'>"
		document.getElementById("add").disabled = False
		document.getElementById("remove").disabled = False
		document.getElementById("reset").disabled = False
		document.getElementById("target").value = ''
		document.getElementById("target").readonly = False
		icuPred = False
		display("Turning off ICU Predictions")
	else:
		# turn on icu pred functionalities
		document.getElementById("featureValDiv").innerHTML = icuFeatureValHtml
		document.getElementById("featureNameDiv").innerHTML = icuFeatureHtml
		document.getElementById("coefficientDiv").innerHTML = icuCoefficientHtml
		document.getElementById("target").value = 'Daily ICU occupancy per million'
		document.getElementById("target").readonly = True
		#"<input id='target' type='text' class='targetInput' readonly='readonly' name='target' value='Daily ICU occupancy per million'>"
		document.getElementById("add").disabled = True
		document.getElementById("remove").disabled = True
		document.getElementById("reset").disabled = True
		icuPred = True
		display("Turning on ICU Predictions")

def addFeatures():
	newN = document.getElementsByClassName("featureInput").length + 1
	#print(f"Feature length: {newN}")
	featureValHtml = f"<input id='featureVal{newN}' type='number' step='any' class='featureValInput' name='featureVal{newN}' placeholder='Feature {newN} Value'>"
	featureHtml = f"<input id='feature{newN}' type='text' class='featureInput' name='feature{newN}' placeholder='Feature {newN} name'>"
	coefficientHtml = f"<input id='coefficient{newN}' type='number' step='any' class='coefficientInput' name='coefficient{newN}' placeholder='Coefficient {newN}'>"
	document.getElementById("featureValDiv").innerHTML += featureValHtml
	document.getElementById("featureNameDiv").innerHTML += featureHtml
	document.getElementById("coefficientDiv").innerHTML += coefficientHtml
	display("Feature added!")

def removeFeatures():
	n = document.getElementsByClassName("featureInput").length
	#print(f"Feature length: {n}")
	if n > 1:
		featureValIdRemoved = f"featureVal{n}"
		featureIdRemoved = f"feature{n}"
		coefficientIdRemoved = f"coefficient{n}"
		document.getElementById(featureValIdRemoved).remove()
		document.getElementById(featureIdRemoved).remove()
		document.getElementById(coefficientIdRemoved).remove()
		display("Feature removed!")
	else:
		display("Too little features to remove")

def generate():
	global array
	number = 10
	seed = 200

	# call gen_random_int() with the given number and seed
	# store it to the global variable array

	array = gen_random_int(number,seed)
	# convert the items into one single string 
	# the number should be separated by a comma
	# and a full stop should end the string.

	array_string = ','.join(str(i) for i in array)
	array_str = array_string + '.'
	

	
	# This line is to placed the string into the HTML
	# under div section with the id called "generate"	
	document.getElementById("generate").innerHTML = array_str


def bubble_sort(array):
	n = len(array)
	#outer loop makes inner loop run n times
	for outer_index in range(1,n):
		#inner loop that does the work to make the swaps
		for inner_index in range(1,n):
			first_number = array[inner_index-1]
			second_number = array[inner_index]
			#if previous number larger than current number, swap
			if first_number>second_number:
				array[inner_index], array[inner_index-1] = array[inner_index-1], array[inner_index]


def sortnumber1():
	'''	This function is used in Exercise 1.
		The function is called when the sort button is clicked.

		You need to do the following:
		- get the list of numbers from the global variable array and 
			copy it to a new list
		- call your sort function, either bubble sort or insertion sort
		- create a string of the sorted numbers and store it in array_str
	'''
	# global array 
	#new_list = []
	# new_list.extend(array)
	
	bubble_sort(array)

	array_string = ','.join(str(i) for i in array)
	array_str = array_string + '.'
	
	document.getElementById("sorted").innerHTML = array_str

def sortnumber2():
	'''	This function is used in Exercise 2.
		The function is called when the sort button is clicked.

		You need to do the following:
		- Get the numbers from a string variable "value".
		- Split the string using comma as the separator and convert them to 
			a list of numbers
		- call your sort function, either bubble sort or insertion sort
		- create a string of the sorted numbers and store it in array_str
	'''
	global array
	# The following line get the value of the text input called "numbers"
	value = document.getElementsByName("numbers")[0].value

	# Throw alert and stop if nothing in the text input
	if value == "":
		window.alert("Your textbox is empty")
		return

	# Your code should start from here
	# store the final string to the variable array_str
	
	value_str = [i.strip() for i in value.split(',')]
	value_int = [int(x) for x in value_str]
	bubble_sort(value_int)
    
	sort_string = ','.join(str(i) for i in value_int)
	array_str = sort_string + '.'

	document.getElementById("sorted").innerHTML = array_str


def sortnumber2():
	global array
	# The following line get the value of the text input called "numbers"
	value = document.getElementsByName("numbers")[0].value

	# Throw alert and stop if nothing in the text input
	if value == "":
		window.alert("Your textbox is empty")
		return

	# Your code should start from here
	# store the final string to the variable array_str
	
	value_str = [i.strip() for i in value.split(',')]
	value_int = [int(x) for x in value_str]
	bubble_sort(value_int)
    
	sort_string = ','.join(str(i) for i in value_int)
	array_str = sort_string + '.'

	document.getElementById("sorted").innerHTML = array_str



