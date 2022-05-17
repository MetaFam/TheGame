export const convertToRoman = (_num: number): string => {
  let num = _num;

  type RomanOptions = {
    [key: string]: number;
  };

  const romans: RomanOptions = {
    ↈ: 100_000,
    ↇ: 50_000,
    ↂ: 10_000,
    ↁ: 5_000,
    Ⅿ: 1_000,
    ⅭⅯ: 900,
    Ⅾ: 500,
    ⅭⅮ: 400,
    Ⅽ: 100,
    ⅩⅭ: 90,
    Ⅼ: 50,
    ⅩⅬ: 40,
    Ⅹ: 10,
    Ⅸ: 9,
    Ⅴ: 5,
    Ⅳ: 4,
    Ⅰ: 1,
  };
  const smallRomans = [
    'Ⅰ',
    'Ⅱ',
    'Ⅲ',
    'Ⅳ',
    'Ⅴ',
    'Ⅵ',
    'Ⅶ',
    'Ⅷ',
    'Ⅸ',
    'Ⅹ',
    'Ⅺ',
    'Ⅻ',
    'ⅩⅢ',
    'ⅩⅣ',
    'ⅩⅤ',
    'ⅩⅥ',
    'ⅩⅦ',
    'ⅩⅡⅩ',
    'ⅩⅠⅩ',
  ];

  if (num < smallRomans.length) {
    return smallRomans[num - 1];
  }

  let str = '';

  // eslint-disable-next-line no-restricted-syntax
  for (const i of Object.keys(romans)) {
    const q = Math.floor(num / romans[i]);
    num -= q * romans[i];
    str += i.repeat(q);
  }

  return str;
};
