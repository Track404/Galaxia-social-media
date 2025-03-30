export function isSafari() {
  const ua = navigator.userAgent;
  return ua.includes('Safari') && !ua.includes('Chrome');
}
