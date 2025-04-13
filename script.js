const translateInput = document.getElementById("translateInput");
const answerInput = document.getElementById("ansverInput"); 
const translateButton = document.getElementById("translateButtton");
const apiUrl = `https://api.mymemory.translated.net/get`;

const languages = {
    ru: "Russian",
    en: "English",
    uz: "Uzbek",
    es: "Spanish" 
};

document.addEventListener("DOMContentLoaded", () => {
    const from = document.getElementById("from");
    const to = document.getElementById("to");

    Object.entries(languages).forEach(([code, name]) => {
        from.innerHTML += `<option value="${code}">${name}</option>`;
        to.innerHTML += `<option value="${code}">${name}</option>`;
    });

    from.value = "en";
    to.value = "ru";
});

translateButton.addEventListener("click", () => {
    const text = translateInput.value.trim();
    const fromLang = document.getElementById("from").value;
    const toLang = document.getElementById("to").value;

    if (text === "") {
        alert("Введите текст для перевода");
        return;
    }

    async function translate() {
        try {
            const response = await fetch(`${apiUrl}?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`);
            const data = await response.json();
            answerInput.value = data.responseData.translatedText;
        } catch (error) {
            console.error("Ошибка перевода:", error);
        }
    }

    translate();
});
