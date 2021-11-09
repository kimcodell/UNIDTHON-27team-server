const express = require('express');
const { Company, Visit, Video, Reservation } = require('../models');

const router = express.Router();

//전체 회사 리스트 GET /company/list
router.get('/list', async (req, res, next) => {
    try {
        const companyList = await Company.findAll({
            attributes: ['company_id', 'name', 'explanation', 'logo_url'],
            include: [{
                model: Visit,
                attributes: ['visit_id'],
            }],
            raw: true
        });

        companyList.map((company) => {
            if (company["Visits.visit_id"]) { 
                company.has_visit = true;
            } else {
                company.has_visit = false;
            }
            delete company["Visits.visit_id"];
        });
        res.json(companyList);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

//특정 회사 데이터 GET /company/:id/:user_id
router.get('/:id/:user_id', async (req, res, next) => {
    try {
        //특정 회사 정보
        const company = await Company.findOne({
            attributes: ['company_id', 'name', 'explanation', 'website_url', 'logo_url'],
            where: { company_id: req.params.id },
            raw: true,
        });

        //회사의 가장 최신 견학
        const visitOfCompany = await Visit.findOne({
            attributes: ['visit_id', 'start_at', 'detail', 'capacity'],
            order: [['start_at', 'DESC']],
            where: { company_id: company.company_id },
            raw: true,
        });

        //최신 견학의 예약 수
        const countVisitReservation = await Reservation.findAll({
            attributes: ['visit_id', 'user_id'],
            where: { visit_id: visitOfCompany.visit_id },
        });
        visitOfCompany.num_of_subscriber = countVisitReservation.length; //현재 예약자 수

        //요청자가 이미 예약을 했는지 여부
        const isReservation = await Reservation.findOne({
            where: { 
                visit_id: visitOfCompany.visit_id,
                user_id: req.params.user_id,
            }
        });
        if (!isReservation) {
            company.is_reservation = false;
        } else {
            company.is_reservation = true;
        }

        //회사의 영상 데이터
        const videoOfCompany = await Video.findAll({
            attributes: ['video_id', 'thumbnails_image', 'video_url'],
            where: { company_id: company.company_id },
        });
        company.video_list = videoOfCompany;

        company.visit = visitOfCompany;
        res.json(company);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;