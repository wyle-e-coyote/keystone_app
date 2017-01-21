import keystone = require("keystone");

const Types = keystone.Field.Types;

const Gallery = new keystone.List("Gallery", {
    autokey: { from: "name", path: "key", unique: true },
});

Gallery.add({
    heroImage: { type: Types.CloudinaryImage },
    images: { type: Types.CloudinaryImages },
    name: { type: String, require: true },
    publishedDate: { type: Date, default: Date.now },
});

Gallery.register();
