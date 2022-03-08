const calculatorWrapper = document.querySelector(".calculator")
const optionContainer = document.querySelector(".options-grid")
const inputs = document.querySelectorAll(".input")
const inputBill = document.querySelector(".input-bill")
const inputCustom = document.querySelector(".input-custom")
const inputPeople = document.querySelector(".input-people")
const tipAmount = document.querySelector(".tip-amount")
const totalAmount = document.querySelector(".total-amount")
const errorContainer  = document.getElementById("error")
const resetButton = document.querySelector(".reset-btn")

let bill
let percentage
let people
let selectedInput
let selectedPercentage
let tip
let total

tipAmount.textContent = `$0.00`
totalAmount.textContent = `$0.00`

resetButton.addEventListener("click", () => {
	tipAmount.textContent = `$0.00`
	totalAmount.textContent = `$0.00`
	selectedPercentage.classList.remove("active-percentage")
	selectedPercentage = null
	resetButton.disabled = true
	resetButton.classList.remove("active-btn")
	inputBill.value = ""
	inputCustom.value = ""
	inputPeople.value = ""
})

const calculateTip = () => {
	const x = parseInt(people) 
	const y = bill * (percentage / 100) // tip
	const z = y / x
	return z.toFixed(2)
}

const calculateTotal = () => {
	const w = parseInt(people)
	const x = bill * (percentage / 100) // tip
	const y  = bill + x // bill + tip
	const z = y / w
	return z.toFixed(2)
}

inputs.forEach(input => {
	input.addEventListener("focus", (event) => {
		const element = event.target
		if (element.name === "custom-percentage" && selectedPercentage) {
			selectedPercentage.classList.remove("active-percentage")
		}
		selectedInput = element
		element.parentElement.classList.add("active")
	})

	input.addEventListener("blur", (event) => {
		const { target: { value, name }, target } = event

		switch (name) {
			case "bill":
				bill = parseFloat(value)
				break
			case "custom-percentage":
				percentage = parseInt(value)
				break
			case "people":
				people = parseInt(value)
				break
		}

		if (name === "people") {
			if (people <= 0) {
				errorContainer.style.display = "block"
				target.parentElement.classList.add("error")
				target.parentElement.classList.remove("active")
				return
			} else {
				target.parentElement.classList.remove("error")
				errorContainer.style.display = "none"
			}
		}

		if (bill && percentage && people) {
			const tip = calculateTip()
			const total = calculateTotal()
			tipAmount.textContent = `$${tip}`
			totalAmount.textContent = `$${total}`
			resetButton.disabled = false
			resetButton.classList.add("active-btn")
		}
		
		target.parentElement.classList.remove("active")
	})
})

optionContainer.addEventListener("click", (event) => {
	const element = event.target
	if (element.classList.contains("option")) {
		if (!selectedPercentage) {
			selectedPercentage = element
			selectedPercentage.classList.add("active-percentage")
			percentage = parseInt(selectedPercentage.dataset.percentage)
		} else if (selectedPercentage) {
			selectedPercentage.classList.remove("active-percentage")
			selectedPercentage = element
			selectedPercentage.classList.add("active-percentage")
			percentage = parseInt(selectedPercentage.dataset.percentage)
		}
		if (bill && percentage && people) {
			if (inputCustom.value !== "") inputCustom.value = ""
			const tip = calculateTip()
			const total = calculateTotal()
			tipAmount.textContent = `$${tip}`
			totalAmount.textContent = `$${total}`
			resetButton.disabled = false
			resetButton.classList.add("active-btn")
		}
	}
})