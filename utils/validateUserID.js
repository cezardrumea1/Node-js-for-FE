export default function (id, res) {
  if (id.length > `${id}`.trim().length) {
    res
      .status(400)
      .json({ error: 'Invalid user ID, it should not contain spaces' });
    return true;
  }

  if (isNaN(+id) || typeof +id !== 'number' || +id < 1) {
    res
      .status(400)
      .json({ error: 'Invalid user ID, it should be a positive number' });
    return true;
  }
  return false;
}
