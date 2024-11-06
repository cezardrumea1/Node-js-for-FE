export default function (userId, from, to, limit) {
  let logsQuery = `SELECT * FROM exercises WHERE userId = ?`;
  let countQuery = `SELECT COUNT(*) AS count FROM exercises WHERE userId = ?`;

  const params = [userId];

  if (from) {
    const fromQueryText = ` AND date >= ?`;

    logsQuery += fromQueryText;
    countQuery += fromQueryText;

    params.push(from);
  }

  if (to) {
    const toQueryText = ` AND date <= ?`;

    logsQuery += toQueryText;
    countQuery += toQueryText;

    params.push(to);
  }

  logsQuery += ` ORDER BY date ASC`;

  if (limit) {
    const limitQueryText = ` LIMIT ?`;

    logsQuery += limitQueryText;
    countQuery += limitQueryText;

    params.push(limit);
  }

  return { logsQuery, countQuery, params };
}
