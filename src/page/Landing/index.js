import React, { Component } from 'react';
import _ from 'lodash';
import anime from 'animejs'

class Landing extends Component {

  constructor(props) {
    super(props)
    this.gotoQA = this.gotoQA.bind(this)
  }

  gotoQA = ()=>{
      setTimeout(()=> {
        this.props.startQA(true)
      },1100)
      this.navigate()
    }
  navigate = ()=> {
    anime({
      targets:'.landing',
      opacity:0,
      easing:'linear',
      duration:300,
      delay:200
    })
    anime({
      targets: '.back_shape-wrap',
      duration: 1100,
      easing: 'easeInOutSine',
      translateY: '-200vh'
    });

    anime({
      targets: '.back_shape',
      scaleY: [
        {value:[0.8,1.8],duration: 550,easing: 'easeInQuad'},
        {value:1,duration: 550,easing: 'easeOutQuad'}
      ]
    });

    anime({
      targets: '.back_shape path',
      duration: 1100,
      easing: 'easeOutQuad',
      d: 'M -44,-50 C -137.1,117.4 67.86,445.5 236,452 435.3,459.7 500.5,242.6 676,244 873.5,245.6 957,522.4 1154,594 1593,753.7 1793,226.3 1582,-126 1371,-478.3 219.8,-524.2 -44,-50 Z'
    });
  };
  gradients =()=> {
    var pathEls = document.querySelectorAll('#fill *');
    var timeline = anime.timeline();
    for (var i = 0; i < pathEls.length; i++) {
      var el = pathEls[i];
      el.setAttribute('stroke-dashoffset', anime.setDashoffset(el));
    }
    var wave = ['.ipsa-point-o', '.ipsa-point-i', '.ipsa-point-p', '.ipsa-point-s', '.ipsa-point-a'];
    var yWave = [0, 12, -10, 8, -4, 0];

    //var pathExp = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig; 
    wave.forEach(function(anim, index) {
      for (var i = 0; i < 5; i++) {
        timeline
        .add({
          targets: anim,
          translateY: {
            value: [yWave[i], yWave[i + 1]],
            duration: 300,
            delay: 0,
            easing: 'easeInOutQuad'
          },
          loop: false,
          offset: 1300 + i * 300 - index * 100
        })
      }
    });
    timeline.add({
      targets: '#wave',
      translateY: {
        value: -500,
        duration: 1300,
        delay: 0,
        easing: 'easeInOutQuad'
      },
      opacity:{
        value:0,
        duration:1500,
        delay:700,
        offset:1600,
      }
    })
    .add({
      targets: '#lines *',
      opacity: {
        value: 1,
        duration: 1,
        delay: function(el, i, t) { return 1900 + ( i * 80 ); },
      },
      strokeDashoffset: {
        value: [anime.setDashoffset, 0],
        duration: 1600,
        delay: function(el, i, t) { return 1700 + ( i * 100 ); },
        easing: 'linear'
      },
      stroke: {
        value: ['#82786f', function(el) { return anime.getValue(el.parentNode, 'stroke') } ],
        duration: 1500,
        delay: 1500,
        easing: 'linear'
      },
      offset: 2000,
    })
    .add({
      targets: '#fills *',
      opacity:{
        value:1,
        duration:1500,       
      },
      easing: 'linear',
      offset:5500,
    })
    .add({
      targets: '#firstStage',
      translateY: {
        value: -300,
        duration: 1300,
        delay: 0,
        easing: 'easeInOutQuad'
      },
    })
    .add({
      targets: '#seventeen *, #beauty *',
      opacity:{
        value:1,
        duration:5500,
        delay:(element, index) => {
          return 100 + 100 * index;
        },       
      },
      offset:9000,
    })
    .add({
      targets:"#suggest *",
      opacity: {
        value:1,
        duration:100,
        delay:(element, index) => {
          return 100 + 100 * index;
        },
      },
      offset:9000,
    })
    .add({
      targets:'.gotoqa',
      opacity: 0.9,
      backgroundColor: '#82786f',
      duration:4000,
      offset:13000
    })
  } 

  componentDidMount() {
    var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    if (iOS) document.body.classList.add('iOS');
    this.gradients();
  }

