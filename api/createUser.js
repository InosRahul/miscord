import axios from 'axios';

const createUser = async (req, res) => {
  const { userId, userName } = req.body;

  axios
    .post(
      'https://api.chatengine.io/projects/people/',
      { username: userName, secret: userId },
      { headers: { 'PRIVATE-KEY': process.env.CHAT_ENGINE_PRIVATE_KEY } },
    )
    .then(apiRes => {
      res.json({
        body: apiRes.data,
        error: null,
      });
    })
    .catch(() => {
      res.json({
        body: null,
        error: 'Error adding the user',
      });
    });
};

export default createUser;
