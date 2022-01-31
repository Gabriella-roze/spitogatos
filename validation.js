// VARIABLES
const form = document.getElementById('contactForm')
const message = document.getElementById("inputMessage")
const messageHelpText = document.querySelector("#messageHelpText")
const checkboxHelpText = document.getElementById('checkboxHelpText')

// LISTENERS & FUNCTIONS
form.addEventListener('submit', (e) => {
    e.preventDefault()

    resetAllFormErrors()
    
    if  (validateForm()) {
        // If the form validation is passed:    
        // Then here we would submit the form and
        // show "success" message if that went through
        // the most basic way below:
        alert('Success!')

        // and finally reset the form input values
        form.reset()
    }
})

message.addEventListener('input', (e) => {
    const messageText = e.target.value;
  
    // Update the count
    messageHelpText.textContent = `${messageText.length}/100`
  
    // Indicate error if the message is too long
    if (messageText.length > 100) {
        message.classList.add("border-error")
        messageHelpText.classList.add("text-error")
    } else {
        message.classList.remove("border-error")
        messageHelpText.classList.remove("text-error")
    }
  });

function resetAllFormErrors() {
    // Select all inputs with an error
    let inputsWithErrorArr = document.querySelectorAll('.border-error')

    // loop though the array and remove error messages and error classes
    inputsWithErrorArr.forEach((input) => {
        input.classList.remove("border-error")
        input.nextElementSibling.innerHTML = ""
        input.nextElementSibling.classList.remove('text-error')
    })
}

function validateForm() {
    let error = false
    document.querySelectorAll("[data-validate]").forEach(element => {
        element.classList.remove('input-error')
        switch (element.getAttribute("data-validate")) {
            case "phone":
                const phoneRegex = /^[0-9]{3}(-|.)[0-9]{4}(-|.)[0-9]{4}$/
                input = element.value
                if (!phoneRegex.test(element.value)) {
                    element.classList.add('border-error')
                    element.nextElementSibling.innerHTML = "Please provide a correctly formatted phone number (123-1234-1234)"
                    element.nextElementSibling.classList.add('text-error')
                    error = true
                }
                if (!element.value) {
                    element.classList.add('border-error')
                    element.nextElementSibling.innerHTML = "This field is required"
                    element.nextElementSibling.classList.add('text-error')
                    error = true
                }
                break
            case "name":
                const allowedChar = /^[a-zA-Z\s]*$/
                if (!element.value.match(allowedChar)) {
                    element.classList.add('border-error')
                    element.nextElementSibling.innerHTML = "You can only type in letters"
                    element.nextElementSibling.classList.add('text-error')
                    error = true
                }
                if (!element.value) {
                    element.classList.add('border-error')
                    element.nextElementSibling.innerHTML = "This field is required"
                    element.nextElementSibling.classList.add('text-error')
                    error = true
                }
                break
            case "email":
                const reg = /^[a-z0-9]+[\._]?[a-z0-9]+@spitogatos.gr/
                if (!reg.test(element.value.toLowerCase())) {
                    element.classList.add('border-error')
                    element.nextElementSibling.innerHTML = "You must add a valid email (...@spitogatos.gr)"
                    element.nextElementSibling.classList.add('text-error')
                    error = true
                }
                if (!element.value) {
                    element.classList.add('border-error')
                    element.nextElementSibling.innerHTML = "This field is required"
                    element.nextElementSibling.classList.add('text-error')
                    error = true
                }
                break
            case "message":
                let max = parseInt(element.getAttribute("data-max"))
                let message = element.value
                if ( message.length > max ) {
                    element.classList.add('border-error')
                    element.nextElementSibling.classList.add('text-error')
                    error = true
                }
                break
            case "checkboxGroup":
                let checked = element.querySelectorAll('input[type="checkbox"]:checked')
                if ( checked.length < 1 ) {
                    element.classList.add('border-error')
                    element.nextElementSibling.classList.add('text-error')
                    element.nextElementSibling.innerHTML = "You must choose at least one option"
                    error = true
                }
                break
        }
    })

    return error
}
