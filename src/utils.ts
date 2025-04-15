export function getRuntimeRequire(packageName: string) {
    try {
        const nodeRequire = window.require;

        return nodeRequire(packageName);
    } catch (error) {
        console.error(`Failed to require package "${packageName}" at runtime:`, error);
        return null;
    }
}
