import keystone = require("keystone");
import * as async from "async";
import * as express from "express";
const Types = keystone.Filed.Types;

module.exports = (req: express.Request, res: express.Response) => {
    const view = new keystone.View(req, res);
    const locals = res.locals;

    locals.section = "blog";
    locals.filters = {
        category: req.params.category,
    };
    locals.data = {
        posts: [],
        categories: [],
    };

    view.on("init", (next) => {
        keystone.list("PostCategory").model.find().sort("name").exec((err, results) => {
            if (err || !results.length) {
                return next(err);
            }

            locals.data.categories = results;

            // Load the counts for each category
            async.each(locals.data.categories, (category, next) => {

                keystone.list("Post").model.count().where("categories").in([category.id])
                    .exec((err, count) => {
                        category.postCount = count;
                        next(err);
                    });

            }, (err) => {
                next(err);
            });
        });
    });
};
