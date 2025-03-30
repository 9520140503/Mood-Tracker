const chat = document.getElementById("chatContainer");
const chatBoxx = document.getElementById('chatBox');
function toggleChat(){
    chat.style.display = (chat.style.display === "none" || chat.style.display === "")?"block":"none";
}

function remove(){
    chat.style.display = "none";
}

function welcome(text){
    if('speechSynthesis' in window){
        window.speechSynthesis.cancel(); 
        let speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'en-Us';
        speech.pitch = 1;
        speech.rate = 1;
        speech.volume = 1;
        window.speechSynthesis.speak(speech);
    }else{
        console.log("Speech synthesis not supported in this browser");
    }
}

function generateMoodChart() {
    let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
    let countMood = {}; //Used to count the mood in  one day..

    moodHistory.forEach(entry => {
        let mood = entry.mood;
        let date = entry.date;

        if (!countMood[date]) {
            countMood[date] = { happy: 0, neutral: 0, angry: 0, sad: 0 };
        }

        //This thing will increase the value of the moods by one:
        countMood[date][mood]++;
    });

    let label = Object.keys(countMood);
    let happyMood = label.map(date => countMood[date].happy);
    let neutralMood = label.map(date => countMood[date].neutral);
    let sadMood = label.map(date => countMood[date].sad);
    let angryMood = label.map(date => countMood[date].angry);

    // Get the canvas element
    let ctx = document.getElementById("moodChart").getContext("2d");

    // Destroy existing chart instance (if any)
    if (window.myChart) {
        window.myChart.destroy();
    }
   
    window.myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: label, // Dates
            datasets: [
                { label: "Happy 😊", data: happyMood, backgroundColor: "#4635B1", barPercentage: 0.5,categoryPercentage: 0.5  },
                { label: "Neutral 😐", data: neutralMood, backgroundColor: "#ff0090",  barPercentage: 0.5,categoryPercentage: 0.5  },
                { label: "Angry 😡", data: angryMood, backgroundColor: "#1b1b1e",   barPercentage: 0.5,categoryPercentage: 0.5  },
                { label: "Sad 😢", data: sadMood, backgroundColor: "red", barPercentage: 0.5,categoryPercentage: 0.5  },
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true, text: "Mood Count", font: {
                            size: 28
                        }
                    },
                    ticks: {
                        font: {
                            size: 20 // Adjust Y-axis label size
                        }
                    }
                },
                x: {
                    title: { display: true, text: "Date", font: { size: 28 } },
                    ticks: {
                        font: {
                            size: 20 // Adjust Y-axis label size
                        }
                    },
                    
                },
            }
        }
    });
}


function submitMood(mood) {
    let reason = document.querySelector("#input")
    let reasonValue = document.querySelector("#input").value.trim();
    let currentDate = new Date().toLocaleDateString();

    if (reasonValue === "") {
        alert("Enter the reason is mandatory");
        return;
    }

    let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
    let moodValue = {
        mood: mood,
        date: currentDate,
        reason: reasonValue
    }
    moodHistory.push(moodValue);

    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
    reason.value = "";
    alert("Mode Saved Successfully");
    generateMoodChart();
}


window.onload = generateMoodChart();
window.onload = function (){
    welcome("Welcome to Moody Budddy. Let's check your mood");
}
// window.addEventListener('load',function(){
//     welcome("Welcome to Moody Budddy. Let's check your mood");
// });