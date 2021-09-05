//returns the other person username which is currently in the selected chat
// other than the logged in user

export const otherUser = (chatConfig, selectedChat) => {
  return selectedChat.people.find(
    p => p.person.username !== chatConfig.userName,
  )?.person?.username;
};
