const regForm = document.querySelector(".registerForm");
const regEmailInput = document.querySelector(".userEmail");
const regUsernameInput = document.querySelector(".userName");
const regPasswordInput = document.querySelector(".userPassword");
const regConfirmPasswordInput = document.querySelector(".userCheckedPassword");
const errorMessage = document.querySelector(".errorMessage");

const userId = JSON.parse(localStorage.getItem("username"))?.id;
console.log(userId);


const registerUser = async (email, username, password) => {
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            username, email, password,
        }),
    };

    try {
        const response = await fetch("https://6570538609586eff66412160.mockapi.io/todo/api/v1/Login", options);
        const userData = await response.json();
        if (response.status >= 200 && response.status <= 299) {
            localStorage.setItem("user", JSON.stringify(userData));
            window.location.replace("../pages/todo.html");
        }
    } catch (e) {
        console.log(e);
    }
};

regForm.onsubmit = (e) => {
    e.preventDefault();
    if (regPasswordInput.value === regConfirmPasswordInput.value && regEmailInput.value !== "" && regUsernameInput.value !== "" && regPasswordInput.value !== "") {
        registerUser(regEmailInput.value, regUsernameInput.value, regPasswordInput.value).then();
    } else {
        errorMessage.innerHTML = "Please fill in all the fields and ensure passwords match.";
    }
};

regPasswordInput.oninput = () => {
    errorMessage.innerHTML = "";
};

regConfirmPasswordInput.oninput = () => {
    errorMessage.innerHTML = "";
};
