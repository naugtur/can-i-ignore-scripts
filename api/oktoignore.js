const okToIgnore = require('../okToIgnore.json');
module.exports = (req, res) => {
    const packages = req.query.packages.split(',');
    res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');
    res.status(200).json(packages.filter(pkg => !okToIgnore.includes(pkg)));
};
