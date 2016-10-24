Router.route('/', function () {
  this.layout('MainLandingPage');
  this.render('MainLandingPage', {to: 'MainLandingPage'});
  this.render('MainLandingPage', {to: 'search'});
});
