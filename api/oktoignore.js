const redisUrl = process.env['REDIS_URL'];
const Redis = require("ioredis");
const redis = new Redis(redisUrl);

const okToIgnore = Object.keys(require('../okToIgnore.json'));
module.exports = async (req, res) => {
    const packages = req.query.packages.split(',');
    await redis.sadd('packages', packages);
    res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');
    res.status(200).json(packages.filter(pkg => okToIgnore.includes(pkg)));
};
