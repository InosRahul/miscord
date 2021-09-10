export const groupMessages = messages => {
  const finalArr = [];

  let currArr = [];
  let currAuthor = '';

  messages.forEach(msg => {
    if (msg.sender.username !== currAuthor) {
      if (currAuthor) {
        finalArr.push([...currArr]);
      }
      currArr.splice(0, currArr.length);
      currArr.push(msg);
      currAuthor = msg.sender.username;
    } else {
      currArr.push(msg);
    }
  });

  finalArr.push([...currArr]);

  return finalArr;
};
