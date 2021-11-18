export const joinUserName = (people, currentUsername) => {
  return (
    'You, ' +
    '@' +
    people
      .map(p => p.person.username)
      .filter(un => un !== currentUsername)
      .join(', @')
  );
};
