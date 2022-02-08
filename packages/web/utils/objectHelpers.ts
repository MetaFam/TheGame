export const isEmpty = (obj: unknown) => {
  if (Array.isArray(obj) && obj.length === 0) {
    return true;
  }
  if (obj === '') {
    return true;
  }
  if (obj && typeof obj === 'object' && Object.keys(obj).length === 0) {
    return true;
  }
  return false;
};
