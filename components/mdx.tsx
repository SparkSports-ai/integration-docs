import { Callout } from 'fumadocs-ui/components/callout';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { CSSProperties, ReactNode } from 'react';
import { Mermaid } from './mermaid';

const TOXIC_GREEN = '#e1ff83';

function BrandCallout({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <Callout
      type="warn"
      title={title}
      icon={false}
      style={{ '--callout-color': TOXIC_GREEN } as CSSProperties}
    >
      {children}
    </Callout>
  );
}

type ApiTypeField = {
  description?: ReactNode;
  type?: string;
  required?: boolean;
};

/**
 * API field reference table. Drop-in for Fumadocs' TypeTable (same `type`
 * prop) but renders an always-visible table instead of a collapsible
 * accordion, themed to the docs. Optional fields are marked with `?`.
 */
function ApiTypeTable({ type }: { type: Record<string, ApiTypeField> }) {
  return (
    <div className="not-prose my-4 overflow-x-auto rounded-lg border border-fd-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-fd-muted/50 text-fd-muted-foreground">
            <th className="px-4 py-2.5 text-left font-medium">Property</th>
            <th className="px-4 py-2.5 text-left font-medium">Type</th>
            <th className="px-4 py-2.5 text-left font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(type).map(([name, field], index) => (
            <tr
              key={name}
              className={index > 0 ? 'border-t border-fd-border' : undefined}
            >
              <td className="whitespace-nowrap px-4 py-2.5 align-top font-mono text-[13px] font-medium text-fd-primary">
                {name}
                {field.required !== true && (
                  <span className="text-fd-muted-foreground">?</span>
                )}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 align-top font-mono text-[13px] text-fd-muted-foreground">
                {field.type}
              </td>
              <td className="px-4 py-2.5 align-top text-fd-foreground/90">
                {field.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ApiTypeTable,
    BrandCallout,
    Mermaid,
    TypeTable: ApiTypeTable,
    ...components,
  };
}
