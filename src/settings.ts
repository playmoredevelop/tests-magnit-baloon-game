import { ref } from "vue";

export const PRELOADER_PROGRESS = ref(0)
export const PRELOADER_VISIBLE = ref(true)
export const WINNER_PRIZE = ref(0)
export const SHOW_RESULTS = ref(false)
export const BURST_LEFT = ref(0)

export const VIEWPORT_ID = 'gameplay'
export const BASE_URL = ''
export const BALLOON_SCREEN_COUNT = 10
export const BALLOON_BURST_ALLOWED = 10
export const BALLOON_SPEED_MIN = 100 / 60
export const BALLOON_SPEED_MAX = 150 / 60
export const BALLOON_SCALE_MIN = 0.8
export const BALLOON_SCALE_MAX = 1.5
export const BALLOON_TINT_COLORS = [0x67C7FD, 0xFFD43B, 0xFF76C2]
export const PRIZE = 20