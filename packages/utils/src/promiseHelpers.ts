export function isFulfilled<T>(
  item: PromiseSettledResult<T>,
): item is PromiseFulfilledResult<T> {
  return item.status === 'fulfilled';
}

export function isRejected<T>(
  item: PromiseSettledResult<T>,
): item is PromiseRejectedResult {
  return item.status === 'rejected';
}
