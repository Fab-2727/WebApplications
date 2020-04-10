const btn = document.getElementById("btn");
const inputName = document.getElementById("name");
const inputAge = document.getElementById("age");

const personsList = document.getElementById("myUl");
const averageOfAges = document.getElementById("average-age");
const maxAge = document.getElementById("max-age");
const minAge = document.getElementById("min-age");
const textMax = "Edad maxima: ";
const textMin = "Edad minima: ";
let arrayAges = [];
var sumOfAges = 0;

function average(divider) {
	return (eval(sumOfAges / divider))
}

function getAverage() {
	let average = 0;
	for (i = 0; i < arrayOfPersons.length; i++) {
		const patt1 = /[1-9]/g;
		const textOfLi = arrayOfPersons[i].innerText;
		const position = arrayOfPersons[i].innerText.search(patt1);
		const age = textOfLi.trim().substr(position, 2);	//AGE 
		average += parseFloat(age);
	}
	return average;
}

function updateAverageOfAges(value) {
	//	const txt = averageOfAges.innerText;
	const txt = "Promedio de edades</br>de los pacientes: ";
	const valueReduce = value.toString().substring(0, 4);
	const completetxt = txt + " " + valueReduce;
	averageOfAges.innerHTML = completetxt;
}

function getArrayOfAges() {
	let arrayOfElements = document.querySelectorAll("li")
	const patt1 = /[1-9]/g;
	let arrayOfAges = [];
	for (i = 0; i < arrayOfElements.length; i++) {
		const textOfTheElement = arrayOfElements[i].innerText;
		const position = arrayOfElements[i].innerText.search(patt1);
		const age = textOfTheElement.trim().substr(position, 2);	//AGE 
		arrayOfAges.push(parseInt(age));
	}
	return arrayOfAges;
}

//		ADD CLOSE BUTTON TO EACH ELEMENT
var i;
const arrayOfPersons = document.getElementsByTagName("LI");

for (i = 0; i < arrayOfPersons.length; i++) {
	const span = document.createElement('SPAN');
	const text = document.createTextNode("\u00D7");
	span.className = "close";
	span.appendChild(text);
	arrayOfPersons[i].appendChild(span);
}

// Click on a close button to delete the current list item
const close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
	close[i].onclick = function () {
		const elementOfList = this.parentElement;
		// div.style.display = "none"; //This is optional, it set the display to none instead of deleting the "row"
		const list = elementOfList.parentElement;
		list.removeChild(elementOfList);
		sumOfAges = getAverage();
		updateAverageOfAges(average(arrayOfPersons.length))
	}
}

btn.onclick = function () {
	const newPerson = document.createElement("LI");
	const txt = document.createTextNode(inputName.value + " " + inputAge.value);
	if (!(inputName.value.trim() === '') && inputAge.value > 0 && inputAge.value < 100 && inputName.value.length > 2) {
		if (!(/^[a-zA-Z]+$/.test(inputName.value))) {
			alert("No se admiten números en el campo 'Nombre'");
		} else {
			newPerson.appendChild(txt);
			personsList.appendChild(newPerson);
			//Call to outer methods to do the update of the average value;
			sumOfAges = getAverage();
			updateAverageOfAges(average(arrayOfPersons.length))
			//-----------------------------------------------//
			//ADDING DELETE BUTTON AT EACH LIST ELEMENT

			const span = document.createElement('SPAN');
			const text = document.createTextNode("\u00D7");
			span.className = "close";
			span.appendChild(text);
			newPerson.appendChild(span);
			//	Adds the funtion to delete when 'X' is click;
			for (i = 0; i < close.length; i++) {
				close[i].onclick = function () {
					const elementOfList = this.parentElement;
					// div.style.display = "none";
					const list = elementOfList.parentElement;
					list.removeChild(elementOfList);
					//Call to outer methods to do the update of the average value;
					sumOfAges = getAverage();
					updateAverageOfAges(average(arrayOfPersons.length))
				}
			}
			//CALLING OUTER METHODS TO GET ARRAY OF AGES, MIN AND MAX;
			arrayAges = getArrayOfAges();
			const completeMax = textMax + Math.max.apply(null, arrayAges);
			maxAge.innerText = completeMax;
			const completeMin = textMin + Math.min.apply(null, arrayAges);
			minAge.innerText = completeMin;
		}
	} else {
		alert("Ingrese valores VALIDOS, por favor");
	}
	inputName.value = "";
	inputAge.value = "";

	return false;
}
