const path = require('path');

const Directory = {
    entry: {
        root: 'src',
        static: 'static',
    },
    output: {
        root: 'build',
        css: 'css',
        js: 'js',
        img: 'img',
        font: 'fonts',
        asset: 'assets',
        static: 'build',
        stats: 'stats',
    },
};

const Path = {
    entry: {
        root: path.resolve(__dirname, Directory.entry.root),
        static: path.resolve(__dirname, Directory.entry.static),
    },
    output: {
        root: path.resolve(__dirname, Directory.output.root),
        css: path.resolve(
            __dirname,
            Directory.output.root,
            Directory.output.css,
        ),
        js: path.resolve(__dirname, Directory.output.root, Directory.output.js),
        img: path.resolve(
            __dirname,
            Directory.output.root,
            Directory.output.img,
        ),
        font: path.resolve(
            __dirname,
            Directory.output.root,
            Directory.output.font,
        ),
        asset: path.resolve(
            __dirname,
            Directory.output.root,
            Directory.output.asset,
        ),
        static: path.resolve(__dirname, Directory.output.static),
        stats: path.resolve(__dirname, Directory.output.stats),
    },
};

module.exports = {
    Directory,
    Path,
};
