import { onMounted, onUnmounted } from 'vue'

export function useEventListener<T extends HTMLElement>(
  target: T,
  eventType: string,
  callback: (...args: any[]) => any
) {
  if (!target || !target.addEventListener) return

  onMounted(() => target.addEventListener(eventType, callback))
  onUnmounted(() => target.removeEventListener(eventType, callback))
}
