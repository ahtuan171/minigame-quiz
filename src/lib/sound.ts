let context: AudioContext | null = null;
export function playFeedback(enabled: boolean, correct: boolean) {
  if (!enabled) return;
  try {
    context ??= new AudioContext();
    void context.resume().catch(() => {});
    const oscillator = context.createOscillator(),
      gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = correct ? 660 : 260;
    gain.gain.setValueAtTime(0.035, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.22);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.23);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  } catch {
    /* Audio is optional; blocked audio never affects the adventure. */
  }
}
