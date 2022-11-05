'use strict';

const express = require('express');
const userHandler = require('../controllers/authController');
const loanController = require('../controllers/loanController');

const router = express.Router();

router
    .route('/auth/register')
    .post(userHandler.register);

router
    .route('/auth/sign_in')
    .post(userHandler.sign_in);

    router
    .route('/')
    .get(userHandler.loginRequired, loanController.getAllLoans)
    .post(userHandler.loginRequired, loanController.createLoan);
  
router
    .route('/:id')
    .get(userHandler.loginRequired, loanController.getLoan)
    .patch(userHandler.loginRequired, loanController.updateLoan)
    .delete(userHandler.loginRequired, loanController.deleteLoan);

module.exports = router;