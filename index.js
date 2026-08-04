const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

// View Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Home Route
app.get("/", function (req, res) {

    fs.readdir("./files", function (err, files) {

        if (err) {
            console.log(err);
            return res.send("Unable to read files.");
        }

        res.render("index", {
            files: files
        });

    });

});

// Create Note
app.post("/create", function (req, res) {

    const fileName = req.body.title.split(" ").join("") + ".txt";

    fs.writeFile(
        `./files/${fileName}`,
        req.body.details,
        function (err) {

            if (err) {
                console.log(err);
                return res.send("Something went wrong.");
            }

            res.redirect("/");

        }
    );

});

// Read Note
app.get("/file/:filename", function (req, res) {

    fs.readFile(
        `./files/${req.params.filename}`,
        "utf-8",
        function (err, filedata) {

            if (err) {
                console.log(err);
                return res.send("File not found.");
            }

            res.render("show", {
                filename: req.params.filename,
                filedata: filedata
            });

        }
    );

});

// Edit Page
app.get("/edit/:filename", function (req, res) {

    fs.readFile(
        `./files/${req.params.filename}`,
        "utf-8",
        function (err, filedata) {

            if (err) {
                console.log(err);
                return res.send("File not found.");
            }

            res.render("edit", {
                filename: req.params.filename,
                filedata: filedata
            });

        }
    );

});

// Update Note
app.post("/edit/:filename", function (req, res) {

    const newFileName = req.body.title.split(" ").join("") + ".txt";

    fs.rename(
        `./files/${req.params.filename}`,
        `./files/${newFileName}`,
        function (err) {

            if (err) {
                console.log(err);
                return res.send("Unable to rename file.");
            }

            fs.writeFile(
                `./files/${newFileName}`,
                req.body.details,
                function (err) {

                    if (err) {
                        console.log(err);
                        return res.send("Unable to update file.");
                    }

                    res.redirect("/");

                }
            );

        }
    );

});

// Server
app.listen(3000, function () {
    console.log("Server running at http://localhost:3000");
});