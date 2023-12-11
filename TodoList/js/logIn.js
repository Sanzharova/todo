const login = document.querySelector(".loginForm");
const loginEmail = document.querySelector(".loginEmail")
const loginPassword = document.querySelector(".loginPassword")
const errorMessage = document.querySelector(".errorMessage")

const userId = JSON.parse(localStorage.getItem("user"))?.id


const fetchAllUsers = async () => {
    try {
    const response = await fetch("https://6570538609586eff66412160.mockapi.io/todo/api/v1/Login")
        const users = await response.json()
        return users.find(item => item.email === loginEmail.value && item.password === loginPassword.value)
    } catch (e) {
        console.log(e)
    }
}

login.onsubmit = async (e) => {
    e.preventDefault()
    const user = await fetchAllUsers()
    if (user && loginEmail.value !== "" || loginPassword.value !== "") {
        localStorage.setItem("user", JSON.stringify(user))
        window.location.replace("../pages/todo.html")
    } else {
        alert("Invalid login or password")
    }
  
}

