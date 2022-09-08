import { onMounted, onUnmounted } from 'vue'
// TODO: composable naming convension
// TODO: composable folders

// TODO: fix types fo target and event
export function useEventListener(
  target: any,
  eventType: string,
  callback: any
) {
  onMounted(() => target.addEventListener(eventType, callback))
  onUnmounted(() => target.removeEventListener(eventType, callback))
}
