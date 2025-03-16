function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user-message');
    input.value = '';

    // Send to backend
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        // Add bot response
        let responseHtml = `${data.response}`;
        if (data.sources && data.sources.length > 0) {
            responseHtml += '<br><br>Sources:<ul>';
            data.sources.forEach(source => {
                responseHtml += `<li><a href="${source.link}" target="_blank">${source.title}</a></li>`;
            });
            responseHtml += '</ul>';
        }
        addMessage(responseHtml, 'bot-message');
    });
}

function addMessage(content, className) {
    const messages = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.innerHTML = content;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

// Send message on Enter key
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});