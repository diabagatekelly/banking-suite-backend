const User = require("../models/User");
const express = require("express");
const {createToken} = require("../helpers/createToken");
const ExpressError = require('../helpers/ExpressError');
const { ensureCorrectUser, authRequired } = require('../middleware/auth');
const { validate } = require('jsonschema');
const { userAuthSchema, userNewSchema, userUpdateSchema } = require('../schemas');

const router = new express.Router();

/** POST / {userdata}  => {token: token} */
router.get('/', async function(req, res, next) {
    try {
        const users = await User.findAll();
        return res.status(201).json({users: users });
    } catch(e) {
        console.log(e)
    }
    
})

router.post('/register', async function(req, res, next) {
    try {
      const validation = validate(req.body, userNewSchema);
  
      if (!validation.valid) {
        throw new ExpressError(validation.errors.map(e => e.stack), 400);
      }
  
      const newUser = await User.register(req.body);
      const token = createToken(newUser);
      return res.status(201).json({_token: token, user: newUser });
    } catch (err) {
      return next(err);
    }
  });

router.post("/login", async function(req, res, next) {
  try {
    const validation = validate(req.body, userAuthSchema);
  
      if (!validation.valid) {
        throw new ExpressError(validation.errors.map(e => e.stack), 400);
      }

    const user = await User.login(req.body);
    const token = createToken(user);
    return res.json({_token: token, user: user });
  } catch (err) {
    return next(err);
  }
});


  /** PATCH /[handle] {userData} => {user: updatedUser} */
  
  router.patch('/:username', ensureCorrectUser, async function(req, res, next) {
    try {
      if ('username' in req.body || 'is_admin' in req.body) {
          throw new ExpressError(
            'You are not allowed to change username or is_admin properties.',
            400);
      }
  
      const validation = validate(req.body, userUpdateSchema);
      if (!validation.valid) {
        throw new ExpressError(validation.errors.map(e => e.stack), 400);
      }
  
      const user = await User.update(req.params.username, req.body);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  });
  
  /** DELETE /[handle]  =>  {message: "User deleted"}  */
  
  router.delete('/:username', ensureCorrectUser, async function(req, res, next) {
    try {
      await User.remove(req.params.username);
      return res.json({ message: 'User deleted' });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;