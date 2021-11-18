export const chatTitles = title => {
  let resTitle = '';
  if (title !== null) {
    resTitle = title.length > 1 ? title : 'No one added yet';
  }
  return resTitle;
};
