/**
 * The address is kept in pieces so no literal `name@host` string is ever
 * shipped in the bundle or in the rendered markup, which is what the passive
 * scrapers grep for. This is not secrecy — anything a browser can run can be
 * read — it just means a harvester has to do more than a regex.
 */
const LOCAL = 'vn.0005amrevlihkin' // reversed local part
const DOMAIN = 'moc.liamg' // reversed domain

const AT = String.fromCharCode(64)

export function emailAddress(): string {
  return `${[...LOCAL].reverse().join('')}${AT}${[...DOMAIN].reverse().join('')}`
}

export function mailtoHref(subject?: string): string {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : ''
  return `mailto:${emailAddress()}${query}`
}
