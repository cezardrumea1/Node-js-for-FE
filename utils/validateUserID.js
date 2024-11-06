import binarySearchIncludes from './binarySearchIncludes.js';

export default function (id, userIds, res) {
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

  if (!binarySearchIncludes(userIds, +id)) {
    res.status(404).json({ error: 'User not found' });
    return true;
  }

  return false;
}
