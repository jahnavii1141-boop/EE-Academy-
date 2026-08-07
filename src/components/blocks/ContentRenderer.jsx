import ContentBlock from './ContentBlocks'

// Renders a content array as clean, stacked typographic blocks (Anthropic
// Academy style). No auto-gridding — density comes from the words, not cards.
export default function ContentRenderer({ content = [] }) {
  return (
    <>
      {content.map((block, i) => <ContentBlock key={i} block={block} />)}
    </>
  )
}
