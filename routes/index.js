/*
 * GET home page.
 */

exports.index1 = function (req, res) {
    res.render('index', { title: 'This is my first express app.' });
};

exports.index = function (req, res) {
    res.render('index.html');
    //res.sendfile('index.html');
}