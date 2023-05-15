const inputEl = document.getElementById("input-el")
const saveEl = document.getElementById("save")
const popEl = document.getElementById("pop")
let store
let i
if (localStorage.getItem("store")) {
    store = JSON.parse(localStorage.getItem("store"))
} else {
    store = []
}
if (localStorage.getItem("i")) {
    i = JSON.parse(localStorage.getItem("i"))
} else {
    i = 0
}
saveEl.addEventListener("click", () => {
    if (inputEl.value != "") {
        render()
    }
})

inputEl.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && inputEl.value != "") {
        render()
    }
})


function render() {
    store.push(inputEl.value)
    document.getElementById("input-el").value = ""
    localStorage.setItem("store", JSON.stringify(store))
    document.getElementById("store").innerHTML +=
        `
        <li>
            <a target='_blank' rel='noopener noreferrer' href="${store[i]}">
                ${store[i]}
            </a>
        </li>
    `
    i++
    localStorage.setItem("i", JSON.stringify(i))
}

document.getElementById("delete").addEventListener("click", () => {
    localStorage.clear()
    window.location.reload()
})

document.getElementById("save-tab").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let url = tabs[0].url
        store.push(url)
        localStorage.setItem("store", JSON.stringify(store))
        document.getElementById("store").innerHTML +=
            `
        <li>
            <a target='_blank' rel='noopener noreferrer' href="${store[i]}">
                ${store[i]}
            </a>
        </li>
    `
        i++
        localStorage.setItem("i", JSON.stringify(i))
    })
})

document.getElementById("show").addEventListener("click", () => {
    if (localStorage.getItem("store") && localStorage.getItem("i")) {
        document.getElementById("store").innerHTML = ""
        for (let index = 0; index < i; index++) {
            document.getElementById("store").innerHTML +=
                `
            <li>
                <a target='_blank' rel='noopener noreferrer' href="${store[index]}">
                    ${store[index]}
                </a>
            </li>
        `
        }
    }
}) 