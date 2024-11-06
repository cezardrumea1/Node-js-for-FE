export default function (description, res) {
  if (!description) {
    res.status(400).json({ error: 'Description is required' });
    return true;
  }

  if (description.length > 100) {
    res
      .status(400)
      .json({ error: 'Description must be less than 100 characters' });
    return true;
  }

  return false;
}
