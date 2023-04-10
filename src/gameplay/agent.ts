export function isRetina(): boolean {
    return window.devicePixelRatio > 1
}

export function isMobile(): boolean {
    const ua = window.navigator.userAgent
    return !! (ua.match(/Android/i) || ua.match(/webOS/i) || ua.match(/iPhone/i) || ua.match(/iPad/i) || ua.match(/iPod/i) || ua.match(/BlackBerry/i) || ua.match(/Windows Phone/i))
}