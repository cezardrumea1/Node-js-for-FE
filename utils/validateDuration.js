export default function (duration, res) {
  if (!duration) {
    res.status(400).json({ error: 'Duration is required' });
    return true;
  }

  if (isNaN(+duration) || typeof +duration !== 'number' || +duration < 1) {
    res.status(400).json({ error: 'Duration must be a positive number' });
    return true;
  }

  if (+duration > 1440) {
    res
      .status(400)
      .json({ error: 'Duration must be less than 1440 minutes (1 day)' });
    return true;
  }

  return false;
}
