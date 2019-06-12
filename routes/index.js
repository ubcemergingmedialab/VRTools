import express from 'express';
import db from '../db/db';
import tourController from '../tourControllers/tours.js'

const router = express.Router();

router.get('/api/v1/tours', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'tours retrieved successfully',
    tours: db
  })
});

router.get('/api/v1/tours/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);

	db.map((tour) => {
		if(tour.id === id){
			return res.status(200).send({
				success: 'true',
        message: 'tour retrieved successfully',
        tour,
			});
		}
	});
  return res.status(404).send({
    success: 'false',
    message: 'tour did not exist',
  });
});

router.post('/api/v1/tours', (req, res) => {
  if(!req.body.config) {
    return res.status(400).send({
      success: 'false',
      message: 'tour is required'
    });
  }
 const tour = {
   id: db.length + 1,
   title: req.body.title,
   config: req.body.config
 }
 db.push(tour);
 return res.status(201).send({
   success: 'true',
   message: 'tour added successfully',
   tour
 })
});

router.delete('/api/v1/tours/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  db.map((tour, index) => {
    if(tour.id === id){
      db.splice(index, 1);
      return res.status(200).send({
        success: 'true',
        message: 'tour deleted successfully',
      });
    }
  });

  return res.status(404).send({
    success: 'false',
    message: 'tour not found',
  });
});

router.put('/api/v1/tours/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let tourFound;
  let itemIndex;
  db.map((tour, index) => {
    if (tour.id === id) {
      tourFound = tour;
      itemIndex = index;
    }
  });

  if (!tourFound) {
    return res.status(404).send({
      success: 'false',
      message: 'tour not found',
    });
  }

  if (!req.body.title) {
    return res.status(400).send({
      success: 'false',
      message: 'title is required',
    });
  } else if (!req.body.description) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required',
    });
  }

  const updatedTour = {
    id: tourFound.id,
    title: req.body.title || tourFound.title,
    description: req.body.description || tourFound.description,
  };

  db.splice(itemIndex, 1, updatedTour);

  return res.status(201).send({
    success: 'true',
    message: 'tour added successfully',
    updatedTour
  });
});

export default router;
