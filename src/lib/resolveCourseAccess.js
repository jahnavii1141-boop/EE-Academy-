export function resolveCourseAccess(catalogModule, fullModule, hasPaid) {
  const canAccess = catalogModule.free || hasPaid

  return {
    canAccess,
    module: canAccess ? fullModule : { ...catalogModule, content: [] },
  }
}
