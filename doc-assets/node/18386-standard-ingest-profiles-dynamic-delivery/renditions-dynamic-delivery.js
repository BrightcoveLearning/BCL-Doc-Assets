var BCLSrenditions = (function(window, document) {
      var renditionData = {
          "renditions": [{"id":"default/video900","version":1,"name":"Default Video900","kind":"video","account_id":"default","created_at":"2016-06-06T23:39:55.150904095Z","updated_at":"2016-09-01T16:23:49.710455629Z","encoding_settings":{"aspect_mode":"preserve","decoder_bitrate_cap":1350,"decoder_buffer_size":1800,"forced_keyframe_rate":1,"fragment_duration":2000,"h264_bframes":2,"h264_profile":"main","height":360,"segment_seconds":2,"speed":3,"upscale":false,"video_bitrate":900,"video_codec":"h264"}},{"id":"default/video700","version":1,"name":"Default Video700","kind":"video","account_id":"default","created_at":"2016-06-06T23:39:54.742007828Z","updated_at":"2016-09-01T16:23:49.339500822Z","encoding_settings":{"aspect_mode":"preserve","decoder_bitrate_cap":1050,"decoder_buffer_size":1400,"forced_keyframe_rate":1,"fragment_duration":2000,"h264_profile":"baseline","height":360,"segment_seconds":2,"speed":3,"upscale":false,"video_bitrate":700,"video_codec":"h264"}},{"id":"default/video450","version":1,"name":"Default Video450","kind":"video","account_id":"default","created_at":"2016-06-06T23:39:54.333556376Z","updated_at":"2016-09-01T16:23:48.931462331Z","encoding_settings":{"aspect_mode":"preserve","decoder_bitrate_cap":675,"decoder_buffer_size":900,"forced_keyframe_rate":1,"fragment_duration":2000,"h264_profile":"baseline","height":270,"segment_seconds":2,"speed":3,"upscale":false,"video_bitrate":450,"video_codec":"h264"}},{"id":"default/video3500","version":1,"name":"Default Video3500","kind":"video","account_id":"default","created_at":"2016-06-06T23:39:53.493670562Z","updated_at":"2016-09-01T16:23:47.969801728Z","encoding_settings":{"aspect_mode":"preserve","decoder_bitrate_cap":5250,"decoder_buffer_size":7000,"forced_keyframe_rate":1,"fragment_duration":2000,"h264_bframes":2,"h264_profile":"high","height":1080,"segment_seconds":2,"speed":3,"upscale":false,"video_bitrate":3500,"video_codec":"h264","width":2048}},{"id":"default/video2000","version":0,"name":"Default Video2000","kind":"video","account_id":"default","created_at":"2016-09-01T16:23:46.83319503Z","updated_at":"2016-09-01T16:23:46.83319503Z","encoding_settings":{"aspect_mode":"preserve","decoder_bitrate_cap":3000,"decoder_buffer_size":4000,"forced_keyframe_rate":1,"fragment_duration":2000,"h264_bframes":2,"h264_profile":"main","height":720,"segment_seconds":2,"speed":3,"upscale":false,"video_bitrate":2000,"video_codec":"h264"}},{"id":"default/video1700","version":1,"name":"Default Video1700","kind":"video","account_id":"default","created_at":"2016-06-06T23:39:52.657713254Z","updated_at":"2016-09-01T16:23:46.292111176Z","encoding_settings":{"aspect_mode":"preserve","decoder_bitrate_cap":2550,"decoder_buffer_size":3400,"forced_keyframe_rate":1,"fragment_duration":2000,"h264_bframes":2,"h264_profile":"main","height":540,"segment_seconds":2,"speed":3,"upscale":false,"video_bitrate":1700,"video_codec":"h264"}},{"id":"default/video1200","version":1,"name":"Default Video1200","kind":"video","account_id":"default","created_at":"2016-06-06T23:39:52.256973266Z","updated_at":"2016-09-01T16:23:45.79869902Z","encoding_settings":{"aspect_mode":"preserve","decoder_bitrate_cap":1800,"decoder_buffer_size":2400,"forced_keyframe_rate":1,"fragment_duration":2000,"h264_bframes":2,"h264_profile":"main","height":540,"segment_seconds":2,"speed":3,"upscale":false,"video_bitrate":1200,"video_codec":"h264"}},{"id":"default/video3800","version":3,"name":"video3800","kind":"video","account_id":"default","created_at":"2016-10-13T02:52:42.941473455Z","updated_at":"2016-10-15T18:00:15.180389457Z","encoding_settings":{"aspect_mode":"preserve","decoder_bitrate_cap":5700,"decoder_buffer_size":7600,"forced_keyframe_rate":1,"fragment_duration":2000,"h264_bframes":2,"h264_profile":"main","height":1080,"segment_seconds":2,"speed":3,"upscale":false,"video_bitrate":3800,"video_codec":"h264"}},{"id":"default/audio96","version":2,"name":"Default Audio96","kind":"audio","account_id":"default","created_at":"2016-06-06T23:39:51.876947888Z","updated_at":"2016-12-08T22:20:22.21004818Z","encoding_settings":{"audio_bitrate":96,"audio_channels":2,"audio_codec":"aac","force_aac_profile":"aac-lc","forced_keyframe_rate":1,"fragment_duration":2000,"segment_seconds":2}},{"id":"default/audio64","version":2,"name":"Default Audio64","kind":"audio","account_id":"default","created_at":"2016-06-06T23:39:51.49858741Z","updated_at":"2016-12-08T22:20:08.015451679Z","encoding_settings":{"audio_bitrate":64,"audio_channels":2,"audio_codec":"aac","force_aac_profile":"aac-lc","forced_keyframe_rate":1,"fragment_duration":2000,"segment_seconds":2}},{"id":"default/audio192","version":2,"name":"audio192","kind":"audio","account_id":"default","created_at":"2016-10-12T00:52:48.575372031Z","updated_at":"2017-03-22T14:20:39.115514582Z","encoding_settings":{"audio_bitrate":192,"audio_channels":2,"audio_codec":"aac","force_aac_profile":"aac-lc","forced_keyframe_rate":1,"fragment_duration":2000,"segment_seconds":2}},{"id":"default/audio128","version":2,"name":"Default Audio128","kind":"audio","account_id":"default","created_at":"2016-06-06T23:39:51.093305379Z","updated_at":"2016-12-08T22:20:35.765352509Z","encoding_settings":{"audio_bitrate":128,"audio_channels":2,"audio_codec":"aac","force_aac_profile":"aac-lc","forced_keyframe_rate":1,"fragment_duration":2000,"segment_seconds":2}}]
        },
        // progressiveData = {
          "renditions": [{"id":"default/progressive450","version":0,"name":"Default Progressive450","kind":"progressive","account_id":"default","created_at":"2018-06-11T22:32:33.937106287Z","updated_at":"2018-06-11T22:32:33.937106287Z","encoding_settings":{"aspect_mode":"preserve","audio_bitrate":64,"audio_channels":2,"audio_codec":"aac","decoder_bitrate_cap":675,"decoder_buffer_size":900,"force_aac_profile":"aac-lc","h264_profile":"baseline","height":270,"speed":3,"upscale":false,"video_bitrate":450,"video_codec":"h264"}},{"id":"default/progressive700","version":0,"name":"Default Progressive700","kind":"progressive","account_id":"default","created_at":"2018-06-11T22:32:33.937106287Z","updated_at":"2018-06-11T22:32:33.937106287Z","encoding_settings":{"aspect_mode":"preserve","audio_bitrate":96,"audio_channels":2,"audio_codec":"aac","decoder_bitrate_cap":1050,"decoder_buffer_size":1400,"force_aac_profile":"aac-lc","h264_profile":"baseline","height":360,"speed":3,"upscale":false,"video_bitrate":700,"video_codec":"h264"}},{"id":"default/progressive900","version":0,"name":"Default Progressive900","kind":"progressive","account_id":"default","created_at":"2018-06-11T22:32:53.284764088Z","updated_at":"2018-06-11T22:32:53.284764088Z","encoding_settings":{"aspect_mode":"preserve","audio_bitrate":96,"audio_channels":2,"audio_codec":"aac","decoder_bitrate_cap":1350,"decoder_buffer_size":1800,"force_aac_profile":"aac-lc","h264_bframes":2,"h264_profile":"main","height":360,"speed":3,"upscale":false,"video_bitrate":900,"video_codec":"h264"}},{"id":"default/progressive1200","version":0,"name":"Default Progressive1200","kind":"progressive","account_id":"default","created_at":"2018-06-11T22:32:53.284764088Z","updated_at":"2018-06-11T22:32:53.284764088Z","encoding_settings":{"aspect_mode":"preserve","audio_bitrate":128,"audio_channels":2,"audio_codec":"aac","decoder_bitrate_cap":1800,"decoder_buffer_size":2400,"force_aac_profile":"aac-lc","h264_bframes":2,"h264_profile":"main","height":540,"speed":3,"upscale":false,"video_bitrate":1200,"video_codec":"h264"}},{"id":"default/progressive1700","version":0,"name":"Default Progressive1700","kind":"progressive","account_id":"default","created_at":"2018-06-11T22:32:53.284764088Z","updated_at":"2018-06-11T22:32:53.284764088Z","encoding_settings":{"aspect_mode":"preserve","audio_bitrate":128,"audio_channels":2,"audio_codec":"aac","decoder_bitrate_cap":2550,"decoder_buffer_size":3400,"force_aac_profile":"aac-lc","h264_bframes":2,"h264_profile":"main","height":540,"speed":3,"upscale":false,"video_bitrate":1700,"video_codec":"h264"}},{"id":"default/progressive2000","version":0,"name":"Default Progressive2000","kind":"progressive","account_id":"default","created_at":"2018-06-11T22:32:53.284764088Z","updated_at":"2018-06-11T22:32:53.284764088Z","encoding_settings":{"aspect_mode":"preserve","audio_bitrate":128,"audio_channels":2,"audio_codec":"aac","decoder_bitrate_cap":3000,"decoder_buffer_size":4000,"force_aac_profile":"aac-lc","h264_bframes":2,"h264_profile":"main","height":720,"speed":3,"upscale":false,"video_bitrate":2000,"video_codec":"h264"}},{"id":"default/progressive2500","version":0,"name":"Default Progressive2500","kind":"progressive","account_id":"default","created_at":"2018-06-11T22:33:45.851290928Z","updated_at":"2018-06-11T22:33:45.851290928Z","encoding_settings":{"aspect_mode":"preserve","audio_bitrate":192,"audio_channels":2,"audio_codec":"aac","decoder_bitrate_cap":3750,"decoder_buffer_size":5000,"force_aac_profile":"aac-lc","h264_bframes":2,"h264_profile":"main","height":720,"speed":3,"upscale":false,"video_bitrate":2500,"video_codec":"h264"}},{"id":"default/progressive3500","version":0,"name":"Default Progressive3500","kind":"progressive","account_id":"default","created_at":"2018-06-11T22:34:01.503067518Z","updated_at":"2018-06-11T22:34:01.503067518Z","encoding_settings":{"aspect_mode":"preserve","audio_bitrate":192,"audio_channels":2,"audio_codec":"aac","decoder_bitrate_cap":5250,"decoder_buffer_size":7000,"force_aac_profile":"aac-lc","h264_bframes":2,"h264_profile":"high","height":1080,"speed":3,"upscale":false,"video_bitrate":3500,"video_codec":"h264","width":2048}},{"id":"default/progressive4000","version":0,"name":"Default Progressive4000","kind":"progressive","account_id":"default","created_at":"2018-06-11T22:37:50.217242316Z","updated_at":"2018-06-11T22:37:50.217242316Z","encoding_settings":{"aspect_mode":"preserve","audio_bitrate":192,"audio_channels":2,"audio_codec":"aac","decoder_bitrate_cap":6000,"decoder_buffer_size":8000,"force_aac_profile":"aac-lc","h264_bframes":2,"h264_profile":"high","height":1080,"speed":3,"upscale":false,"video_bitrate":4000,"video_codec":"h264","width":2048}}]
        },
        audioRenditions = [],
        videoRenditions = [],
        th,
        td,
        tr,
        txt,
        i,
        j,
        x,
        iMax,
        jMax,
        audioFields = ['audio_bitrate', 'audio_channels', 'audio_codec', 'forced_keyframe_rate', 'fragment_duration', 'fragment_track_timescale', 'segment_seconds'],
        videoFields = ['video_bitrate', 'height', 'aspect_mode', 'decoder_bitrate_cap', 'decoder_buffer_size', 'forced_keyframe_rate', 'fragment_duration', 'h264_bframes', 'h264_profile', 'segment_seconds', 'speed', 'video_codec'],
        // progressiveFields = ['video_bitrate', 'audio_bitrate', 'height', 'decoder_bitrate_cap', 'decoder_buffer_size', 'h264_profile'],
        audioTableBody = document.getElementById('audioTableBody'),
        videoTableBody = document.getElementById('videoTableBody'),
        // progressiveTableBody = document.getElementById('progressiveTableBody'),
        frag,
        rendition;

      /**
       * sort an array of objects based on an object property
       * @param {array} targetArray - array to be sorted
       * @param {string|number} objProperty - object property to sort on
       * @return sorted array
       */
      function sortArray(targetArray, objProperty) {
        targetArray.sort(function(a, b) {
          var propA, propB;
          if (typeof(targetArray[0][objProperty]) === 'string') {
            propA = a[objProperty].toLowerCase();
            propB = b[objProperty].toLowerCase();
          } else {
            propA = a[objProperty];
            propB = b[objProperty];
          }
          // sort ascending; reverse propA and propB to sort descending
          if (propA < propB) {
            return -1;
          } else if (propA > propB) {
            return 1;
          } else {
            return 0;
          }
        });
        return targetArray;
      }

      /**
       * Builds a table body
       * @param {Array} dataSet array of rendition settings
       * @param {Array} fields array of fields for the rendition
       * @param {HTMLElement} table body element to add the rows to
       */
      function buildTable(dataSet, fields, el) {
console.log('dataSet', dataSet);
        var frag = new DocumentFragment(),
          tr,
          td,
          txt,
          j,
          jMax;
        iMax = dataSet.length;
        for (i = 0; i < iMax; i++) {
          rendition = dataSet[i];
          // create row
          tr = document.createElement('tr');
          // create name cell
          td = document.createElement('td');
          txt = document.createTextNode(rendition.id);
          tr.appendChild(td);
          td.appendChild(txt);
          // add the encoding_settings
          jMax = fields.length;
          for (j = 0; j < jMax; j++) {
            td = document.createElement('td');
            if (rendition.encoding_settings[fields[j]]) {
              txt = document.createTextNode(rendition.encoding_settings[fields[j]]);
              td.appendChild(txt);
            }
            tr.appendChild(td);
          }
          // add the tr to the doc fragment
          frag.appendChild(tr);
        }
        // add the doc fragment to the element
        el.appendChild(frag);
      }

      // separate out audio and video renditions
      iMax = renditionData.renditions.length;
      for (i = 0; i < iMax; i++) {
        if (renditionData.renditions[i].kind === 'video') {
          videoRenditions.push(renditionData.renditions[i]);
        } else {
          audioRenditions.push(renditionData.renditions[i]);
        }
      }

      // sort the data sets by height and then bitrate
      videoRenditions.sort(function(a, b) {
        x = a.encoding_settings.height - b.encoding_settings.height;
        return x === 0 ? a.encoding_settings.video_bitrate - b.encoding_settings.video_bitrate : x;
      });
      // progressiveData.renditions.sort(function(a, b) {
      //   x = a.encoding_settings.height - b.encoding_settings.height;
      //   return x === 0 ? a.encoding_settings.video_bitrate - b.encoding_settings.video_bitrate : x;
      // });
        // console.log('videoRenditions', videoRenditions);
        // console.log('progressiveFields', progressiveFields);
        // console.log('progressiveTableBody', progressiveTableBody);
        // build the table bodies
        buildTable(audioRenditions, audioFields, audioTableBody);
        buildTable(videoRenditions, videoFields, videoTableBody);
        // buildTable(progressiveData.renditions, progressiveFields, progressiveTableBody);

      })(window, document);
