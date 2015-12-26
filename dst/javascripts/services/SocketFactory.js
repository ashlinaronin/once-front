onceUpon.factory("SocketFactory",["SentencesFactory","$rootScope","$timeout",function(n,e,t){var o,r={};return r.userPosition=null,r.totalUsers=null,r.remainingTime=null,r.currentMessage={userId:null,inProgress:!1,text:null},r.countingDown=!1,r.beginRecording=function(){e.$apply(function(){r.countingDown=!1});var n={userId:o.io.engine.id,inProgress:!0,text:null};o.emit("begin recording",n),r.currentMessage=n},r.updateText=function(n){var e={userId:o.io.engine.id,inProgress:!0,text:n};o.emit("word",e),r.currentMessage=e},r.endRecording=function(){var n={userId:o.io.engine.id,inProgress:!1,text:null};o.emit("end recording",n),r.currentMessage=n},r.countdownToRecord=function(){var n,t=30;r.countingDown=!0;var i=function(){if(!r.countingDown)return t=30,void clearInterval(n);if(e.$apply(function(){r.remainingTime=t}),0===t){e.$apply(function(){r.countingDown=!1});var i={userId:o.io.engine.id,inProgress:!1,text:null};return o.emit("countdown over",i),void clearInterval(n)}t--};i(),n=setInterval(i,1e3)},angular.element(document).ready(function(){o=io(),o.on("status",function(n){0!=n.userPosition||1===n.totalUsers||r.countingDown||r.countdownToRecord(),e.$apply(function(){r.userPosition=n.userPosition,r.totalUsers=n.totalUsers})}),o.on("begin recording",function(n){e.$apply(function(){r.currentMessage.text=null,r.currentMessage.inProgress=!0,r.currentMessage.userId=n.userId})}),o.on("word",function(n){e.$apply(function(){r.currentMessage.text=n.text})}),o.on("end recording",function(t){e.$apply(function(){r.currentMessage.inProgress=!1,r.currentMessage.text=null,n.getNew(),$("#sentences-panel").animate({scrollTop:$("#sentences-panel")[0].scrollHeight},1e3)})})}),r}]);