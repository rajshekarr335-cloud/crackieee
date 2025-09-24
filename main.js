// main.js
// Handles live transcription and co-pilot logic

// --- Transcription Module ---
class LiveTranscriber {
  constructor(onResult) {
    // Use Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      throw new Error('Web Speech API not supported in this browser.');
    }
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.onResult = onResult;
    this._setupEvents();
  }

  _setupEvents() {
    this.recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      this.onResult(transcript, event.results[event.results.length - 1].isFinal);
    };
    this.recognition.onerror = (event) => {
      alert('Speech recognition error: ' + event.error);
    };
  }

  start() {
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }
}

// --- Co-Pilot Module ---
class TextCopilot {
  // Simple rule-based suggestions; extend for more advanced logic
  getSuggestions(text) {
    if (!text.trim()) return '';
    const lower = text.toLowerCase();
    if (lower.includes('weather')) {
      return 'Would you like a weather update?';
    }
    if (lower.includes('meeting')) {
      return 'Do you want to schedule or summarize a meeting?';
    }
    if (lower.endsWith('?')) {
      return 'That sounds like a question. Need help finding an answer?';
    }
    if (text.length > 100) {
      return 'Here’s a quick summary: ' + text.slice(0, 60) + '...';
    }
    return 'Listening... Let me know if you need a summary or suggestion!';
  }
}

// --- Crackieee Chat UI Logic ---
const chatLog = document.getElementById('chat-log');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');

let transcriber = null;
let copilot = new TextCopilot();
let lastTranscript = '';
let lastUserBubble = null;

// Add a chat bubble to the chat log
function addChatBubble(text, sender) {
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble ' + sender;
  bubble.textContent = text;
  chatLog.appendChild(bubble);
  chatLog.scrollTop = chatLog.scrollHeight;
  return bubble;
}

// Update the chat log with live transcription and co-pilot response
function updateChat(transcript, isFinal) {
  // If no user bubble yet or last was final, add a new one
  if (!lastUserBubble || lastUserBubble.isFinal) {
    lastUserBubble = addChatBubble(transcript, 'user');
    lastUserBubble.isFinal = false;
  } else {
    lastUserBubble.textContent = transcript;
  }
  // On final, add co-pilot response
  if (isFinal) {
    lastUserBubble.isFinal = true;
    const response = copilot.getSuggestions(transcript);
    if (response) addChatBubble(response, 'copilot');
  }
}

// Button event handlers
startBtn.onclick = () => {
  if (!transcriber) {
    try {
      transcriber = new LiveTranscriber(updateChat);
    } catch (e) {
      alert(e.message);
      return;
    }
  }
  transcriber.start();
  startBtn.disabled = true;
  stopBtn.disabled = false;
};

stopBtn.onclick = () => {
  if (transcriber) transcriber.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

// Stop recognition when the page is closed
window.onbeforeunload = () => {
  if (transcriber) transcriber.stop();
};
