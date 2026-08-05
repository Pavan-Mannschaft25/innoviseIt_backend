const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

const renderTemplate = (templateName, data = {}) => {
  const layoutPath = path.join(__dirname, "../templates/layouts/base.html");

  const templatePath = path.join(
    __dirname,
    `../templates/${templateName}.html`,
  );

  const layoutSource = fs.readFileSync(layoutPath, "utf8");

  const templateSource = fs.readFileSync(templatePath, "utf8");

  const body = Handlebars.compile(templateSource)(data);

  return Handlebars.compile(layoutSource)({
    body,
  });
};

module.exports = renderTemplate;
