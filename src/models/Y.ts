import keystone = require("keystone");

const Types = keystone.Field.Types;

const Y = new keystone.List("Y");

Y.add({
    email: { type: Types.Email, initial: true, required: true, index: true },
    name: { type: Types.Name, required: true, index: true},
    password: { type: Types.Password, initial: true, required: true },
}, "Permissions", {
    isAdmin: { type: Boolean, label: "Can access Keystone", index: true },
});

Y.schema.virtual("canAccessKeystone").get(function() {
    return this.isAdmin;
});

Y.relationship({ ref: "Post", path: "posts", refPath: "author" });

Y.defaultColumns = "name, email, isAdmin";
Y.register();
