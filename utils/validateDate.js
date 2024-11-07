export default function (date, res) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(date)) {
    res
      .status(400)
      .json({ error: 'Invalid date format, it should be YYYY-MM-DD' });
    return true;
  }

  const [year, month, day] = date.split('-').map((s) => parseInt(s));

  if (year < 1900 || year > 2100) {
    res
      .status(400)
      .json({ error: 'Invalid date, year should be between 1900 and 2100' });
    return true;
  }

  if (month === 1 && day > 31) {
    res
      .status(400)
      .json({ error: 'Invalid date, January can not have more than 31 days' });
    return true;
  }

  if (year % 4 === 0 && month === 2 && day > 29) {
    res.status(400).json({
      error:
        'Invalid date, February can not have more than 29 days for leap years',
    });
    return true;
  }

  if (year % 4 !== 0 && month === 2 && day > 28) {
    res.status(400).json({
      error:
        'Invalid date, February can not have more than 28 days for non-leap years',
    });
    return true;
  }

  if (month === 3 && day > 31) {
    res
      .status(400)
      .json({ error: 'Invalid date, March can not have more than 31 days' });
    return true;
  }

  if (month === 4 && day > 30) {
    res
      .status(400)
      .json({ error: 'Invalid date, April can not have more than 30 days' });
    return true;
  }

  if (month === 5 && day > 31) {
    res
      .status(400)
      .json({ error: 'Invalid date, May can not have more than 31 days' });
    return true;
  }

  if (month === 6 && day > 30) {
    res
      .status(400)
      .json({ error: 'Invalid date, June can not have more than 30 days' });
    return true;
  }

  if (month === 7 && day > 31) {
    res
      .status(400)
      .json({ error: 'Invalid date, July can not have more than 31 days' });
    return true;
  }

  if (month === 8 && day > 31) {
    res
      .status(400)
      .json({ error: 'Invalid date, August can not have more than 31 days' });
    return true;
  }

  if (month === 9 && day > 30) {
    res.status(400).json({
      error: 'Invalid date, September can not have more than 30 days',
    });
    return true;
  }

  if (month === 10 && day > 31) {
    res
      .status(400)
      .json({ error: 'Invalid date, October can not have more than 31 days' });
    return true;
  }

  if (month === 11 && day > 30) {
    res
      .status(400)
      .json({ error: 'Invalid date, November can not have more than 30 days' });
    return true;
  }

  if (month === 12 && day > 31) {
    res
      .status(400)
      .json({ error: 'Invalid date, December can not have more than 31 days' });
    return true;
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    res.status(400).json({
      error:
        'Invalid date, month should be between 1 and 12 and day should be between 1 and 31',
    });
    return true;
  }

  return false;
}
