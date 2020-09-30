const express = require('express');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

const Pet = require('../models/pets');
const { validateBody, validateParams } = require('../middlewares/route');

const router = express.Router();

router.post(
  '/',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('Pets name'),
    age: Joi.number().integer().required().description('Pets age'),
    color: Joi.string().required().description('Pets color'),
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const pet = new Pet(req.body);
      await pet.save();
      res.status(201).json(pet);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
    '/:id',
    validateParams(Joi.object().keys({
      id: Joi.objectId().required().description('Pet _Id'),
    }),
    {
      stripUnknown: true,
    }),
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const query = {
            _id: id,
          };
        let result = await Pet.findOne(query);
         res.status(200).json(result);
      } catch (e) {
        next(e);
      }
    }
  );

  router.delete(
    '/:id',
    validateParams(Joi.object().keys({
      id: Joi.objectId().required().description('Pet _Id'),
    }),
    {
      stripUnknown: true,
    }),
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const query = {
            _id: id,
          };
        let result = await Pet.findOneAndRemove(query);
         res.status(200).json(result);
      } catch (e) {
        next(e);
      }
    }
  );
  

module.exports = router;