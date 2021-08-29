import axios from 'axios';

const addUser = async (req, res) => {
  const { userId, userName } = req.body;

  axios
    .post(
      'https://api/chatengine.io/projects/people/',
      { userName: userName, secret: userId },
      { headers: { 'Private-Key': process.env.CHAT_ENGINE_PRIVATE_KEY } },
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
