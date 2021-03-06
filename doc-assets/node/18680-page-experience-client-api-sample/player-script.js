var BCLS = ( function (window, document) {
  var experience = window.top.bcov.gal.getEmbed('experience_5bb2134180b4990011750f06'),
  experienceApi,
  current_video = document.getElementById('current_video'),
  video_paused = document.getElementById('video_paused');

  experienceApi = experience.clientApi;
  console.log('experience', experience);
  console.log('experienceApi', experienceApi);
  console.log('video', experienceApi.video);

  experience.on('videoChanged', function() {
    console.log('videoChanged');
    current_video.textContent = experienceApi.getCurrentVideo();
    console.log('current video', experienceApi.getCurrentVideo());
  });

  experience.on('playerLoad', function(player) {
    console.log('playerLoad');
    current_video.textContent = experienceApi.getCurrentVideo();
    console.log('current video', experienceApi.getCurrentVideo());
  });

  experience.on('videoStarted', function(video) {
    console.log('started');
    video_paused.textContent = 'false';
  });

  experience.on('videoPaused', function(video) {
    console.log('paused');
    video_paused.textContent = 'true';
  });

})(window, document);
