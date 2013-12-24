/*
 * GET home page.
 */

exports.index1 = function (req, res) {
    res.render('index', { title: 'This is my first express app.' });
};

exports.index3 = function (req, res) {
    res.render('index');
    //res.sendfile('index.html');
}

exports.todos = function (db) {
    return function (req, res) {
        var collection = db.get('todoCollection');
        collection.find({}, {}, function (e, docs) {
            res.json({"todos": docs});
        });
    }
}

exports.tasks = function (db) {
    return function (req, res) {
        var collection = db.get('taskCollection');
        collection.find({}, {}, function (e, docs) {
            res.json(docs);
        });
    }
}

exports.saveTask = function (db) {
    return function (req, res) {
        var collection = db.get('taskCollection');
        console.log(req.body);
        var task = req.body;
        if (task._id) {
            collection.updateById(task._id, task);
        }
        else
            collection.insert(task);

        res.json(task);
    }
}

exports.deleteTask = function (db) {
    return function (req, res) {
        var collection = db.get('taskCollection');
        console.log(req.body);
        var task = req.body; //JSON.parse(req.body);
        collection.remove(task);
        res.json("done");
    }
}

exports.savePin = function (db) {
    return function (req, res) {
        var collection = db.get("Ask1");
        console.log(req.body);
        var task = req.body; //JSON.parse(req.body);
        collection.insert(task);
        res.json("done");
    }
}

exports.pins = function (db) {
    return function (req, res) {
        var collection = db.get('Ask1');
        collection.find({}, {}, function (e, docs) {
            res.json(docs);
        });
    }
}