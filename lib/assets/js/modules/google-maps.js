/**
 *
 * google-maps
 * @param {object} $target
 * @param {object} param
 *
 */

'use strict';

import Utility from './utility';

class GoogleMaps {

  constructor($target, param) {
    if (!$target) {
      return;
    }
    const defaultParam = {
      APIKey: false,
      center: [35.681224, 139.767073],
      pinList: [
        {
          center: [35.681224, 139.767073],
          imageURL: 'https://placehold.jp/150x150.png'
        },
        {
          center: [35.685224, 139.763073],
          imageURL: 'https://placehold.jp/180x180.png'
        }
      ],
      pinSizeList: [3.5, 2],
      zoomLevelList: [16, 18],
      style: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ] // exmple: https://developers.google.com/maps/documentation/javascript/styling?hl=ja
    };
    this.config = Object.assign(defaultParam, param);
    this.$target = $target;
    this._init();
  }

  _init () {
    let $api = document.querySelector('#js-google-maps-api-' + this.config.APIKey);
    if (!$api) {
      const insertScriptPlace = document.getElementsByTagName('script')[0];
      const nowProtocol = 'https:' === document.location.protocol ? 'https:' : 'http:';
      const URLParam = this.config.APIKey ? '?key=' + this.config.APIKey : '';
      $api = document.createElement('script');
      $api.setAttribute('id', 'js-google-maps-api-' + this.config.APIKey);
      $api.setAttribute('src', nowProtocol + '//maps.google.com/maps/api/js' + URLParam);
      insertScriptPlace.parentNode.insertBefore($api, insertScriptPlace);
    }
    this.$target.classList.add('js-google-maps');
    $api.addEventListener('load', () => {
      let currentQuery = Utility.getCurrentQuery(),
        currentWindowWidth = window.innerWidth,
        mapObject = new google.maps.Map(this.$target, {
          center: new google.maps.LatLng(this.config.center[0], this.config.center[1]),
          zoom: this.config.zoomLevelList[currentQuery],
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }),
        pinObjectList = [];
      if (this.config.style) {
        mapObject.mapTypes.set('style', new google.maps.StyledMapType(this.config.style, {name: 'style'}));
        mapObject.setMapTypeId('style');
      }
      const setPin = () => {
        for (let i = 0; i < this.config.pinList.length; i++) {
          ((i) => {
            const position = new google.maps.LatLng(this.config.pinList[i].center[0], this.config.pinList[i].center[1]);
            if (this.config.pinList[i].imageURL) {
              const img = new Image();
              img.src = this.config.pinList[i].imageURL;
              img.onload = () => {
                const width  = img.width;
                const height = img.height;
                const icon = {
                  url : this.config.pinList[i].imageURL,
                  scaledSize : new google.maps.Size(width / this.config.pinSizeList[currentQuery], height / this.config.pinSizeList[currentQuery])
                };
                const marker = new google.maps.Marker({
                    map: mapObject,
                    position: position,
                    icon: icon
                });
                pinObjectList.push(marker);
              };
            } else {
              const marker = new google.maps.Marker({
                map: mapObject,
                position: position
              });
              pinObjectList.push(marker);
            }
          })(i);
        }
      };
      setPin();
      google.maps.event.addDomListener(window, 'resize', Utility.makeWindowWidthResizeEvent((windowWidth, query) => {
        currentWindowWidth = windowWidth;
        currentQuery = query;
        mapObject.panTo(new google.maps.LatLng(this.config.center[0], this.config.center[1]));
        mapObject.setZoom(this.config.zoomLevelList[currentQuery]);
        for (let i = 0; i < pinObjectList.length; i++) {
          pinObjectList[i].setMap(null);
        }
        pinObjectList = [];
        setPin();
      }, true));
    });
  }

};

export default GoogleMaps;
