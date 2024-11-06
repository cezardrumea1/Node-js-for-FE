import validateDate from './validateDate.js';

export default function (from, to, limit, res) {
  if (from && validateDate(from, res)) return true;

  if (to && validateDate(to, res)) return true;

  if (from && to && Date.parse(from) > Date.parse(to)) {
    res
      .status(400)
      .json({ error: 'Invalid date range, to must be a date after from' });
    return true;
  }

  if ((limit && isNaN(+limit)) || typeof +limit !== 'number' || +limit < 1) {
    res.status(400).json({ error: 'Limit must be a positive number' });
    return true;
  }

  return false;
}
