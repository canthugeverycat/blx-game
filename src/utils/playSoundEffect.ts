import { SOUNDS } from '@/globals/const';

export type SoundConfig = {
  url: string;
  start?: number;
  end?: number;
  volume?: number;
};

// We preload all sounds so we don't get a delay when playing
let preloadedSounds: { [key: string]: HTMLAudioElement } | null = null;

/**
 * Plays a selected sound effect
 *
 * @param {SoundConfig} config Config of the current sound
 */
export const playSoundEffect = (config: SoundConfig) => {
  const sound = new Audio(config.url);
  sound.currentTime = config.start || 0;
  sound.volume = config.volume || 1;

  sound.play().catch((e) => console.warn('Sound Effect:', e));

  if (config.end) {
    const timeout = setTimeout(() => {
      sound.pause();
      sound.currentTime = 0;

      clearTimeout(timeout);
    }, config.end * 1000);
  }
};

/**
 * Preload all sounds effects from config
 */
export const preloadAllSounds = () => {
  if (preloadedSounds) {
    return;
  }

  const data: { [key: string]: HTMLAudioElement } = {};

  for (const key in SOUNDS) {
    const soundKey = key as keyof typeof SOUNDS;
    const s = new Audio(SOUNDS[soundKey].url);
    s.preload = 'auto';

    s.load();

    data[soundKey] = s;
  }
};
