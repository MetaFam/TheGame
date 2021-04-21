
export const getDiscordId = (targetParameter: string) => {
  // Parse the targetParameter
  // desktop/web user if starts with <@! and ends with >
  // mobile user if starts with <@ and ends with >
  if (targetParameter.startsWith('<@!') && targetParameter.endsWith('>')) {
    return targetParameter.slice(3, targetParameter.length - 1);
  } 
  
  if (targetParameter.startsWith('<@') && targetParameter.endsWith('>')) {
    return targetParameter.slice(2, targetParameter.length - 1);
  } 
  
  throw new Error('Unexpected argument for targetParameter');
}
