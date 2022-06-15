export const isMatch = (obj: any, char: any, keys: string[]) => {
  return keys.some((match: any) => obj[match].toLowerCase().includes(char));
};

export const replaceAll = (obj: any, regex: RegExp, keys: string[]) => {
  const newObj = {...obj};
  keys.forEach(
    key =>
      (newObj[key] = obj[key].replaceAll(
        regex,
        (match: any) => `<mark>${match}</mark>`
      ))
  );
  return newObj;
};
