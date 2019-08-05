export const isEmpty = (obj: any) => {
  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      return false;
    }
  }
  return true;
};
