// Locked lessons show a taste — the objectives + first paragraph — then the
// paywall, instead of a bare wall (never 404/redirect).
function teaser(fullModule) {
  if (!fullModule?.content) return []
  const out = []
  const first = fullModule.content[0]
  if (first && first.type === 'objectives') out.push(first)
  const firstPara = fullModule.content.find((b) => b.type === 'paragraph')
  if (firstPara) out.push(firstPara)
  return out
}

export function resolveCourseAccess(catalogModule, fullModule, hasPaid, isPremium = false) {
  const canAccess = catalogModule.free
    || (catalogModule.premium ? isPremium : hasPaid)

  return {
    canAccess,
    module: canAccess ? fullModule : { ...catalogModule, content: teaser(fullModule) },
  }
}
