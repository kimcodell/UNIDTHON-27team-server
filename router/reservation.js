const express = require('express');
const { Reservation } = require('../models');

const router = express.Router();

// 유저의 예약 리스트 GET /reservation/list/:user_id
router.get('/list/:user_id', async (req, res, next) => {
  try {
    const Allreservations = await Reservation.findAll({
      where: {
        user_id: req.params.user_id,
      },
    });
    
    console.log(Allreservations);
    res.json(Allreservations);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//예약 요청 POST /reservation user_id, visit_id 필요
router.post('/', async (req, res, next) => {
    const { visit_id, user_id } = req.body;
    console.log(visit_id, user_id);
    if (!visit_id || !user_id) {
        next('visit_id와 user_id를 입력해주세요.');
    }
    try {
        const reservation = await Reservation.create({
            status: 'reserved',
            visit_id,
            user_id,
        });
        res.send('예약 완료');
    } catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;