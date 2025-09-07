const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.getElementById("strength-label");


// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

document.addEventListener("DOMContentLoaded", () => {
    makePassword();
});


lengthSlider.addEventListener("input", () => {
    lengthDisplay.textContent = lengthSlider.value;
});

copyButton.addEventListener("click", () => {
    const input = passwordInput.value;
    navigator.clipboard.writeText(input);
    copyButton.classList.remove("far", "fa-copy");
    copyButton.classList.add("fas", "fa-check");
    copyButton.style.color = "#48bb78";

    setTimeout(() => {
        copyButton.classList.remove("fas", "fa-check");
        copyButton.classList.add("far", "fa-copy");
        copyButton.style.color = "";
    }, 2000);
});

generateButton.addEventListener("click", makePassword);

function makePassword() {
    const length = Number(lengthSlider.value);
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        alert("Please select at least one char type.");
        return;
    }

    const newPassword = createRandomPassword (length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);

    passwordInput.value = newPassword;
    updateStrengthBar(newPassword);
}

function updateStrengthBar(password) {
    const length = password.length;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()-_=+\[\]{}|;:,.<>?/]/.test(password);

    let strength = 0;

    strength += Math.min(password.length * 2, 40);

    if (hasUpper) strength += 15;
    if (hasLower) strength += 15;
    if (hasNumber) strength += 15;
    if (hasSymbol) strength += 15;

    if (password.length < 8) {
        strength = Math.min(strength, 40);
    }

    const safeScore = Math.max(5, Math.min(strength, 100));
    console.log("Password strength score: " + safeScore);
    strengthBar.style.width = safeScore + "%";

    if (safeScore < 40) {
        strengthBar.style.backgroundColor = "red";
        strengthText.textContent = "Weak";
    } else if (safeScore < 70) {
        strengthBar.style.backgroundColor = "orange";
        strengthText.textContent = "Medium";
    } else {
        strengthBar.style.backgroundColor = "green";
        strengthText.textContent = "Strong";
    }
        
}

function createRandomPassword(length, upper, lower, number, symbol) {
    let allCharacters = "";

    if (upper) allCharacters += uppercaseLetters;
    if (lower) allCharacters += lowercaseLetters;
    if (number) allCharacters += numberCharacters;
    if (symbol) allCharacters += symbolCharacters;

    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }

    return password;

}