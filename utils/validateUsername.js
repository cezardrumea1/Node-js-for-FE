export default function (username, res) {
  if (!username) {
    res.status(400).json({ error: 'Username is required' });
    return true;
  }

  if (username.length < 3 || username.length > 20) {
    res
      .status(400)
      .json({ error: 'Username must be between 3 and 20 characters' });
    return true;
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    res
      .status(400)
      .json({ error: 'Username must only contain letters and numbers' });
    return true;
  }

  return false;
}
