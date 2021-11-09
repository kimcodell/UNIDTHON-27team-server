const express = require('express');
const { Video } = require('../models');

const router = express.Router();

// 전체 동영상 데이터 요청 GET /video/list
router.get('/list', async (req, res, next) => {
    try {
        const videoList = await Video.findAll({
            attributes: ['video_id', 'thumbnails_image', 'video_url'],
        });
        res.json(videoList);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;