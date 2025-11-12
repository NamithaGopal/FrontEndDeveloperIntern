const { body } = require('express-validator');

exports.registerValidator = [
  body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 chars'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be >= 6 chars')
];

exports.loginValidator = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').exists().withMessage('Password required')
];

exports.noteValidator = [
  body('title').isLength({ min: 1 }).withMessage('Title required'),
  body('content').optional().isString()
];
