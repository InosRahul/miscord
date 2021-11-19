export const groupMessages = messages => {
  const finalArr = [];

  let currArr = [];
  let currAuthor = '';
  let currDate = new Date(messages[0].created).getDate();

  messages.forEach(msg => {
    if (
      msg.sender.username !== currAuthor ||
      Math.abs(new Date(msg.created).getDate() - currDate) > 0
    ) {
      if (currAuthor) {
        finalArr.push([...currArr]);
      }
      currArr.splice(0, currArr.length);
      currArr.push(msg);
      currAuthor = msg.sender.username;
      currDate = new Date(msg.created).getDate();
    } else {
      currArr.push(msg);
    }
  });

  finalArr.push([...currArr]);

  return finalArr;
};
