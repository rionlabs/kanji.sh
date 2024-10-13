/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*.mdx" {
    let MDXComponent: (props: unknown) => JSX.Element;
    export const frontmatter: Record<string, unknown>;
    export default MDXComponent;
}
