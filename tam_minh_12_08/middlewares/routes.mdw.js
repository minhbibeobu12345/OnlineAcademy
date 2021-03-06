const auth = require('../middlewares/auth.mdw');

module.exports = function (app) {

    app.use('/account/', require('../controllers/account.route'));

    app.use('/', require('../controllers/home.route'));
    app.use('/courses/', require('../controllers/courses.route'));

    app.use('/admin/courses', auth.checkAdmin, require('../controllers/courses-ad.route'));
    app.use('/admin/specifications', auth.checkAdmin, require('../controllers/specification-ad.route'));
    app.use('/admin/accounts', auth.checkAdmin, require('../controllers/account-ad.route'));
    app.use('/admin/', auth.checkAdmin, require('../controllers/account-ad.route'));


    app.use('/teacher', auth.checkTeacher, require('../controllers/teacher.route'));
    app.use('/student', auth.checkStudent, require('../controllers/student.route'));
    app.get('/err', function (req, res) {
        throw new Error('Error!');
    });

    app.use(function (req, res) {
        res.render('404', {
            layout: false
        });
    });
}
