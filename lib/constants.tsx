// Represents a sound model with its name and URL
export interface SoundModel {
  name: string; // The name of the sound model
  url: string;  // The URL to the model for generating sound
}

// An array of predefined sound models
const SOUND_MODELS: SoundModel[] = [
  {
    name: "Facebook - Fastspeech2",
    url: "https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech",
  },
  {
    name: "ESPNET - Ljspeech",
    url: "https://api-inference.huggingface.co/models/espnet/kan-bayashi_ljspeech_vits",
  },
  {
    name: "Speechbrain - Ljspeech",
    url: "https://api-inference.huggingface.co/models/speechbrain/tts-tacotron2-ljspeech",
  },
  {
    name: "Voicemod - Fastspeech2",
    url: "https://api-inference.huggingface.co/models/Voicemod/fastspeech2-en-male1",
  },
];

// Export the array of sound models
export default SOUND_MODELS;
