// Sound Effects
export const SOUNDS = {
  START_SPIN: {
    url: 'https://cdn.freesound.org/previews/348/348503_321967-lq.mp3',
    start: 0.2,
    end: 0.7,
  },
  STEP_TICK: {
    url: 'https://cdn.freesound.org/previews/110/110314_1460197-lq.mp3',
    volume: 0.5,
  },
  WIN: {
    url: 'https://cdn.freesound.org/previews/443/443334_1943411-lq.mp3',
  },
  ADD_SLOT: {
    url: 'https://cdn.freesound.org/previews/704/704793_15236906-lq.mp3',
    start: 0.3,
    end: 0.6,
    volume: 0.7,
  },
  REMOVE_SLOT: {
    url: 'https://cdn.freesound.org/previews/388/388480_4297074-lq.mp3',
    start: 0.21,
  },
} as const;
