var app = document.querySelector("#app");

page("/", function() {
  app.route = 0;
});
page("/meedoen", function() {
  app.route = 1;
});
page("/leden", function() {
  app.route = 2;
});
page("/fotos", function() {
  app.route = 3;
});

page({ hashbang: true});