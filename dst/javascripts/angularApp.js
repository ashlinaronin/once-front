var onceUpon=angular.module("onceUpon",["ui.router"]);onceUpon.config(["$stateProvider","$urlRouterProvider",function(e,r){e.state("home",{url:"",views:{status:{templateUrl:"partials/status.html",controller:"StatusCtrl"},sentences:{templateUrl:"partials/sentences.html",controller:"SentencesCtrl"},record:{templateUrl:"partials/record.html",controller:"RecordCtrl"}},resolve:{sentencePromise:["SentencesFactory",function(e){return e.getAll()}]}}),e.state("record",{url:"/record",templateUrl:"partials/record.html",controller:"RecordCtrl"})}]);