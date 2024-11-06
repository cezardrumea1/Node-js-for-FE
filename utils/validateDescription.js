export default function (description, res) {
  if (!description) {
    res.status(400).json({ error: 'Description is required' });
    return true;
  }

  const trimmedDescription =
    typeof description === 'string' ? description.trim() : description;

  if (trimmedDescription.length < 5) {
    res
      .status(400)
      .json({ error: 'Description must be at least 5 characters' });
    return true;
  }

  if (trimmedDescription.length > 100) {
    res
      .status(400)
      .json({ error: 'Description must be less than 100 characters' });
    return true;
  }

  return false;
}
