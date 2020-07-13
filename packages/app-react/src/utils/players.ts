export function getPlayerETHAddress(player: any) {
  return player.Accounts.find((a: any) => a.type === 'ETHEREUM').identifier;
}
