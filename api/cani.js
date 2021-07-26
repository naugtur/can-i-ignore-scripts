const okToIgnore = require('../okToIgnore.json');
module.exports = (req, res) => {
    res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');
    res.status(200).json((req.query?.packages|[]).filter(pkg => okToIgnore.includes(pkg)));
};
