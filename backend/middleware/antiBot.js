export const antiBot = (req, res, next) => {
  const userAgent = req.headers['user-agent'];

  // Block missing user-agents
  if (!userAgent) {
    return res.status(403).json({ message: 'Forbidden: Missing User-Agent' });
  }

  const lowerUA = userAgent.toLowerCase();
  
  // List of common bot/scraper user-agent substrings
  const blockedAgents = [
    'curl',
    'python-requests',
    'python-urllib',
    'wget',
    'scrapy',
    'postmanruntime',
    'httpie',
    'libwww-perl',
    'java'
  ];

  const isBlocked = blockedAgents.some(agent => lowerUA.includes(agent));

  if (isBlocked) {
    return res.status(403).json({ message: 'Forbidden: Bot activity detected' });
  }

  next();
};
