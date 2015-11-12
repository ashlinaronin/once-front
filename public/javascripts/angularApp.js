var onceUpon = angular.module('onceUpon', ['ui.router']);

onceUpon.config(function($stateProvider, $urlRouterProvider) {
  /* By using the resolve property here, we make sure that anytime our home state
  ** is entered, we automatically query all posts from our backend before the
  ** state actually finishes loading. */
  $stateProvider.state('home', {
    url: "",
    templateUrl: 'partials/main.html',
    controller: 'SentencesCtrl',
    resolve: {
      sentencePromise: ['SentencesFactory', function(SentencesFactory) {
        return SentencesFactory.getAll();
      }]
    }
  });


  // Stoped resolving all sentences here because it was slowing everything down
  $stateProvider.state('record', {
    url: "/record",
    templateUrl: 'partials/record.html',
    controller: 'RecordCtrl'
  });
});