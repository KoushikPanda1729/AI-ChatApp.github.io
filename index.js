const sendChatIcon = document.querySelector(".chat-input span");
const sendChatInput = document.querySelector(".chat-input textarea");
const chatbox = document.querySelector(".chatbox");

let userMessage;
const API_KEY = "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";

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `   <span class="material-symbols-outlined">smart_toy</span> <p>${message}</p>`;

    chatLi.innerHTML = chatContent;
    return chatLi;
}

const genetateResponse = (incomingChatLi) => {
    const API = "https://api.openai.com/v1/chat/completions";
    const messegeEle = incomingChatLi.querySelector("p");

    const requestOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        })
    }
    fetch(API, requestOption)
        .then(API_resp => API_resp.json())
        .then(res => messegeEle.textContent = res.error.message)
        .catch((error) => messegeEle.textContent = `Opps ! sometime went wrong for ${error} `)
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight))
}




sendChatIcon.addEventListener("click", () => {
    userMessage = sendChatInput.value.trim();
    sendChatInput.value = "";
    if (!userMessage) {
        return;
    }
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    chatbox.scrollTo(0, chatbox.scrollHeight);
    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking.....", "incoming")
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        genetateResponse(incomingChatLi);
    }, 700);
})



