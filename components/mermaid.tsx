import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { renderMermaidSVG } from 'beautiful-mermaid';

/**
 * Renders Mermaid diagrams to SVG at build time (zero DOM deps), themed with
 * the Fumadocs CSS variables so they match the dark docs theme, with the Spark
 * neon as the accent. ```mermaid code blocks become this component via the
 * remarkMdxMermaid plugin (see source.config.ts). Falls back to a code block
 * if the diagram fails to parse.
 */
export function Mermaid({ chart }: { chart: string }) {
  try {
    const svg = renderMermaidSVG(chart, {
      bg: 'var(--color-fd-background)',
      fg: 'var(--color-fd-foreground)',
      muted: 'var(--color-fd-muted-foreground)',
      surface: 'var(--color-fd-card)',
      border: 'var(--color-fd-border)',
      line: 'var(--color-fd-border)',
      accent: '#e1ff83',
      transparent: true,
    });

    return (
      <div
        className="my-4 flex justify-center overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  } catch {
    return (
      <CodeBlock title="Mermaid">
        <Pre>{chart}</Pre>
      </CodeBlock>
    );
  }
}
