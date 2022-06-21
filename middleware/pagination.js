const paginatedResults = function(model){
    return async function (req, res, next) {
        try {

            let { page, size } = req.query;

            if (!page) {
                page = 1;
            }
            if (!size) {
                size = 10;
            }

            const limit = parseInt(size);
            const skip = (page - 1) * size;

            // const posts = await Post.find({}, {}, {limit: limit, skip: skip});
            const results = await model.find().limit(limit).skip(skip);

            res.status(201).json({ page, size, data: results, message: "success" });
        } catch (e) {
            res.status(500).json({ message: "failed", messageError: e });
        }

    };
}

const paginatedFilteredResults = function(model){
    return async function (req, res, next) {
        try {
            let { page, size } = req.query;

            if (!page) {
                page = 1;
            }
            if (!size) {
                size = 10;
            }

            const limit = parseInt(size);
            const skip = (page - 1) * size;

            // const posts = await Post.find({}, {}, {limit: limit, skip: skip});
            const results = await model.find({owner:req.user._id}).limit(limit).skip(skip);

            res.status(201).json({ page, size, data: results, message: "success" });
        } catch (e) {
            res.status(500).json({ message: "failed", messageError: e });
        }

    };
}

module.exports = {paginatedResults, paginatedFilteredResults};