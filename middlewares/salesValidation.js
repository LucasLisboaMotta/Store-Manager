const validation = ({ quantity, productId }, res) => {
  if (quantity === undefined) return res.status(400).json({ message: '"quantity" is required' });
  if (!productId) return res.status(400).json({ message: '"productId" is required' });
  if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
};

module.exports = {
  post: (req, res, next) => {
    req.body.forEach((element) => validation(element, res));
    return next();
  },
};