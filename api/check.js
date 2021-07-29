const redisUrl = process.env['REDIS_URL'];
const Redis = require("ioredis");
const redis = new Redis(redisUrl);
const data = require('../data.json');

module.exports = async (req, res) => {
    const packages = req.query.packages.split(',');
    await redis.sadd('packages', packages);
    res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');
    res.status(200).json(packages.reduce((result, pkg) => {
        result.keep[pkg] = data.keep[pkg]
        result.ignore[pkg] = data.ignore[pkg]
        return result;
    }, { keep: {}, ignore: {} }));
};
