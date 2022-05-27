module.exports = {
  post: (req, res, next) => {
    console.log('oi');
    console.log(req.body);
    const { name, quantity } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
    if (name.length < 5) { 
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    } if (name.length <= 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    } 
    console.log('final');
    return next();
  },
};