const validation = (acc, { quantity, productId }) => {
  if (quantity === undefined) return [...acc, { status: 400, message: '"quantity" is required' }];
  if (!productId) return [...acc, { status: 400, message: '"productId" is required' }];
  if (quantity <= 0) {
    return [...acc, { status: 422, message: '"quantity" must be greater than or equal to 1' }];
  }
  return acc;
};

module.exports = {
  post: (req, res, next) => {
   const vality = req.body.reduce(validation, []);
   if (vality.length > 0) return res.status(vality[0].status).json({ message: vality[0].message });
    return next();
  },
};