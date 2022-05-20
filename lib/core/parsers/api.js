function parse(content) {
  content = content.trim();

  // Search: type, url and title
  // Example: {get} /user/:id Get User by ID.
  const parseRegExp = /^(?:(?:\{(.+?)\})?\s*)?(.+?)(?:\s+(.+?))?$/g;
  const matches = parseRegExp.exec(content);

  if (!matches) {
    return null;
  }
  const aUrl = matches[2].split('/');
  const axUrl = [];
  axUrl.push({ type: 'pun', value: '/' });
  aUrl.forEach(u => {
    if (u.trim() !== '') {
      if (u.startsWith(':')) {
        axUrl.push({ type: 'str', value: u });
      } else {
        axUrl.push({ type: 'pnl', value: u });
      }
      axUrl.push({ type: 'pun', value: '/' });
    }
  });
  axUrl.pop();
  return {
    type: matches[1],
    url: matches[2],
    aUrl: axUrl,
    title: matches[3] || ''
  };
}

/**
 * Exports
 */
module.exports = {
  parse: parse,
  path: 'local',
  method: 'insert'
};
