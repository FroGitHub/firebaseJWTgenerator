import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword
} from "firebase/auth";
import { firebaseConfig, users } from "./config.js";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const emailSelect = document.getElementById("emailSelect");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const tokenArea = document.getElementById("token");


// Заповнюємо dropdown
Object.keys(users).forEach(email => {

    const option = document.createElement("option");

    option.value = email;
    option.textContent = email;

    emailSelect.appendChild(option);
});


generateBtn.addEventListener("click", async () => {

    const email = emailSelect.value;
    const password = users[email];

    try {

        const result = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const token = await result.user.getIdToken();

        tokenArea.value = token;

    } catch (e) {

        console.error(e);
        alert("Помилка генерації токена");

    }

});


copyBtn.addEventListener("click", async () => {

    await navigator.clipboard.writeText(tokenArea.value);

});