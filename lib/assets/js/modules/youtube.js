/**
 *
 * youtube
 * @param {object} $target
 * @param {string} id
 * @param {string} background
 *
 */

'use strict';

import Utility from './utility';

class Youtube {

  constructor($target, id, background) {
    if (Utility.isTouchDevice() || !$target || !id) {
      return;
    }
    this.$target = $target;
    this.id = id;
    this.background = background;
    this.youtube = this._build();
    this.youtube.$api.addEventListener('load', () => {
      this._load();
    });
    this.resize();
    window.addEventListener('resize', Utility.makeWindowWidthResizeEvent(() => {
      this.resize();
    }, true));
  }

  resize () {
    const currentTargetWidth = this.$target.offsetWidth;
    const currentTargetHeight = this.$target.offsetHeight;
    let height,
      width,
      left,
      top;
    if (currentTargetWidth * 9 / 16 > currentTargetHeight) {
      width = '100%';
      left = '0';
      height = currentTargetWidth * 9 / 16 + 'px';
      top = '-' + (currentTargetWidth * 9 / 16 - currentTargetHeight) / 2 + 'px';
    } else {
      width = currentTargetHeight * 16 / 9 + 'px';
      left = '-' + (currentTargetHeight * 16 / 9 - currentTargetWidth) / 2 + 'px';
      height = '100%';
      top = '0';
    }
    this.youtube.$movie.style.width = width;
    this.youtube.$movie.style.height = height;
    this.youtube.$movie.style.left = left;
    this.youtube.$movie.style.top = top;
  }

  _build () {
    const $container = document.createElement('div');
    const $movie = document.createElement('div');
    const $cover = document.createElement('div');
    this.$target.classList.add('js-youtube');
    $container.classList.add('js-youtube__content');
    $movie.classList.add('js-youtube__movie');
    $cover.classList.add('js-youtube__cover');
    $cover.style.background = this.background;
    $container.appendChild($movie);
    $container.appendChild($cover);
    this.$target.appendChild($container);
    let $api = document.querySelector('#js-youtube-api');
    if (!$api) {
      const insertScriptPlace = document.getElementsByTagName('script')[0];
      const nowProtocol = 'https:' === document.location.protocol ? 'https:' : 'http:';
      $api = document.createElement('script');
      $api.setAttribute('id', 'js-youtube-api');
      $api.setAttribute('src', nowProtocol + '//www.youtube.com/iframe_api');
      insertScriptPlace.parentNode.insertBefore($api, insertScriptPlace);
    }
    return {
      $api: $api,
      $container: $container,
      $movie: $movie,
      $cover: $cover
    };
  }

  _load () {
    let player;
    const options = {
      playerVars: {
        loop: 1,
        showinfo: 0,
        modestbranding: 1,
        controls: 0,
        autoplay: 1,
        rel: 0
      },
      videoId: this.id,
      width: '100%',
      height: '100%',
      events: {
        onReady: () => {
          player.mute();
          player.playVideo();
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.PLAYING) {
            this.$target.classList.add('is-playing');
          } else if (e.data === YT.PlayerState.ENDED) {
            player.playVideo();
          }
        }
      }
    };
    const play = () => {
      if (YT && YT.Player) {
        player = new YT.Player(this.youtube.$movie, options);
        this.youtube.$movie.setAttribute('src', this.youtube.$movie.getAttribute('src') + '&wmode=transparent');
      } else {
        setTimeout(play, 100);
      }
    };
    play();
  }

};

export default Youtube;