  render() {
    return(
      <div className="landing">
        <svg id="logo" data-name="レイヤー 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 780">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
          </defs>
          
          <g stroke="none" fill="#82786f">
            <g id="words">
              <g id="firstStage">
                <g id="test" alt="在线肌肤测试">
                  <path d="M234.313,472.396c2.416-2.417,3.868-2.18,4.356,0.726l-2.178,7.261h45.74c2.904,1.452,2.904,2.904,0,4.356h-46.466 c-4.356,11.617-10.165,21.298-17.425,29.041v42.11c-1.452,2.417-2.904,2.417-4.356,0v-38.48c-3.392,3.394-7.26,6.053-11.616,7.986 c-2.904,0.486-3.63-0.728-2.178-3.63c14.033-8.227,24.441-20.567,31.219-37.027H203.82c-2.422-1.452-2.422-2.904,0-4.356h28.315 L234.313,472.396z M250.285,494.904c1.452-2.418,2.904-2.418,4.356,0v18.876h24.686c2.417,1.452,2.417,2.904,0,4.354h-24.686 v31.946h30.494c1.935,1.452,1.935,2.904,0,4.356h-62.439c-2.421-1.452-2.421-2.904,0-4.356h27.589v-31.946h-23.233 c-2.422-0.964-2.422-2.416,0-4.354h23.233V494.904z"/>
                  <path d="M310.547,474.574c2.416-1.452,3.868-0.965,4.356,1.452c-3.874,10.649-8.712,20.33-14.521,29.042l14.521-1.452 c2.417-4.356,4.595-9.195,6.535-14.521c1.934-1.45,3.386-0.727,4.355,2.18c-8.712,19.362-15.734,31.707-21.055,37.025 c6.772-0.964,13.795-2.659,21.055-5.082c2.417,0.972,2.661,2.423,0.726,4.356c-8.712,2.904-18.876,5.326-30.493,7.26c-2.422-0.479-2.666-1.934-0.726-4.354c4.356-1.452,10.165-8.951,17.425-22.508l-15.973,1.451c-2.422,0-3.148-1.451-2.178-4.354 C300.864,496.843,306.19,486.678,310.547,474.574z M327.245,537.739c2.417,0.971,2.904,2.422,1.452,4.354 c-9.682,3.389-19.846,6.29-30.493,8.714c-2.904-0.486-3.392-1.938-1.452-4.355C308.851,544.034,319.015,541.131,327.245,537.739zM341.04,471.67c0.483,5.327,1.452,11.86,2.904,19.604l25.411-1.452c1.935,1.452,1.935,2.904,0,4.354l-24.685,1.452l3.63,15.975l23.958-1.451c1.935,1.451,1.935,2.903,0,4.354l-22.507,1.452c0.964,4.356,2.904,10.165,5.809,17.425 c5.808-5.318,9.921-10.163,12.342-14.521c2.417-0.482,3.63,0.488,3.63,2.904c-3.874,5.809-8.474,11.135-13.794,15.973 c4.355,8.226,8.951,12.825,13.794,13.795c2.904,1.452,4.112-3.148,3.63-13.795c1.452-1.452,2.904-1.452,4.356,0 c0.482,13.551-1.94,19.843-7.261,18.877c-7.26-1.451-13.312-6.778-18.15-15.973c-8.712,6.291-17.668,10.646-26.864,13.067 c-2.421-0.971-2.666-2.423-0.726-4.354c10.165-2.904,18.634-7.262,25.412-13.069c-2.421-5.808-4.6-12.343-6.534-19.603 l-19.604,1.449c-1.939-1.449-1.939-2.901,0-4.354l18.151-1.451l-3.63-15.973l-13.069,0.726c-1.939-1.452-1.939-2.903,0-4.354 L339.586,492c-1.452-7.744-2.421-14.275-2.904-19.604C337.648,470.462,339.1,470.219,341.04,471.67z M351.204,473.849 c2.904,1.45,7.017,4.354,12.342,8.713c0.483,2.421-0.487,3.63-2.903,3.63c-3.393-2.904-7.504-5.811-12.343-8.713 C347.812,475.062,348.783,473.849,351.204,473.849z"/>
                  <path d="M399.123,473.849h7.987c6.289,0,9.192,2.663,8.712,7.984v67.521c0,6.29-5.57,7.499-16.699,3.63 c-1.452-1.938-0.97-3.393,1.452-4.356c7.261,3.389,10.891,3.389,10.891,0v-21.055h-15.973c0.48,12.104-1.452,21.294-5.809,27.59 c-2.422,1.451-3.63,0.727-3.63-2.179c3.869-6.778,5.564-15.247,5.083-25.411v-45.74 C391.136,476.515,393.797,473.849,399.123,473.849z M407.11,478.205h-7.263c-2.902,0-4.354,1.452-4.354,4.356v15.973h15.973 v-15.973C411.948,479.657,410.496,478.205,407.11,478.205z M411.465,502.89h-15.973v20.327h15.973V502.89z M433.972,473.849h13.795c5.811,0,8.469,2.663,7.987,7.984v64.617c0,2.904,1.69,4.112,5.082,3.63c4.838,1.452,7.017-6.534,6.535-23.959 c1.452-2.417,2.903-2.417,4.354,0c0.964,20.329-2.666,29.769-10.891,28.315c-6.296,0.48-9.438-1.938-9.438-7.263V482.56 c0.482-2.904-0.97-4.356-4.354-4.356h-12.343c-2.904,0-4.356,1.452-4.356,4.356v26.138c0.483,22.75-2.665,38.235-9.438,46.466 c-2.422,0.481-3.63-0.487-3.63-2.904c6.29-8.227,9.193-22.508,8.711-42.836v-27.59 C425.985,476.515,428.646,473.849,433.972,473.849z"/>
                  <path d="M493.508,475.301h7.259c6.292,0,9.196,2.904,8.713,8.714v63.892c0.483,6.29-5.323,7.742-17.424,4.354 c-1.452-2.423-0.97-3.875,1.452-4.354c8.226,2.904,12.099,2.417,11.615-1.452v-20.329h-15.972 c0.48,10.164-1.452,19.842-5.811,29.042c-2.904,0.965-4.117,0-3.63-2.904c3.868-8.227,5.563-16.938,5.082-26.138v-41.384 C484.795,478.449,487.699,475.301,493.508,475.301z M499.314,479.657h-4.354c-3.873,0-5.81,1.695-5.81,5.082v13.795h15.974v-14.521 C505.606,481.109,503.671,479.657,499.314,479.657z M505.123,502.89h-15.972v18.877h15.972V502.89z M538.521,472.396v14.521h21.781 c2.416,1.452,2.416,2.904,0,4.356h-21.781v18.878h23.233c2.416,1.451,2.416,2.901,0,4.354h-20.329 c5.81,17.912,13.307,30.733,22.507,38.48c0.482,2.418-0.485,3.387-2.902,2.904c-10.164-8.23-17.911-21.297-23.233-39.206 c-2.903,14.038-11.377,26.861-25.411,38.479c-1.938,0.481-2.904-0.487-2.904-2.904c14.521-12.582,22.51-25.168,23.961-37.755 h-21.059c-1.939-1.451-1.939-2.901,0-4.354h21.781v-18.878h-20.329c-1.939-1.452-1.939-2.904,0-4.356h20.329v-14.521 C535.617,470.462,537.069,470.462,538.521,472.396z"/>
                  <path d="M573.372,497.082c5.32,3.393,10.646,7.261,15.972,11.617c0.483,2.903-0.487,4.116-2.904,3.63 c-4.843-3.869-9.926-7.5-15.244-10.891C570.224,499.021,570.949,497.569,573.372,497.082z M593.7,521.767 c-4.846,14.521-10.165,25.409-15.976,32.672c-2.421,1.452-3.629,0.727-3.629-2.18c6.29-8.713,11.373-19.357,15.246-31.944 C591.761,518.38,593.213,518.862,593.7,521.767z M577.727,473.122c5.811,3.394,11.13,7.261,15.976,11.617c0.48,2.904-0.729,3.873-3.631,2.904c-3.393-2.904-8.229-6.291-14.521-10.165C574.58,474.574,575.306,473.122,577.727,473.122z M614.755,490.548v13.068c0.482,22.751-6.052,40.418-19.604,53c-2.423,0.482-3.393-0.486-2.903-2.903 c12.582-11.617,18.633-28.314,18.148-50.097v-13.068C611.851,488.13,613.303,488.13,614.755,490.548z M605.317,476.026h13.796 c5.319,0,7.74,2.423,7.261,7.261v49.37c-1.452,2.422-2.904,2.422-4.356,0v-48.646c0.482-2.418-0.97-3.631-4.354-3.631h-11.616 c-2.904,0-4.356,1.452-4.356,4.356v47.918c-1.451,2.422-2.902,2.422-4.354,0v-47.917 C597.33,478.931,599.991,476.026,605.317,476.026z M614.029,532.657c0.479-2.904,1.689-3.868,3.63-2.904 c5.319,7.263,9.921,15.486,13.795,24.688c-0.972,2.902-2.422,3.387-4.356,1.452C623.707,547.66,619.351,539.918,614.029,532.657z M653.96,474.574v74.782c0.481,6.771-5.568,7.984-18.149,3.63c-1.452-2.422-0.97-3.874,1.452-4.356 c8.713,3.389,12.824,3.146,12.342-0.726v-73.33C651.057,472.157,652.509,472.157,653.96,474.574z M639.44,478.931v55.181 c-1.45,2.422-2.902,2.422-4.354,0v-55.181C636.536,476.515,637.988,476.515,639.44,478.931z"/>
                  <path d="M666.304,502.164h8.712c5.321,0,7.743,2.421,7.261,7.261V545c0,2.417,3.632-0.727,10.893-9.438 c2.417-0.966,3.63,0,3.63,2.902c-5.326,6.773-10.164,11.372-14.521,13.795c-2.422,0.967-3.872-0.242-4.355-3.631v-37.753 c0.482-2.902-0.969-4.354-4.355-4.354h-7.261C664.364,505.068,664.364,503.616,666.304,502.164z M677.194,475.301 c2.902,3.393,5.808,7.986,8.712,13.795c-0.486,1.938-1.938,2.423-4.356,1.452c-1.938-3.87-4.599-7.984-7.986-12.343 C673.563,475.787,674.773,474.818,677.194,475.301z M728.742,473.849v14.521h13.066c-2.421-4.354-4.599-7.742-6.532-10.164c0-2.904,1.209-3.87,3.631-2.904c4.839,6.295,8.712,12.829,11.614,19.604c-0.484,2.903-1.938,3.391-4.354,1.452l-1.452-3.631 h-15.973c2.902,35.817,7.261,55.179,13.066,58.083c2.418,1.934,3.87-4.846,4.356-20.329c0.966-1.937,2.418-1.937,4.354,0 c0,17.905-2.902,26.619-8.713,26.137c-8.229-0.486-14.037-21.781-17.424-63.891h-31.946c-1.938-1.452-1.938-2.904,0-4.356h31.946 v-14.521C725.839,471.914,727.291,471.914,728.742,473.849z M695.345,507.247h26.138c1.937,1.452,1.937,2.904,0,4.355h-10.163 v29.041l13.796-4.356c2.416,0.971,2.902,2.423,1.45,4.356c-10.164,3.391-20.814,6.291-31.944,8.713 c-2.422-0.973-2.665-2.665-0.729-5.083l13.069-2.903v-29.768h-11.617C693.406,510.151,693.406,508.699,695.345,507.247z"/>
                </g>
                <g id="lines" fill="none" fillRule="evenodd" stroke="#82786f" strokeWidth="3px">  
                  <path d="M310.093,57.54l15.83,12.761l-94.794,136.68l-17.37-11.824L308.022,57.54H310.093z" className="ipsa-o"/>
                  <path d="M217.501,226.888h21.378v170.082h-21.378V226.888z" className="ipsa-i"/>
                  <path d="M359.86,330.567l-6.68-17.771c13.36-3.34,27.589-6.08,33.069-20.041c2.733-7.124,3.497-14.858,2.205-22.38 c-3.81-19.373-18.906-25.919-49.904-22.647v149.375h-21.509V228.157c21.91,1.337,44.022-3.81,65.333,4.143 c24.617,9.779,36.647,37.665,26.868,62.283c-2.205,5.552-5.425,10.64-9.499,15.008C389.155,320.827,375.119,328.208,359.86,330.567z" className="ipsa-p"/>
                  <path d="M451.849,375.725l15.165-11.958c6.272,4.606,12.809,8.846,19.575,12.695c11.43,6.455,25.896,3.157,33.401-7.617 c7.985-9.916,7.026-24.301-2.205-33.069c-7.316-6.85-15.132-13.146-23.382-18.837c-8.316-5.627-16.342-11.668-24.049-18.104 c-13.749-11.766-17.908-31.282-10.155-47.63c8.275-16.701,25.756-26.813,44.358-25.655c14.695,0.741,28.262,8.112,36.877,20.042 l-12.627,12.826c-6.671-4.387-13.661-8.272-20.909-11.623c-9.188-3.347-19.467,0.189-24.649,8.484 c-5.921,7.479-5.468,18.166,1.066,25.117c6.005,6.279,12.578,11.981,19.643,17.037c8.684,6.681,18.303,12.49,26.722,20.041 c18.104,16.166,22.511,37.542,12.692,56.18c-10.84,20.201-33.992,30.489-56.248,24.986 C473.027,395.404,460.535,387.285,451.849,375.725z" className="ipsa-s"/>
                  <path d="M587.928,394.164 640.301,226.353 669.693,226.353 714.92,394.164 692.074,394.164 654.266,244.59 613.045,394.164z" className="ipsa-a"/>  
                </g> 
                <g id="fills" fill="#82786f">  
                  <path d="M310.093,57.54l15.83,12.761l-94.794,136.68l-17.37-11.824L308.022,57.54H310.093z" className="ipsa-o"/>
                  <path d="M217.501,226.888h21.378v170.082h-21.378V226.888z" className="ipsa-i"/>
                  <path d="M359.86,330.567l-6.68-17.771c13.36-3.34,27.589-6.08,33.069-20.041c2.733-7.124,3.497-14.858,2.205-22.38 c-3.81-19.373-18.906-25.919-49.904-22.647v149.375h-21.509V228.157c21.91,1.337,44.022-3.81,65.333,4.143 c24.617,9.779,36.647,37.665,26.868,62.283c-2.205,5.552-5.425,10.64-9.499,15.008C389.155,320.827,375.119,328.208,359.86,330.567z" className="ipsa-p"/>
                  <path d="M451.849,375.725l15.165-11.958c6.272,4.606,12.809,8.846,19.575,12.695c11.43,6.455,25.896,3.157,33.401-7.617 c7.985-9.916,7.026-24.301-2.205-33.069c-7.316-6.85-15.132-13.146-23.382-18.837c-8.316-5.627-16.342-11.668-24.049-18.104 c-13.749-11.766-17.908-31.282-10.155-47.63c8.275-16.701,25.756-26.813,44.358-25.655c14.695,0.741,28.262,8.112,36.877,20.042 l-12.627,12.826c-6.671-4.387-13.661-8.272-20.909-11.623c-9.188-3.347-19.467,0.189-24.649,8.484 c-5.921,7.479-5.468,18.166,1.066,25.117c6.005,6.279,12.578,11.981,19.643,17.037c8.684,6.681,18.303,12.49,26.722,20.041 c18.104,16.166,22.511,37.542,12.692,56.18c-10.84,20.201-33.992,30.489-56.248,24.986 C473.027,395.404,460.535,387.285,451.849,375.725z" className="ipsa-s"/>
                  <path d="M587.928,394.164 640.301,226.353 669.693,226.353 714.92,394.164 692.074,394.164 654.266,244.59 613.045,394.164z" className="ipsa-a"/>  
                </g> 
              </g>
              <g id="seventeen" style={{transform:'translateY(80px)'}} alt="17种me">
                <path d="M14.687,591.538v54.852c0,1.93,0.601,3.368,1.815,4.334c1.208,0.964,2.904,1.439,5.082,1.439h3.63v2.179h-26.5v-2.179 h3.267c2.417,0,4.175-0.478,5.264-1.439c1.089-0.959,1.633-2.399,1.633-4.327v-43.625c0-0.958-0.306-1.74-0.907-2.345 c-0.606-0.601-1.514-0.9-2.723-0.9h-6.534v-2.18h3.267c2.904,0,5.264-0.48,7.079-1.45c1.815-0.966,3.205-2.416,4.175-4.356 L14.687,591.538L14.687,591.538z"/>
                <path d="M75.674,594.806c-5.196,8.23-9.342,16.279-12.428,24.144c-3.091,7.866-4.635,14.702-4.635,20.51 c0,0.97,0.057,2.359,0.182,4.175c0.12,1.814,0.182,3.938,0.182,6.354c0,1.938-0.289,3.267-0.868,3.993 c-0.578,0.726-1.566,1.089-2.95,1.089c-1.157,0-2.143-0.425-2.955-1.277c-0.811-0.85-1.213-2.375-1.213-4.563 c0-4.63,1.026-10.354,3.085-17.173c2.053-6.815,7.561-18.389,16.517-34.707h-18.15c-2.667,0-4.782,0.853-6.353,2.541 c-1.577,1.695-2.723,4.236-3.449,7.625l-2.178-0.357l2.541-14.89h32.672V594.806z"/>
                <path d="M113.065,583.916c2.416,0.487,2.904,1.938,1.452,4.356c-3.874,1.452-7.748,2.421-11.617,2.901v17.427h11.617 c1.935,1.45,1.935,2.902,0,4.354h-10.165c5.808,10.651,9.438,18.396,10.891,23.233c-0.488,2.902-1.696,3.63-3.63,2.178 c-1.452-3.869-4.356-10.403-8.712-19.604v47.918c-1.452,2.419-2.904,2.419-4.356,0v-40.655 c-3.392,8.229-6.778,15.008-10.164,20.328c-2.422,1.452-3.63,0.728-3.63-2.179c5.809-8.713,10.164-19.115,13.068-31.22h-13.07 c-1.94-1.452-1.94-2.904,0-4.355h13.795V591.9l-10.164,0.726c-2.422-1.451-2.422-2.9,0-4.354 C95.639,588.272,103.864,586.82,113.065,583.916z M145.736,583.916v15.972h13.795c5.32,0,7.743,2.424,7.261,7.263v29.042 c0.482,5.325-1.94,7.747-7.261,7.261h-13.795v23.229c-1.452,2.42-2.904,2.42-4.356,0v-23.229h-13.794 c-4.844,0.486-7.261-1.936-7.261-7.261v-29.044c0.483-4.356,2.904-6.772,7.261-7.261h13.794v-15.974 C142.832,581.499,144.284,581.499,145.736,583.916z M141.38,604.244h-12.342c-2.904,0-4.356,1.452-4.356,4.356v26.138 c0,3.391,1.452,4.843,4.356,4.354h12.342V604.244z M158.079,604.244h-12.343v34.851h12.343c3.386,0.486,4.838-0.966,4.356-4.354 v-26.138C162.917,605.696,161.465,604.244,158.079,604.244z"/>
                <path d="M214.709,649.259c0,0.971,0.324,1.695,0.976,2.181c0.652,0.484,1.498,0.726,2.542,0.726h1.565v2.179H203.82v-2.179h1.815 c1.208,0,2.053-0.239,2.541-0.726c0.482-0.483,0.726-1.21,0.726-2.181v-47.556h-0.726l-12.342,52.639h-2.178l-11.253-51.55h-0.726 v46.467c0,0.971,0.301,1.695,0.907,2.181c0.601,0.484,1.391,0.726,2.36,0.726h1.089v2.179h-10.891v-2.179h1.089 c1.208,0,2.054-0.239,2.541-0.726c0.482-0.483,0.726-1.21,0.726-2.181v-51.912c0-0.964-0.227-1.688-0.669-2.178 c-0.449-0.48-1.23-0.727-2.348-0.727h-1.339v-2.178h10.165l10.294,47.176h0.75l11.055-47.176h12.388v2.178h-1.565 c-1.044,0-1.89,0.244-2.542,0.727c-0.652,0.487-0.976,1.214-0.976,2.178v51.912H214.709L214.709,649.259z"/>
                <path d="M223.422,594.442v-2.178h35.576l3.993,12.343l-1.815,0.726c-1.939-3.63-3.993-6.353-6.171-8.167 c-2.178-1.813-4.6-2.724-7.26-2.724H237.58c-0.969,0-1.758,0.244-2.359,0.727c-0.606,0.487-0.908,1.214-0.908,2.178v22.51h10.528 c2.416,0,4.174-0.604,5.263-1.815c1.089-1.208,1.633-3.021,1.633-5.445v-2.178h2.178v21.056h-2.178v-1.399 c0-2.562-0.544-4.537-1.633-5.938c-1.089-1.396-2.847-2.1-5.263-2.1h-10.528v27.227c0,0.971,0.301,1.695,0.908,2.181 c0.601,0.484,1.39,0.726,2.359,0.726h9.439c3.629,0,6.715-1.025,9.256-3.086c2.541-2.055,4.538-5.264,5.99-9.62l1.815,0.729 l-3.959,14.157h-36.699v-2.18h2.03c1.13,0,1.917-0.238,2.371-0.726c0.454-0.483,0.681-1.21,0.681-2.181v-51.91 c0-0.966-0.243-1.69-0.726-2.18c-0.488-0.48-1.333-0.727-2.542-0.727h-1.814V594.442z"/>
                <path d="M321.437,594.806h24.685c6.772,0.488,9.677,3.395,8.712,8.715c-0.969,8.712-4.356,19.361-10.165,31.943 c5.32,8.713,9.677,16.699,13.069,23.96c0.482,3.388-0.726,4.356-3.63,2.904c-3.392-7.261-7.504-14.761-12.343-22.508 c-5.326,9.199-12.586,17.425-21.781,24.686c-2.422,0.482-3.392-0.485-2.904-2.902c11.129-10.164,18.389-18.878,21.781-26.14 c-3.392-6.29-8.956-15.247-16.698-26.861c0-2.418,1.208-3.145,3.629-2.181c6.773,9.685,12.1,17.912,15.973,24.688 c4.839-10.647,7.743-19.359,8.712-26.141c0.483-3.866-1.452-5.808-5.808-5.808h-23.233 C318.533,597.71,318.533,596.258,321.437,594.806z M394.041,585.368v12.342h7.26c2.417,1.452,2.417,2.904,0,4.356h-7.26v58.083 c0.964,7.743-7.261,8.712-24.686,2.902c-1.452-2.422-0.726-3.874,2.178-4.354c13.068,4.839,19.115,4.839,18.151,0v-56.631h-30.493 c-2.422-1.452-2.422-2.904,0-4.356h30.493v-12.342C391.136,582.464,392.589,582.464,394.041,585.368z M370.081,610.053 c5.808,12.104,9.92,22.994,12.343,32.674c-0.488,2.902-1.94,3.391-4.356,1.45c-2.422-9.678-6.296-20.328-11.617-31.944 C366.451,609.326,367.659,608.601,370.081,610.053z"/>
                <path d="M423.807,596.258h68.249c1.936,1.452,1.936,2.904,0,4.356H425.26c-2.904,0-4.354,1.452-4.354,4.354v31.946 c0.48,11.134-1.696,21.538-6.535,31.219c-2.904,1.452-4.118,0.483-3.63-2.9c4.354-9.201,6.291-18.878,5.809-29.042v-32.672 C416.548,598.681,418.964,596.258,423.807,596.258z M489.151,612.957c-5.324,18.396-11.377,34.367-18.149,47.919h23.959 c1.935,1.452,1.935,2.904,0,4.356h-71.152c-1.452-1.452-1.452-2.904,0-4.356h42.111c7.26-15.004,13.551-31.459,18.877-49.371 C487.211,609.57,488.663,610.053,489.151,612.957z M431.794,614.409c5.321,10.164,9.438,21.055,12.343,32.672 c-0.488,2.904-1.938,3.391-4.354,1.452c-2.904-10.648-7.021-21.295-12.345-31.946C427.438,613.683,428.89,612.957,431.794,614.409z M448.493,584.643c-0.972-2.904,0-4.114,2.902-3.633c2.904,3.394,5.32,7.263,7.262,11.615c-0.488,2.423-1.94,2.904-4.356,1.452 C452.849,590.693,450.909,587.546,448.493,584.643z M452.849,607.874c3.387,11.617,6.046,23.479,7.986,35.577 c-0.97,3.391-2.422,3.63-4.356,0.726c-1.938-10.646-4.601-22.264-7.985-34.851C448.975,606.909,450.427,606.422,452.849,607.874z"/>
                <path d="M543.604,584.643c1.937-1.938,3.87-1.938,5.811,0c13.066,14.52,26.137,25.896,39.205,34.122 c1.452,2.902,0.481,4.115-2.904,3.631c-12.104-7.263-24.685-18.151-37.753-32.672c-0.97-1.451-1.938-1.451-2.904,0 c-10.649,14.036-24.444,24.93-41.385,32.672c-2.904,0.484-3.63-0.729-2.178-3.631C518.918,610.539,532.952,599.162,543.604,584.643 z M548.687,607.874v58.811c-1.45,1.936-2.902,1.936-4.354,0v-58.811C545.782,605.458,547.235,605.458,548.687,607.874z"/>
                <path d="M641.619,584.643v17.424c7.259,27.105,20.328,47.919,39.205,62.438c1.452,2.903,0.481,4.112-2.904,3.629 c-17.425-13.065-30.011-31.942-37.753-56.63c-3.875,21.781-17.669,40.419-41.385,55.904c-2.904,0-3.631-1.213-2.181-3.629 c26.14-16.938,39.688-38.48,40.659-64.618V584.64C638.715,582.707,640.167,582.707,641.619,584.643z"/>
                <path d="M708.414,583.916c1.934-1.936,3.386-1.689,4.354,0.729c-0.486,4.354-1.215,8.229-2.179,11.613h10.165 c5.32,0,7.742,2.423,7.261,7.263v52.273c0.481,5.32-1.938,7.742-7.261,7.26h-20.329c-4.844,0.482-7.261-1.938-7.261-7.26v-52.275 c0-4.841,2.417-7.263,7.261-7.263h5.81C707.201,592.871,707.926,588.759,708.414,583.916z M719.305,600.614H701.88 c-2.904,0-4.356,1.452-4.356,4.354v21.782h26.14v-21.782C724.143,602.066,722.69,600.614,719.305,600.614z M723.661,631.108 h-26.138v23.231c0,3.388,1.452,4.838,4.356,4.355h17.425c3.386,0.48,4.838-0.97,4.356-4.355V631.108z M741.811,583.916 c0,2.421-0.241,5.569-0.726,9.438h23.231c5.321,0,7.742,2.422,7.263,7.261l-0.729,49.371c0.482,15.003-10.408,18.876-32.672,11.616 c-1.452-2.904-0.969-4.356,1.452-4.356c18.391,6.773,27.346,3.869,26.863-8.712l0.727-46.467c0.481-2.904-0.97-4.356-4.354-4.356 h-22.51c-1.449,6.778-3.63,12.829-6.532,18.151c-2.423,1.452-3.632,0.726-3.632-2.18c4.842-9.678,7.263-19.604,7.263-29.768 C738.907,581.98,740.358,581.98,741.811,583.916z M742.537,614.409c5.809,8.23,10.401,16.942,13.795,26.138 c-0.487,3.873-1.939,4.355-4.356,1.452c-4.354-10.165-8.713-18.634-13.066-25.412C738.42,613.683,739.633,612.957,742.537,614.409z"/>
                <path d="M794.086,585.368h7.985c6.292,0,9.194,2.665,8.713,7.985v67.521c0,6.29-5.569,7.498-16.698,3.63 c-1.452-1.938-0.97-3.392,1.452-4.354c7.26,3.387,10.89,3.387,10.89,0v-21.057h-15.972c0.48,12.104-1.452,21.293-5.811,27.59 c-2.422,1.45-3.63,0.727-3.63-2.179c3.869-6.776,5.564-15.247,5.082-25.411v-45.739C786.1,588.033,788.76,585.368,794.086,585.368z M802.071,589.725h-7.261c-2.902,0-4.354,1.449-4.354,4.354v15.974h15.972v-15.974 C806.911,591.176,805.459,589.725,802.071,589.725z M806.428,614.409h-15.972v20.329h15.972V614.409z M828.936,585.368h13.795 c5.811,0,8.471,2.665,7.986,7.985v64.616c0,2.904,1.691,4.112,5.082,3.632c4.839,1.45,7.017-6.534,6.534-23.959 c1.452-2.419,2.904-2.419,4.354,0c0.966,20.327-2.666,29.767-10.891,28.313c-6.295,0.482-9.438-1.938-9.438-7.261v-64.617 c0.481-2.903-0.971-4.354-4.355-4.354H829.66c-2.904,0-4.356,1.449-4.356,4.354v26.138c0.483,22.751-2.665,38.237-9.438,46.468 c-2.422,0.481-3.631-0.486-3.631-2.902c6.291-8.228,9.194-22.508,8.714-42.837v-27.59 C820.949,588.033,823.61,585.368,828.936,585.368z"/>
                <path d="M888.47,586.82h7.261c6.292,0,9.196,2.904,8.714,8.711v63.893c0.482,6.29-5.324,7.742-17.427,4.356 c-1.452-2.423-0.969-3.874,1.452-4.356c8.228,2.904,12.103,2.416,11.617-1.452v-20.327h-15.974 c0.481,10.164-1.452,19.841-5.809,29.04c-2.903,0.966-4.118,0-3.63-2.902c3.868-8.227,5.563-16.938,5.082-26.138v-41.387 C879.759,589.967,882.661,586.82,888.47,586.82z M894.278,591.176h-4.356c-3.873,0-5.809,1.695-5.809,5.082v13.795h15.974v-14.521 C900.57,592.627,898.635,591.176,894.278,591.176z M900.087,614.409h-15.974v18.877h15.974V614.409z M933.485,583.916v14.521 h21.777c2.418,1.45,2.418,2.902,0,4.354h-21.777v18.877h23.229c2.418,1.452,2.418,2.904,0,4.356h-20.328 c5.81,17.912,13.31,30.73,22.507,38.479c0.483,2.416-0.485,3.389-2.902,2.903c-10.163-8.229-17.911-21.294-23.232-39.205 c-2.904,14.037-11.377,26.863-25.411,38.479c-1.938,0.482-2.903-0.485-2.903-2.901c14.521-12.582,22.508-25.169,23.959-37.755 h-21.056c-1.938-1.452-1.938-2.904,0-4.356h21.781v-18.877H908.8c-1.938-1.452-1.938-2.904,0-4.354h20.329v-14.521 C930.581,581.98,932.033,581.98,933.485,583.916z"/>
              </g>
              <g id="beauty" style={{transform:'translateY(80px)'}} alt="激发美的生命力">
                <path d="M158.079,721.572c5.32,4.354,9.439,8.229,12.343,11.616c0,2.902-1.214,3.873-3.63,2.902 c-2.904-2.902-7.022-6.771-12.343-11.614C154.449,721.572,155.657,720.606,158.079,721.572z M167.518,745.53 c1.934-1.936,3.386-1.689,4.355,0.727c-2.421,12.104-6.778,22.746-13.068,31.945c-2.421,1.452-3.63,0.727-3.63-2.178 C160.983,766.83,165.095,756.665,167.518,745.53z M160.983,696.887c3.868,3.393,7.499,7.021,10.89,10.893 c0,2.904-1.213,3.874-3.629,2.904c-3.393-3.87-7.022-7.5-10.891-10.893C157.353,696.887,158.562,695.921,160.983,696.887z M192.202,694.708c2.417-1.452,3.869-0.965,4.356,1.452l-4.356,7.987h8.713c5.808,0,8.468,2.664,7.986,7.984v12.345 c0.482,5.324-2.178,7.747-7.986,7.261H190.75c0.964,1.938,1.69,4.354,2.178,7.26h15.247c1.935,1.452,1.935,2.904,0,4.356h-21.781 v7.26h13.069c5.808,0,8.469,2.422,7.986,7.26v10.893c-0.488,8.713-7.749,11.615-21.781,8.713c-1.939-1.938-1.695-3.393,0.726-4.356 c11.129,2.904,16.699,0.966,16.699-5.809v-7.986c0.482-2.904-0.97-4.355-4.356-4.355h-12.343 c-1.452,8.229-6.778,16.214-15.973,23.961c-2.904,0-3.63-1.215-2.178-3.632c9.676-9.193,14.277-17.182,13.794-23.96v-7.983h-7.986 c-1.939-1.452-1.939-2.904,0-4.356h14.521l-1.452-5.082c-0.488-0.966-0.244-1.689,0.726-2.178h-5.083 c-4.844,0.486-7.26-1.936-7.26-7.261v-12.343c0-5.322,2.661-7.986,7.986-7.986h3.63L192.202,694.708z M200.189,708.503h-15.973 c-2.904,0-4.356,1.213-4.356,3.631v3.631h24.686v-3.631C205.027,709.716,203.575,708.503,200.189,708.503z M204.545,720.12h-24.686 v2.904c0,3.391,1.452,4.843,4.356,4.354h15.973c3.386,0.486,4.838-0.727,4.356-3.631L204.545,720.12L204.545,720.12z M216.887,696.887c1.452-2.418,2.904-2.418,4.356,0l-1.452,8.712h18.877c2.416,1.452,2.416,2.904,0,4.356h-3.63v7.261 c0.482,11.617-2.178,24.202-7.986,37.753c3.868,7.263,8.224,14.278,13.069,21.058c0.482,3.387-0.726,4.354-3.63,2.902 c-4.356-6.295-8.475-12.823-12.343-19.604c-4.356,7.747-9.439,14.521-15.247,20.329c-2.421,0.48-3.392-0.486-2.904-2.903 c6.291-6.777,11.616-14.277,15.973-22.508c-3.392-8.713-5.809-17.424-7.261-26.137l-2.178,6.532 c-1.939,1.452-3.148,0.972-3.63-1.45C212.288,723.024,214.948,710.926,216.887,696.887z M230.682,709.955h-11.617l-1.452,7.987 c1.935,13.555,4.356,23.72,7.261,30.492c4.356-11.131,6.291-21.537,5.808-31.221V709.955z"/>
                <path d="M284.409,695.435c1.452-2.418,2.904-2.418,4.356,0c-0.487,5.809-1.452,12.343-2.904,19.604h43.562 c2.417,1.452,2.417,2.904,0,4.355h-44.288c-1.452,5.323-2.666,9.198-3.63,11.615h34.124c6.291,0,8.469,2.422,6.535,7.263 c-3.392,8.711-8.956,16.46-16.699,23.23c8.712,7.261,17.425,12.101,26.137,14.521c1.935,1.935,1.69,3.387-0.726,4.354 c-8.712-1.938-18.394-7.261-29.042-15.974c-7.748,6.292-18.15,11.617-31.219,15.974c-2.421-0.485-2.904-1.938-1.452-4.354 c12.099-3.873,21.781-8.713,29.042-14.521c-6.296-6.771-11.617-15.483-15.973-26.137h-2.178 c-6.778,15.972-16.461,29.284-29.042,39.932c-2.421,0.481-3.392-0.485-2.903-2.902c15.973-14.521,26.863-32.187,32.671-53.001 h-17.426c-6.296,0.485-8.713-1.937-7.261-7.262l4.356-14.521c1.935-1.936,3.387-1.691,4.356,0.727l-3.63,13.068 c-0.97,2.904-0.244,4.117,2.178,3.631h18.151C282.957,707.777,283.921,701.243,284.409,695.435z M301.834,758.6 c5.321-4.356,10.403-10.893,15.247-19.604c1.452-2.417,0-3.63-4.356-3.63h-26.138C290.943,744.08,296.026,751.827,301.834,758.6z M306.19,696.887c7.26,3.874,13.069,7.506,17.425,10.893c0.964,2.904,0,4.117-2.904,3.63c-4.356-3.386-10.165-7.017-17.425-10.891 C301.834,697.612,302.798,696.404,306.19,696.887z"/>
                <path d="M361.368,697.612c0-2.904,1.209-3.869,3.63-2.904c2.904,4.844,5.083,8.957,6.535,12.343h24.686 c2.416-4.354,4.112-8.226,5.082-11.614c2.417-1.937,3.868-1.452,4.356,1.452c-1.94,4.843-3.394,8.229-4.356,10.163h20.33 c2.903,1.451,2.903,2.903,0,4.355h-36.303v11.617h33.398c2.904,1.452,2.904,2.904,0,4.354h-33.398v10.164h37.753 c2.417,1.452,2.417,2.904,0,4.356h-79.863c-2.904-1.452-2.904-2.904,0-4.356h37.754v-10.164h-31.945 c-2.904-1.45-2.904-2.902,0-4.354h31.945v-11.617H344.67c-2.422-1.452-2.422-2.904,0-4.355h21.781 C364.999,704.147,363.303,701.004,361.368,697.612z M380.972,746.257c1.452-2.416,2.904-2.416,4.356,0v5.811h37.027 c2.417,1.451,2.417,2.901,0,4.354h-36.301c12.101,10.165,24.442,16.699,37.027,19.604c2.417,1.935,2.178,3.387-0.728,4.354 c-13.556-2.902-26.625-9.682-39.205-20.329c-7.749,10.647-20.817,17.183-39.206,19.604c-2.904-0.97-2.904-2.422,0-4.355 c16.455-1.938,28.554-8.227,36.302-18.878h-34.85c-1.94-0.964-1.94-2.416,0-4.354h35.576L380.972,746.257L380.972,746.257z"/>
                <path d="M452.849,695.435c1.936-1.937,3.387-1.691,4.356,0.726c-0.488,4.356-1.214,8.229-2.179,11.617h10.166 c5.318,0,7.741,2.422,7.26,7.261v52.273c0.48,5.32-1.94,7.741-7.26,7.261h-20.33c-4.846,0.48-7.262-1.938-7.262-7.261v-52.273 c0-4.839,2.416-7.261,7.262-7.261h5.809C451.635,704.39,452.36,700.277,452.849,695.435z M463.74,712.134h-17.427 c-2.902,0-4.354,1.452-4.354,4.356v21.781h26.138V716.49C468.578,713.586,467.126,712.134,463.74,712.134z M468.096,742.628 h-26.138v23.231c0,3.388,1.452,4.84,4.354,4.354h17.427c3.386,0.483,4.838-0.969,4.354-4.354L468.096,742.628L468.096,742.628z M486.247,695.435c0,2.422-0.244,5.567-0.728,9.438h23.232c5.321,0,7.743,2.422,7.26,7.261l-0.726,49.37 c0.481,15.003-10.407,18.877-32.671,11.616c-1.452-2.904-0.973-4.356,1.45-4.356c18.391,6.774,27.348,3.87,26.862-8.712 l0.728-46.466c0.481-2.904-0.971-4.354-4.355-4.354h-22.506c-1.452,6.775-3.63,12.828-6.534,18.149 c-2.422,1.452-3.63,0.728-3.63-2.179c4.838-9.678,7.26-19.604,7.26-29.769C483.343,693.5,484.795,693.5,486.247,695.435z M486.974,725.929c5.81,8.229,10.402,16.941,13.793,26.139c-0.484,3.874-1.938,4.354-4.354,1.451 c-4.355-10.163-8.712-18.635-13.068-25.41C482.854,725.202,484.069,724.477,486.974,725.929z"/>
                <path d="M568.289,696.887c1.452-1.935,2.903-1.935,4.354,0v17.427h31.945c1.935,1.452,1.935,2.902,0,4.354h-31.945v24.688h30.493 c1.936,1.45,1.936,2.901,0,4.354h-30.493v26.138h37.753c1.937,1.452,1.937,2.904,0,4.355h-82.768c-1.452-1.451-1.452-2.903,0-4.355 h40.658v-26.138h-32.672c-1.938-1.452-1.938-2.903,0-4.354h32.672v-24.688h-27.59c-2.423,6.777-5.569,13.313-9.438,19.604 c-2.904,1.452-4.117,0.484-3.63-2.904c7.261-11.13,11.616-22.747,13.068-34.851c1.935-2.417,3.387-2.18,4.354,0.727 c-0.486,2.904-1.452,7.26-2.904,13.068h26.14L568.289,696.887L568.289,696.887z"/>
                <path d="M659.769,696.16c2.418-2.417,4.84-2.417,7.263,0c11.13,12.587,23.473,20.816,37.026,24.686 c1.937,1.939,1.691,3.394-0.726,4.356c-14.521-4.356-27.353-12.343-38.48-23.959c-0.97-0.966-1.938-0.966-2.902,0 c-11.617,11.135-24.931,19.12-39.934,23.959c-2.902-0.965-3.146-2.417-0.727-4.356C635.811,716.49,648.636,708.265,659.769,696.16z M635.084,729.559h13.067c5.809,0.485,8.471,3.391,7.985,8.713v26.86c0.483,5.811-2.665,8.471-9.438,7.986h-11.615 c-5.808,0.482-8.712-2.421-8.712-8.713V738.27C626.372,732.463,629.276,729.559,635.084,729.559z M648.151,733.915H635.81 c-3.392,0-5.082,1.695-5.082,5.082v24.686c0,3.868,1.69,5.564,5.082,5.081h10.893c3.868,0.483,5.563-1.213,5.081-5.081v-24.686 C652.266,735.61,651.057,733.915,648.151,733.915z M638.715,719.394h42.835c2.418,1.45,2.418,2.902,0,4.354h-42.835 C636.774,722.298,636.774,720.847,638.715,719.394z M672.838,731.011h14.521c6.291,0,9.195,2.904,8.715,8.715v25.408 c0.48,9.68-6.055,12.101-19.604,7.263c-2.421-2.422-1.938-3.873,1.452-4.356c10.165,4.356,14.761,3.145,13.795-3.631v-23.958 c0.482-3.388-0.97-5.082-4.355-5.082h-14.521c-2.421,0-3.631,1.694-3.631,5.082v37.753c-1.452,2.418-2.903,2.418-4.355,0v-39.206 C664.852,733.676,667.513,731.011,672.838,731.011z"/>
                <path d="M754.153,695.435v13.066h29.769c6.772,0,10.164,2.904,10.164,8.713c0,16.46-0.487,32.188-1.452,47.191 c-0.97,14.521-12.586,18.15-34.85,10.892c-2.422-2.423-1.939-3.873,1.452-4.354c18.877,6.29,28.555,3.869,29.042-7.262 c0.964-14.521,1.208-29.768,0.726-45.738c0.482-3.389-1.213-5.083-5.082-5.083h-29.769c-0.486,30.979-11.616,53.485-33.396,67.521 c-2.904,0-3.63-1.213-2.178-3.63c20.328-14.034,30.729-35.333,31.219-63.892h-33.396c-2.423-1.452-2.423-2.904,0-4.356h33.396 v-13.066C751.249,693.017,752.701,693.017,754.153,695.435z"/>
              </g>
            </g>

            <g id="wave">
              <path d="M337.022,740.774c-15.164,0-27.5-12.563-27.5-28.001c0-15.438,12.336-28,27.5-28s27.5,12.562,27.5,28 C364.522,728.213,352.186,740.774,337.022,740.774z" className="ipsa-point-o"/>
              <path d="M409.811,741.094c-15.164,0-27.5-12.561-27.5-28s12.336-28,27.5-28c15.164,0,27.5,12.561,27.5,28 S424.975,741.094,409.811,741.094z" className="ipsa-point-i"/>
              <path d="M482.842,741.418c-15.164,0-27.5-12.561-27.5-28s12.336-28,27.5-28s27.5,12.561,27.5,28S498.005,741.418,482.842,741.418z" className="ipsa-point-p"/>
              <path d="M557.163,741.785c-15.163,0-27.5-12.563-27.5-28c0-15.439,12.337-28,27.5-28s27.5,12.561,27.5,28 C584.663,729.224,572.326,741.785,557.163,741.785z" className="ipsa-point-s"/>
              <path d="M631.424,740.259c-15.163,0-27.5-12.561-27.5-28c0-15.438,12.337-28,27.5-28s27.5,12.562,27.5,28 C658.924,727.698,646.587,740.259,631.424,740.259z" className="ipsa-point-a"/>
            </g>
            <g id="suggest" style={{transform:'translateY(50px)'}}>
            <g className="circle circle0">
              <image overflow="visible"  width="250" height="250" xlinkHref="image/me_b3.png"  transform="matrix(0.3549 0 0 0.3616 8.9453 325.7148)">
              </image>
            </g> 
            <g className="circle circle1">
              <image overflow="visible"  width="250" height="250" xlinkHref="image/me_s1.png"  transform="matrix(0.3612 0 0 0.3612 114.4336 326.0166)">
              </image>
            </g>
            <g className="circle circle2">
              <image overflow="visible"  width="250" height="250" xlinkHref="image/me_ex1.png"  transform="matrix(0.3612 0 0 0.3612 222.5498 326.6201)">
              </image>
            </g>
            <g className="circle circle3">
              <image overflow="visible"  width="250" height="250" xlinkHref="image/me_r1.png"  transform="matrix(0.3612 0 0 0.3612 330.8711 326.0156)">
              </image>
            </g>
            <g className="circle circle14">
              <image overflow="visible"  width="250" height="250" xlinkHref="image/me_b1.png"  transform="matrix(0.3612 0 0 0.3612 436.9282 325.4805)">
              </image>
            </g>
            <g className="circle circle10">
              <image overflow="visible"  width="250" height="250" xlinkHref="image/me_ex2.png"  transform="matrix(0.3612 0 0 0.3612 542.7041 331.1094)">
              </image>
            </g>
            <g className="circle circle9">
              <image overflow="visible"  width="250" height="250" xlinkHref="image/me_s2.png"  transform="matrix(0.3448 0 0 0.3448 652.6309 330.1982)">
              </image>
            </g>
            <g className="circle circle5">
              <image overflow="visible"  width="250" height="250" xlinkHref="image/me_s2.png"  transform="matrix(0.3448 0 0 0.3448 760.0518 328.3926)">
              </image>
            </g>
            <g className="circle circle8">
              <image overflow="visible"  width="250" height="250" xlinkHref="image/me_s2.png"  transform="matrix(0.3448 0 0 0.3448 865.1973 326.6172)">
              </image>
            </g>
            <g className="circle circle6">
              <image overflow="visible"  width="250" height="250" xlinkHref="image/me_r2.png"  transform="matrix(0.3644 0 0 0.3644 53.7925 428.9346)">
              </image>
            </g>
            <g className="circle circle7">
              <image overflow="visible"  width="250" height="250" xlinkHref="image/me_r2.png"  transform="matrix(0.3644 0 0 0.3644 162.9072 429.666)">
              </image>
            </g>
            <g className="circle circle13">
              <image overflow="visible"  width="250" height="250" xlinkHref="image/me_se1.png"  transform="matrix(0.3579 0 0 0.3579 272.1519 431.5635)">
              </image>
            </g>
            <g className="circle circle11">
              <image overflow="visible"  width="250" height="250" xlinkHref="image/me_ex2.png"  transform="matrix(0.3612 0 0 0.3612 377.8125 433.3828)">
              </image>
            </g>
            <g className="circle circle4">
              <image overflow="visible"  width="250" height="250" xlinkHref="image/me_r2.png"  transform="matrix(0.3644 0 0 0.3644 486.2002 432.2061)">
              </image>
            </g>
            <g className="circle circle12">
              <image overflow="visible"  width="250" height="250" xlinkHref="image/me_se1.png"  transform="matrix(0.3579 0 0 0.3579 596.8467 432.334)">
              </image>
            </g>
            <g className="circle circle15">
              <image overflow="visible"  width="250" height="250" xlinkHref="image/me_ex2.png"  transform="matrix(0.3612 0 0 0.3612 706.6826 433.2666)">
              </image>
            </g>
            <g className="circle circle16">
              <image overflow="visible"  width="250" height="250" xlinkHref="image/me_b1.png"  transform="matrix(0.3579 0 0 0.3579 814.7822 429.2344)">
              </image>
            </g>    
          </g>
          </g>
         
        </svg>    
        <button onClick={this.gotoQA } className="gotoqa">开始肌肤测试之旅</button>
      </div>
    )
  }
}

export default Landing;