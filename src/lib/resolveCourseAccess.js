export function resolveCourseAccess(catalogModule, fullModule, hasPaid, isPremium = false) {
  const canAccess = catalogModule.free
    || (catalogModule.premium ? isPremium : hasPaid)

  return {
    canAccess,
    module: canAccess ? fullModule : { ...catalogModule, content: [] },
  }
}
