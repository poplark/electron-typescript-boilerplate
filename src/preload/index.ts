// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { desktopCapturer } = require('electron');

const isDevelopment = process.env.NODE_ENV !== 'production';

console.log('preload', isDevelopment, process.env.NODE_ENV);

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }

  const btn: HTMLButtonElement | null = document.querySelector('#btn');
  btn?.addEventListener('click', () => {
    desktopCapturer
      .getSources({
        types: ['window', 'screen']
      })
      .then(sources => {
        console.log('sources: ', sources);
        if (sources.length > 0) {
          (<any>(navigator.mediaDevices))
            .getUserMedia({
              audio: false,
              video: {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  chromeMediaSourceId: sources[0].id,
                  maxWidth: 1280,
                  maxHeight: 720
                }
              }
            })
            .then(stream => handleStream(stream))
            .catch(e => handleError(e));
        }
      })
      .catch(e => handleError(e));

    function handleStream(stream) {
      const video: HTMLVideoElement | null = document.querySelector('#video')
      if (video) {
        video.srcObject = stream;
        video.onloadedmetadata = () => video.play()
      }
    }

    function handleError(e) {
      console.log(e)
    }
  });
})
