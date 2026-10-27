import { useState } from "react";
import { loadSettings, saveSettings } from "../lib/storage";
import type { RewardSettings } from "../types/game";
export function useSettings() {
  const [settings, setSettings] = useState(loadSettings);
  const [error, setError] = useState(false);
  function update(next: RewardSettings) {
    setSettings(next);
    setError(!saveSettings(next));
  }
  return {
    settings,
    update,
    error,
    toggleSound: () =>
      update({ ...settings, soundEnabled: !settings.soundEnabled }),
  };
}
