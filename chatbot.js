const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const chatbotSection = document.getElementById('chatbot-section');

function sendMessage() {
    const userMessage = userInput.value;
    if (userMessage) {
        displayMessage(userMessage, 'user');
        const botResponse = getMoodSuggestion(userMessage);
        displayMessage(botResponse, 'bot');
        speakText(botResponse);
    }
    userInput.value = '';
}

function speakText(text){
    if('speechSynthesis' in window){
        let speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'en-Us';
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;
        window.speechSynthesis.speak(speech);
    }else{
        console.log("Speech synthesis not supported in this browser");
    }
}

function displayMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender);
    messageDiv.innerText = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll to bottom
}

function getMoodSuggestion(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('hello')) {
        return "Hi how can I help you.";
    }
    if (lowerMessage.includes('sad') || lowerMessage.includes('down')) {
        return "I'm sorry you're feeling sad. 😔 How about listening to some uplifting music 🎶 or going for a walk 🚶?";
    }
    if (lowerMessage.includes('stressed') || lowerMessage.includes('anxious')) {
        return "Take a deep breath! 😌 Try some meditation 🧘 or even a short nap to recharge. 💤";
    }
    if (lowerMessage.includes('happy') || lowerMessage.includes('great')) {
        return "That's awesome! 😃 Maybe you can share your happiness with a friend 👯 or try journaling about it. ✍️";
    }
    if (lowerMessage.includes('bored') || lowerMessage.includes('unmotivated')) {
        return "Why not try a new hobby 🎨, read a book 📖, or even start a new project 💡?";
    }
    if (lowerMessage.includes('angry') || lowerMessage.includes('depressed')) {
        return "Try to avoid these situations. 😡💙 Doing some meditation 🧘 or deep breathing might help.";
    }
    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone')) {
        return "You're not alone! 🤗 Try reaching out to a loved one ❤️ or engaging in a community activity. 🌍";
    }
    if (lowerMessage.includes('excited') || lowerMessage.includes('thrilled')) {
        return "That’s great! 😆 Enjoy the moment 🎉 and maybe share your excitement with someone close to you. 🥳";
    }
    if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
        return "You deserve some rest! 😴 Make sure to get enough sleep 🌙 and maybe take a short break. ☕";
    }
    if (lowerMessage.includes('frustrated') || lowerMessage.includes('annoyed')) {
        return "Try taking a deep breath 😤 and stepping away for a moment. Maybe a short walk 🚶 can help clear your mind. 🌿";
    }
    if (lowerMessage.includes('motivated') || lowerMessage.includes('determined')) {
        return "That’s amazing! 💪 Keep going 🚀 and channel your energy into achieving your goals. 🏆";
    }
    if (lowerMessage.includes('grateful') || lowerMessage.includes('thankful')) {
        return "Gratitude is wonderful! 😊 Consider writing down what you're grateful for 🙏 to keep a positive mindset. 🌟";
    }
    if (lowerMessage.includes('scared') || lowerMessage.includes('nervous')) {
        return "It’s okay to feel this way! 😟 Try practicing deep breathing 🧘‍♂️ or talking to a supportive friend. 📞";
    }
    if (lowerMessage.includes('hopeful') || lowerMessage.includes('optimistic')) {
        return "That’s a great outlook! 🌞 Keep focusing on the positives ✨ and trust that good things are coming. 💖";
    }
    if (lowerMessage.includes('upset') || lowerMessage.includes('frustrated')) {
        return "I understand how you feel. Try taking deep breaths or writing down your thoughts to clear your mind. 📝💙";
    }
    
    if (lowerMessage.includes('overwhelmed') || lowerMessage.includes('burnout')) {
        return "You're doing your best! Take a break, go for a walk, or listen to some calming music. 🎧🌿";
    }
    
    if (lowerMessage.includes('lack of energy') || lowerMessage.includes('drained')) {
        return "Maybe a power nap or a refreshing drink can help! Also, stretching for a few minutes might energize you. 💤💪";
    }
    
    if (lowerMessage.includes('procrastinating') || lowerMessage.includes('lazy')) {
        return "Try breaking tasks into small steps! Start with just 5 minutes, and you'll feel more productive. ⏳🔥";
    }
    
    if (lowerMessage.includes('hopeless') || lowerMessage.includes('lost')) {
        return "You're stronger than you think! Focus on small wins and talk to someone who supports you. 💖🌟";
    }
    
    if (lowerMessage.includes('self-doubt') || lowerMessage.includes('not good enough')) {
        return "Remember, progress is more important than perfection. Believe in yourself and keep going! 💪✨";
    }
    
    
    return "I'm not sure about that mood 🤔, but how about trying a nice walk outside? 🌳 It might help! 🚶";
    
}

