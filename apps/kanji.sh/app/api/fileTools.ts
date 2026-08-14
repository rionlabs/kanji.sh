import { readdir } from 'node:fs/promises';
import path from 'node:path';

type FileNode = {
    name: string;
    path: string;
    type: 'file' | 'directory';
    children?: FileNode[];
};

export async function getFileTree(dir: string): Promise<FileNode> {
    const entries = await readdir(dir, { withFileTypes: true });

    const children = await Promise.all(
        entries.map(async (entry) => {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                return getFileTree(fullPath);
            }

            return {
                name: entry.name,
                path: fullPath,
                type: 'file' as const
            };
        })
    );

    return {
        name: path.basename(dir),
        path: dir,
        type: 'directory',
        children
    };
}

function isSvgFile(node: FileNode) {
    return node.type === 'file' && node.name.toLowerCase().endsWith('.svg');
}

export async function renderAsciiFileTree(
    node: FileNode,
    prefix = '',
    isLast = true,
    isRoot = true
): Promise<string> {
    if (isSvgFile(node)) {
        return '';
    }

    const label = node.type === 'directory' ? `${node.name}/` : node.name;
    const line = isRoot ? label : `${prefix}${isLast ? '`-- ' : '|-- '}${label}`;

    if (node.type === 'file') {
        return line;
    }

    const visibleChildren = (node.children ?? [])
        .filter((child) => !isSvgFile(child))
        .sort((a, b) => {
            if (a.type !== b.type) {
                return a.type === 'directory' ? -1 : 1;
            }
            return a.name.localeCompare(b.name);
        });

    if (visibleChildren.length === 0) {
        return line;
    }

    const childPrefix = isRoot ? '' : `${prefix}${isLast ? '    ' : '|   '}`;
    const childLines = visibleChildren
        .map((child, index) =>
            renderAsciiFileTree(child, childPrefix, index === visibleChildren.length - 1, false)
        )
        .filter(Boolean);

    return [line, ...childLines].join('\n');
}
