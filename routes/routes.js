const axios = require ("axios");
const cheerio = require ("cheerio");
const db = require("./../models");

module.exports = (app) => {

    app.get("/scrape", function(req, res) {
        axios.get("https://nerdist.com/").then(function(response) {
        
            var $ = cheerio.load(response.data);

            $("a.grid_item").each(function(i, element) {
                var result = {};
                result.title = $(this)
                .find("span.list-item-main-title")
                .text();
                result.link = $(this)
                .attr("href");
  
                db.Articles.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    return res.json(err);
                });
            });

            res.send("Scrape Complete");
        });
    });

  


    app.get("/articles", function(req, res) {
        db.Articles.find({})
            .then(function(dbArticle) {
            res.render("index", {Articles: dbArticle});
            })
            .catch(function(err) {
            res.json(err);
        });
    });

    app.get("/articles/:id", function(req, res) {
        db.Articles.findOne({_id: req.params.id})
            .populate("Notes")
            .then(function(dbArticle) {
            res.json(dbArticle);
            })
            .catch(function(err) {
            res.json(err);
        });
    });

    app.post("/articles/:id", function(req, res) {
        db.Notes.create(req.body)
            .then(function(dbNote) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function(dbArticle) {
            res.json(dbArticle);
            })
            .catch(function(err) {
            res.json(err);
        });
    });

};