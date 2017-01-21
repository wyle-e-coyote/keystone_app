import keystone = require("keystone");

const Types = keystone.Field.Types;

const Enquiry = new keystone.List("Enquiry", {
    nocreate: true,
    noedit: true,
});

Enquiry.add({
    email: { type: Types.Email, required: true },
    enquiryType: {
        options: [
            { value: "message", label: "Just leaving a message" },
            { value: "question", label: "I\'ve got a question" },
            { value: "other", label: "Something else..." },
        ],
        type: Types.Select,
    },
    message: { type: Types.Markdown, required: true },
    name: { type: Types.Name, required: true },
    phone: { type: String },
});

Enquiry.defaultSort = "-createdAt";
Enquiry.defaultColumns = "name, email, equiryType, createdAt";
Enquiry.register();
