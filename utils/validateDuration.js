export default function (duration, res) {
  if (!duration) {
    res.status(400).json({ error: 'Duration is required' });
    return true;
  }

  const trimmedDuration =
    typeof duration === 'string' ? duration.trim() : duration;

  if (
    isNaN(+trimmedDuration) ||
    typeof +trimmedDuration !== 'number' ||
    +trimmedDuration < 1
  ) {
    res
      .status(400)
      .json({ error: 'Invalid Duration, it must be a positive number' });
    return true;
  }

  if (+trimmedDuration > 1440) {
    res.status(400).json({
      error: 'Invalid Duration, it must be less than 1440 minutes (1 day)',
    });
    return true;
  }

  return false;
}
