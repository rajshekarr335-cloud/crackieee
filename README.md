# Crackieee: Live Transcription & Co-Pilot Chat

Crackieee is a simple, modern website that captures microphone input, transcribes your speech live, and displays both your words and a text-only co-pilot’s responses in a chat-like format.


## Features
- Real-time speech-to-text transcription (Web Speech API)
- Chat-style interface: your speech and co-pilot responses appear as chat bubbles
- Clean, modern, fully responsive UI (works on desktop, tablet, and mobile)
- Modular, well-commented JavaScript for easy extension
- Mobile web app support (installable, with manifest and icons)

## Browser & Device Support
- Works in all modern browsers: **Chrome, Edge, Firefox, Safari** (desktop & mobile)
- Uses the Web Speech API for transcription (best in Chrome, but supported in most browsers)
- Fully responsive: looks great on phones, tablets, and computers

**Note:** Microphone permissions and speech recognition may vary by browser/device. Chrome offers the best experience. If you have issues in Safari or Firefox, try Chrome or Edge.

## Setup Instructions (VS Code)

### 1. Prerequisites
- A modern web browser (Chrome, Edge, or Firefox with Web Speech API support)
- [Node.js](https://nodejs.org/) (optional, for running a local server)

### 2. Run Locally
1. Open this folder in VS Code.
2. You can either:
   - Open `index.html` directly in your browser (double-click or right-click > Open with...)
   - **Or** run a local server for best results:
     - Using Node.js:
       ```powershell
       npx serve .
       ```
     - Or with Python:
       ```powershell
       python -m http.server
       ```
3. Allow microphone access when prompted.

### 3. No External Dependencies
All functionality uses built-in browser APIs. No install required.

## File Structure
- `index.html` — Main web page (Crackieee UI)
- `main.js` — Handles transcription and chat logic
- `style.css` — Modern, chat-inspired styling

## Extending Crackieee
The code is modular and commented. You can add new co-pilot behaviors, improve the chat UI, or integrate with APIs easily.

## License
MIT
