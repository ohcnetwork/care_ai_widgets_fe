import { cn } from "@/lib/utils";

interface MarkdownProps {
  content: string;
  className?: string;
}

/**
 * Simple markdown-like renderer.
 * Handles bold (**text**), bullets (- item), and paragraphs.
 * For a full implementation, swap in react-markdown.
 */
export function Markdown({ content, className }: MarkdownProps) {
  if (!content) return null;

  const html = content
    // bold
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // line breaks into paragraphs
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      // bullet list
      if (/^[-*] /m.test(trimmed)) {
        const items = trimmed
          .split(/\n/)
          .filter((l) => l.trim())
          .map((l) => `<li>${l.replace(/^[-*]\s*/, "")}</li>`)
          .join("");
        return `<ul class="list-disc pl-4 space-y-0.5">${items}</ul>`;
      }
      return `<p>${trimmed.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("");

  return (
    <div
      className={cn("prose prose-sm max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
