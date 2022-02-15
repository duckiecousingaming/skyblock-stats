export const colorCodes: { [key: string]: string } = {
    '0': '#000000', // black
    '1': '#0000be', // blue
    '2': '#00be00', // green
    '3': '#00bebe', // cyan
    '4': '#be0000', // red
    '5': '#be00be', // magenta
    '6': '#ffaa00', // gold
    '7': '#bebebe', // light gray
    '8': '#3f3f3f', // dark gray
    '9': '#3f3ffe', // light blue
    'a': '#3ffe3f', // light green
    'b': '#3ffefe', // light cyan
    'c': '#fe3f3f', // light red
    'd': '#fe3ffe', // light magenta
    'e': '#fefe3f', // yellow
    'f': '#ffffff', // white
}

const specialCodes: { [key: string]: string } = {
    'l': 'font-weight: bold'
}

const colorCodeCharacter = '§'

export function formattingCodeToHtml(formatted: string): string {
    let htmlOutput = ''
    // we store the hex code, not the formatting code
    let currentColor = null
    // we store the css code, not the formatting code
    const activeSpecialCodes: string[] = []
    function reset() {
        if (currentColor) {
            htmlOutput += '</span>'
            currentColor = null
        }
        while (activeSpecialCodes.pop()) {
            htmlOutput += '</span>'
        }
    }
    while (formatted.length > 0) {
        const character = formatted[0]
        formatted = formatted.slice(1)
        // if it encounters § (or whatever colorCodeCharacter is), then read the next character
        if (character === colorCodeCharacter) {
            const colorCharacter = formatted[0]
            formatted = formatted.slice(1)
            if (colorCodes[colorCharacter]) {
                if (currentColor !== colorCodes[colorCharacter]) { // make sure the color is different than the active one
                    // if there's already a color, close that tag
                    if (currentColor) htmlOutput += '</span>'
                    currentColor = colorCodes[colorCharacter]
                    htmlOutput += `<span style="color: ${currentColor}">`
                }
            } else if (specialCodes[colorCharacter]) {
                if (!activeSpecialCodes.includes(specialCodes[colorCharacter])) {
                    activeSpecialCodes.push(specialCodes[colorCharacter])
                    htmlOutput += `<span style="${specialCodes[colorCharacter]}">`
                }
            } else if (colorCharacter === 'r') {
                reset()
            }
        } else {
            htmlOutput += character
        }
    }
    reset()
    return htmlOutput
}
export function removeFormattingCode(formatted: string): string {
    return formatted.replace(new RegExp(colorCodeCharacter + '.', 'g'), '')
}

function moveToEndOfId(word: string, thing: string) {
    if (thing.startsWith(`${word}_`))
        thing = thing.slice(`${word}_`.length) + `_${word}`
    return thing
}

export function millisecondsToTime(totalMilliseconds: number) {
    const totalSeconds = totalMilliseconds / 1000
    const totalMinutes = totalSeconds / 60
    const totalHours = totalMinutes / 60
    const totalDays = totalHours / 24
    const milliseconds = Math.floor(totalMilliseconds) % 1000
    const seconds = Math.floor(totalSeconds) % 60
    const minutes = Math.floor(totalMinutes) % 60
    const hours = Math.floor(totalHours) % 24
    const days = Math.floor(totalDays)
    const stringUnits: string[] = []
    if (days > 1) stringUnits.push(`${days} days`)
    else if (days == 1) stringUnits.push(`${days} day`)
    if (hours > 1) stringUnits.push(`${hours} hours`)
    else if (hours == 1) stringUnits.push(`${hours} hour`)
    if (minutes > 1) stringUnits.push(`${minutes} minutes`)
    else if (minutes == 1) stringUnits.push(`${minutes} minute`)
    if (seconds > 1) stringUnits.push(`${seconds} seconds`)
    else if (seconds == 1) stringUnits.push(`${seconds} second`)
    if (milliseconds > 1) stringUnits.push(`${milliseconds} milliseconds`)
    else if (milliseconds == 1) stringUnits.push(`${milliseconds} millisecond`)
    return stringUnits.slice(0, 2).join(' and ')
}

export function cleanId(id: string) {
    for (const string of ['deaths', 'kills', 'collection', 'skill'])
        id = moveToEndOfId(string, id)

    return id
        .replace(/^./, id[0].toUpperCase())
        .replace(/_/g, ' ')
}

export function toRomanNumerals(number: number) {
    return ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'][number]
}

export function shuffle<T>(a: T[]): T[] {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}