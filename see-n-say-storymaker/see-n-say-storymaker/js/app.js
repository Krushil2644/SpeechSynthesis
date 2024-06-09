/* Variables
-------------------------------------------------- */
var synth = window.speechSynthesis;
var speakButton = document.getElementById('speak-button');
var storyButton = document.getElementById('story-button');
var resetButton = document.getElementById('reset-button');
var textInput = document.getElementById('text-input');
var presetButtons = document.querySelectorAll('.preset-button');
var status = document.getElementById('status');
var voiceSelect = document.getElementById('voice-select');
var rateInput = document.getElementById('rate-input');
var storyOutput = document.getElementById('story-output');

var voices = [];

/* Functions
-------------------------------------------------- */
/**
 * Populate the voice list dropdown with available voices
 */
function populateVoiceList() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach(function(voice) {
        var option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

/**
 * Speak the provided string using the selected voice and rate
 * @param {string} string - Text to be spoken
 */
function speakNow(string) {
    var utterThis = new SpeechSynthesisUtterance(string);
    var selectedVoiceName = voiceSelect.selectedOptions[0].getAttribute('data-name');
    voices.forEach(function(voice) {
        if (voice.name === selectedVoiceName) {
            utterThis.voice = voice;
        }
    });
    utterThis.rate = rateInput.value || 1;
    utterThis.onstart = function() {
        status.textContent = 'Speaking...';
    };
    utterThis.onend = function() {
        status.textContent = 'Done speaking.';
    };
    synth.speak(utterThis);
}

/**
 * Generate a random story from a predefined list and speak it
 */
function generateRandomStory() {
    var stories = [
        "Once upon a time in a land far, far away, there lived a brave knight.",
        "In a small village by the sea, a young girl discovered a hidden treasure.",
        "High up in the mountains, an old wizard cast a powerful spell."
    ];
    var randomIndex = Math.floor(Math.random() * stories.length);
    var randomStory = stories[randomIndex];
    textInput.value = randomStory;
    storyOutput.textContent = randomStory;
    speakNow(randomStory);
}

/**
 * Reset the content of the text input, story output, and status
 */
function resetContent() {
    textInput.value = '';
    storyOutput.textContent = '';
    status.textContent = '';
}

/* Event Listeners
-------------------------------------------------- */
/**
 * Event listener for the speak button
 */
speakButton.addEventListener('click', function() {
    var textToSpeak = textInput.value;
    if (textToSpeak) {
        speakNow(textToSpeak);
    } else {
        alert('Please enter some text to speak.');
    }
});

/**
 * Event listener for the story button
 */
storyButton.addEventListener('click', generateRandomStory);

/**
 * Event listener for the reset button
 */
resetButton.addEventListener('click', resetContent);

/**
 * Event listeners for the preset buttons
 */
presetButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        speakNow(button.textContent);
    });
});

/**
 * Event listener to populate the voice list when voices are loaded
 */
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

/* Initialize
-------------------------------------------------- */
populateVoiceList();
