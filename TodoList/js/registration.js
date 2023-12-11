const regForm = document.querySelector(".registerForm")
const regUsername = document.querySelector(".userName")
const regEmail = document.querySelector(".userEmail")
const regPassword = document.querySelector(".userPassword")
const regConfirmPassword = document.querySelector(".userCheckedPassword")


const userId = JSON.parse(localStorage.getItem("user"))?.id

console.log(userId);

const registerUser = async (email, username, password) => {
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            username, email, password
        })
    }

    try {
        const response = await fetch("https://6570538609586eff66412160.mockapi.io/todo/api/v1/Login", options)
        const userData = await response.json()
        if (response.status >= 200 && response.status <= 299) {
            localStorage.setItem("user", JSON.stringify(userData))
            window.location.replace("../pages/todo.html")
        }
    } catch (e) {
        console.log(e)
    }
}

regForm.onsubmit = (e) => {
    e.preventDefault()
    if (regPassword.value === regConfirmPassword.value && regEmail.value !== "" || regConfirmPassword.value !== "" || regPassword.value !== "" || regUsername.value !== "" ) {
        registerUser( regUsername.value,regEmail.value,  regPassword.value).then()
    } else {
        alert("уточните данные")
    }
}

