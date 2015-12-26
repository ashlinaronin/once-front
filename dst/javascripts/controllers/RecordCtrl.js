onceUpon.controller("RecordCtrl",["$scope","SentencesFactory","SocketFactory","$http",function(e,n,o,t){e.SentencesFactory=n,e.SocketFactory=o,e.rec,e.context,e.mediaStreamSource,e.recognition,e.interim,e.chunks=[],e["final"]=null,e.recognizing=!1,e.start=function(){e.rec.record(),e.recognition.start()},e.save=function(){e.rec.stop(),e.recognition.stop(),e.SentencesFactory.saveSentence(e.rec,e.text)},e.initRecognize=function(){"webkitSpeechRecognition"in window?(e.recognition=new webkitSpeechRecognition,e.recognition.interimResults=!0,e.recognition.continuous=!1,e.recognition.lang="en-US",e.recognition.onstart=function(){e.recognizing=!0,e.SocketFactory.beginRecording(),e.$apply()},e.recognition.onresult=function(n){var o=n.resultIndex,t=n.results[o][0].transcript;n.results[o].isFinal?(e["final"]=t,e.text=t,e.save(),e.SocketFactory.endRecording(),e.interim=null,e["final"]=null,e.$apply()):(e.interim=t,e.SocketFactory.updateText(t),e.$apply())},e.recognition.onerror=function(n){"not-allowed"===n.error?(e.message="I'm sorry, what was that?",console.log("error not allowed")):(e.message="I'm sorry!! Something went wrong.",console.log("other error")),e.$apply()},e.recognition.onend=function(){e.recognizing=!1,e.$apply()}):(e.message="Please use the latest version of Google Chrome.",window.setTimeout(function(){},1e3))};var i=function(n){e.context=new(window.AudioContext||window.webkitAudioContext),e.mediaStreamSource=e.context.createMediaStreamSource(n),e.rec=new Recorder(e.mediaStreamSource,{numChannels:1})},r=function(e){console.log("The following getUserMedia error occured: "+e)};angular.element(document).ready(function(){navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||navigator.mediaDevices.getUserMedia,navigator.getUserMedia({audio:!0,video:!1},i,r),e.initRecognize()})}]);