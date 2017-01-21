import keystone = require("keystone");

const Types = keystone.Field.Types;

const Post = new keystone.List("Post", {
    autokey: { path: "slug", from: "title", unique: true },
    map: { name: "title" },
});

Post.add({
    author: { type: Types.Relationship, ref: "Y", index: true },
    categories: { type: Types.Relationship, ref: "PostCategory", many: true },
    content: {
        brief: { type: Types.Html, wysiwyg: true, height: 150 },
        extended: { type: Types.Html, wysiwyg: true, height: 400 },
    },
    image: { type: Types.CloudinaryImage },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: "published" } },
    state: { type: Types.Select, options: "draft, published, archived", default: "draft", index: true },
    title: { type: String, required: true },
});

// TODO -- How can we use => within the _get()_ ??
Post.schema.virtual("content.full").get(function() {
    return this.content.extended || this.content.brief;
});

Post.defaultColumns = "title, state|20%, author|20%, publishedDate|20%";
Post.register();
