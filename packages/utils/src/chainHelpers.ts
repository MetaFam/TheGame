export function getHexChainId(chain?: string): string {
  switch (chain?.toLowerCase()) {
    case 'xdai':
      return '0x64';
    case 'polygon':
      return '0x89';
    case 'ethereum':
    default:
      return '0x1';
  }
}
