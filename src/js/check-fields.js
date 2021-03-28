function checkFields(elem) {
  if (
    elem.children[1].firstChild.value === '' ||
    elem.children[2].firstChild.value === '' ||
    elem.children[3].firstChild.value === '' ||
    elem.children[4].firstChild.value === ''
  ) {
    return true;
  }
}
export default checkFields;
