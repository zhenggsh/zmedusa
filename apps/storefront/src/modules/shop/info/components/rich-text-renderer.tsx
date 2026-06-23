import { ContentBlock } from "../types"

interface RichTextRendererProps {
  blocks: ContentBlock[]
}

export function RichTextRenderer({ blocks }: RichTextRendererProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            const HeadingTag = `h${block.level}` as "h1" | "h2" | "h3"
            return (
              <HeadingTag
                key={index}
                className={`font-bold text-shop-text-primary ${
                  block.level === 1
                    ? "text-3xl"
                    : block.level === 2
                    ? "text-xl"
                    : "text-lg"
                }`}
              >
                {block.text}
              </HeadingTag>
            )
          case "paragraph":
            return (
              <p key={index} className="text-shop-text-secondary leading-relaxed">
                {block.text}
              </p>
            )
          case "list":
            return (
              <ul key={index} className="list-disc list-inside space-y-2 text-shop-text-secondary">
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )
          case "faq":
            return null // FAQ blocks are handled by FAQAccordion
          default:
            return null
        }
      })}
    </div>
  )
}
