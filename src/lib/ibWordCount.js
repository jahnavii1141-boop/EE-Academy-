// ── IB-compliant multi-channel word counter ──────────────────────────────────
// Walks a TipTap/ProseMirror document tree (editor.getJSON()) and splits words
// into the official body count vs excluded materials, per IB EE guidelines.
//
// @typedef {Object} EditorNode
// @property {string} type
// @property {string} [text]
// @property {Object} [attrs]
// @property {{type:string}[]} [marks]
// @property {EditorNode[]} [content]
//
// @typedef {Object} IBWordCountState
// @property {number} coreBodyCount   words toward the official 4,000 limit
// @property {number} excludedCount   tables, captions, bibliography, image attrs
// @property {number} totalCount      core + excluded (diagnostic)
// @property {number} limit           4,000 by default
// @property {number} percentOfLimit  round(core / limit * 100)
// @property {'ok'|'approaching'|'exceeded'} status

const DEFAULT_EXCLUDED = new Set([
  'table', 'tableRow', 'tableHeader', 'tableCell',
  'caption', 'figcaption', 'figure', 'image',
  'bibliography', 'referenceList',
])

const DEFAULT_BLOCKED = new Set([
  'math', 'mathBlock', 'mathInline', 'inlineMath',
  'equation', 'formula', 'latex', 'latexBlock',
])

function countWords(text) {
  const trimmed = (text || '').trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).filter(Boolean).length
}

/**
 * @param {EditorNode|null|undefined} documentJSON
 * @param {{limit?:number, warnAt?:number, excludedTypes?:Set<string>, blockedTypes?:Set<string>}} [config]
 * @returns {IBWordCountState}
 */
export function calculateIBWordCount(documentJSON, config = {}) {
  const limit = config.limit ?? 4000
  const warnAt = config.warnAt ?? 3800
  const excludedTypes = config.excludedTypes ?? DEFAULT_EXCLUDED
  const blockedTypes = config.blockedTypes ?? DEFAULT_BLOCKED

  let coreBodyCount = 0
  let excludedCount = 0

  // zone: 'core' | 'excluded' | 'blocked' — most restrictive wins, never escapes upward.
  const walk = (node, parentZone) => {
    if (!node) return
    let zone = parentZone
    if (blockedTypes.has(node.type)) zone = 'blocked'
    else if (zone !== 'blocked' && excludedTypes.has(node.type)) zone = 'excluded'
    if (node.attrs?.latex !== undefined || node.attrs?.language === 'latex') zone = 'blocked'

    // Image alt/title text → excluded.
    if (node.type === 'image' && zone !== 'blocked') {
      excludedCount += countWords(node.attrs?.alt) + countWords(node.attrs?.title)
    }

    if (typeof node.text === 'string') {
      const blockedByMark = node.marks?.some(m => blockedTypes.has(m.type)) ?? false
      if (zone !== 'blocked' && !blockedByMark) {
        const words = countWords(node.text)
        if (zone === 'excluded') excludedCount += words
        else coreBodyCount += words
      }
    }

    if (node.content) for (const child of node.content) walk(child, zone)
  }

  walk(documentJSON, 'core')

  const status = coreBodyCount > limit ? 'exceeded' : coreBodyCount >= warnAt ? 'approaching' : 'ok'

  return {
    coreBodyCount,
    excludedCount,
    totalCount: coreBodyCount + excludedCount,
    limit,
    percentOfLimit: limit > 0 ? Math.round((coreBodyCount / limit) * 100) : 0,
    status,
  }
}
