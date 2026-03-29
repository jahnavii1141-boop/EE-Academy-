import ContentBlock from './ContentBlocks'

// Block types that should auto-grid when consecutive
const GRID_TYPES = new Set(['icon-card', 'stat-highlight'])

/**
 * ContentRenderer
 * Accepts a content array and renders blocks.
 * Consecutive icon-card or stat-highlight blocks are auto-wrapped in responsive grids.
 */
export default function ContentRenderer({ content = [] }) {
  const groups = []
  let i = 0

  while (i < content.length) {
    const block = content[i]

    if (GRID_TYPES.has(block.type)) {
      // Collect consecutive blocks of the same grid type
      const gridBlocks = []
      const gridType = block.type
      while (i < content.length && content[i].type === gridType) {
        gridBlocks.push(content[i])
        i++
      }
      groups.push({ kind: 'grid', type: gridType, blocks: gridBlocks })
    } else {
      groups.push({ kind: 'single', block })
      i++
    }
  }

  return (
    <>
      {groups.map((group, gi) => {
        if (group.kind === 'grid') {
          const cols = group.type === 'stat-highlight'
            ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-3 my-8'
            : 'grid sm:grid-cols-2 gap-3 my-8'

          return (
            <div key={gi} className={cols}>
              {group.blocks.map((block, bi) => (
                <ContentBlock key={bi} block={block} />
              ))}
            </div>
          )
        }
        return <ContentBlock key={gi} block={group.block} />
      })}
    </>
  )
}
