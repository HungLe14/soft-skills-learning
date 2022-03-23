export const getContentInsidePTag = (string) => {
  const contentInside = string.match(/(?<=^<p>)([\s\S]+?)(?=<\/p>)/);
  return contentInside && contentInside[0];
};

export const deletePTag = (string) => {
  const reg = /(^<p>)([\s\S]+?)(<\/p>)/;
  const wholeContent = string.replace(reg, "");
  return wholeContent;
};

export const getImgNameFromSrc = (string) => {
  const reg =
    /(?<=^<img src=https:\/\/firebasestorage.googleapis.com\/v0\/b\/fpt-soft-skill-learning.appspot.com\/o\/)([\s\S]+?)(?=\?alt=media\/>)/;
  const nameImg = string.match(reg);
  return nameImg && nameImg[0];
};

export const deleteImgTag = (string) => {
  const reg =
    /(^<img src=https:\/\/firebasestorage.googleapis.com\/v0\/b\/fpt-soft-skill-learning.appspot.com\/o\/)([\s\S]+?)(\/>)/;
  const wholeContent = string.replace(reg, "");
  return wholeContent;
};

export const getImgNameCourse = (string) => {
  const reg =
    /(?<=^https:\/\/firebasestorage.googleapis.com\/v0\/b\/fpt-soft-skill-learning.appspot.com\/o\/)([\s\S]+?)(?=\?alt=media)/;
  const nameImg = string.match(reg);
  return nameImg[0];
};
