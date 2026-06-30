import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { CopyValue } from './copy-value';
import { Mermaid } from './mermaid';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    CopyValue,
    Mermaid,
    ...components,
  };
}
