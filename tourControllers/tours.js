/* eslint-disable class-methods-use-this */
import db from '../db/db';

class ToursController {
  getAllTours(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'tours retrieved successfully',
      tours: db,
    });
  }

  getTour(req, res) {
    const id = parseInt(req.params.id, 10);
    db.map((tour) => {
      if (tour.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'tour retrieved successfully',
          tour,
        });
      }
    });
    return res.status(404).send({
      success: 'false',
      message: 'tour does not exist',
    });
  }

  createTour(req, res) {
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
    const tour = {
      id: db.length + 1,
      title: req.body.title,
      description: req.body.description,
    };
    db.push(tour);
    return res.status(201).send({
      success: 'true',
      message: 'tour added successfully',
      tour,
    });
  }

  updateTour(req, res) {
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

    const newTour = {
      id: tourFound.id,
      title: req.body.title || tourFound.title,
      description: req.body.description || tourFound.description,
    };

    db.splice(itemIndex, 1, newtour);

    return res.status(201).send({
      success: 'true',
      message: 'tour added successfully',
      newTour,
    });
  }

  deleteTour(req, res) {
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
    db.splice(itemIndex, 1);

    return res.status(200).send({
      success: 'true',
      message: 'Tour deleted successfuly',
    });
  }
}

const tourController = new ToursController();
export default tourController;
