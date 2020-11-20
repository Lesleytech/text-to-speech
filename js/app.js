const actionContainer = document.getElementById('action');
const textarea = document.getElementsByTagName('textarea')[0];
const clearBtn = document.getElementById('clearBtn');
const voiceBtn = document.getElementById('voiceBtn');
const readBtn = document.getElementById('readBtn');

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

voiceBtn.onclick = function () {
  recognition.start();
};

clearBtn.onclick = function () {
  textarea.value = '';
  window.speechSynthesis.cancel();
};

readBtn.onclick = function () {
  const { value } = textarea;

  if (value) {
    readText(textarea.value);
  }
};

recognition.onstart = function () {
  showActionContainer('🎤 Talk now');
  setTimeout(() => {
    hideActionContainer();
  }, 3000);
};

recognition.onspeechend = function () {};

recognition.onresult = function (e) {
  const transcript = e.results[0][0].transcript;

  textarea.value += transcript;
};

function showActionContainer(message) {
  actionContainer.innerText = message;
  actionContainer.style.top = '20px';
  actionContainer.style.opacity = 1;
}

function hideActionContainer() {
  actionContainer.style.top = '-100px';
  actionContainer.style.opacity = 0;
}

function readText(text) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  speech.volume = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}
