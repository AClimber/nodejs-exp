const {Router} = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res, next) => {
    try {
        // https://stackoverflow.com/questions/59753149/express-handlebars-wont-render-data
        const courses = await Course.find().populate('userId', 'email name').lean();

        res.render('courses', {
            title: 'Courses',
            isCourses: true,
            courses
        });
    } catch (e) {
        console.log(e);
    }
});

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }

    try {
        const course = await Course.findById(req.params.id).lean();
        res.render('course-edit', {
            title: `Edit course ${course.title}`,
            isCourses: true,
            course
        });
    } catch (e) {
        console.log(e);
    }
});

router.post('/edit', async (req, res) => {
    const {id} = req.body;
    delete req.body.id;

    try {
        await Course.findByIdAndUpdate(id, req.body);
        res.redirect('/courses');
    } catch (e) {
        console.log(e);
    }
});



router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).lean();

        res.render('course', {
            layout: 'empty',
            title: `Course ${course.title}`,
            course
        });
    } catch (e) {
        console.log(e);
    }
});

router.post('/remove', async (req, res) => {
    try {
        await Course.deleteOne({
            _id: req.body.id
        });
        res.redirect('courses');
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
