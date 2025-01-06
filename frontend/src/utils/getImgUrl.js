/* eslint-disable no-unused-vars */
function getImgUrl(name) {
  return new URL(`../assets/books/${name}`, import.meta.url);
}
export default getImgUrl;
