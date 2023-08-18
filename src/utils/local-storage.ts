export function setItem(name: string, value: string = '') {
    localStorage.setItem(name, value)
}

export function getItem(name: string): string {
    return localStorage.getItem(name) || ''
} 