const db = require('../utils/db');

module.exports = {

    async patch(entity) {
        const condition = {
            student_id: entity.student_id
        };
        delete(entity.student_id);

        const [result, fields] = await db.patch(entity, condition, 'student');
        return result;
    },

    async del(id) {
        const condition = {
            student_id: id
        };

        await db.del(condition, 'stu_registerlist');
        await db.del(condition, 'stu_watchlist');

        const [result, fields] = await db.del(condition, 'student');
        return result;
    },

    async addWatchlistItem(courseid, studentid) {
        const sql = `insert into stu_watchlist  values(${studentid},${courseid})`;
        const [rows, fields] = await db.load(sql);
    },
    async findWatchlistItem(courseid, studentid) {
        const sql = `select * from stu_watchlist st where st.student_id=${studentid} and st.course_id =${courseid}`;
        const [rows, fields] = await db.load(sql);
        if (rows.length === 0)
            return null;
        return rows;
    },
    async delWatchlistItem(courseid, studentid) {
        const sql = `delete from stu_watchlist where student_id=${studentid} and course_id =${courseid}`;
        const [rows, fields] = await db.load(sql);
    },
    async delWatchlist(studentid) {
        const sql = `delete from stu_watchlist where student_id=${studentid}`;
        const [rows, fields] = await db.load(sql);
    },
}
