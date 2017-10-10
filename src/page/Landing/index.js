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
      targets: '#test',
      opacity: 1,
      duration:500,
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
      targets:'#firstTwo *',
      opacity:{
        value:1,
        duration:250,
      },
      offset:9000,
    })
    .add({
      targets:'#endTwo *',
      opacity:{
        value:1,
        duration:500,
      },
      offset:9500,
    })
    .add({
      targets: '#beauty *',
      opacity:{
        value:1,
        duration:5500,
        delay:(element, index) => {
          return 100 + 100 * index;
        },       
      },
      offset:10000,
    })
    .add({
      targets:"#suggest *",
      opacity: {
        value:1,
        duration:100,
        delay:(element, index) => {
          return 100 + 60 * index;
        },
      },
      offset:9000,
    })
    .add({
      targets:'.gotoqa',
      opacity: 0.9,
      backgroundColor: '#82786f',
      duration:4000,
      offset:11000
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
              <g id="seventeen" transform='translate(10,200)'>
                <g id="firstTwo">
                  <path d="M337.406,411.124c1.716-1.374,2.747-1.031,3.094,1.031c-0.689,2.063-1.378,3.956-2.063,5.672h20.625 c3.778,0,5.499,1.72,5.156,5.156v40.219c0.342,3.778-1.378,5.499-5.156,5.156h-38.156c-3.44,0.343-5.156-1.378-5.156-5.156v-40.219 c0.342-3.437,2.063-5.156,5.156-5.156h13.922C335.859,415.422,336.717,413.187,337.406,411.124z M358.031,420.921h-36.094	c-2.063,0-3.094,1.031-3.094,3.094v9.281h42.281v-9.281C361.467,421.952,360.436,420.921,358.031,420.921z M361.125,436.39h-42.281 v12.375h42.281V436.39z M361.125,451.858h-42.281v10.313c0,2.405,1.031,3.437,3.094,3.094h36.094	c2.405,0.343,3.436-0.688,3.094-3.094V451.858z"/>
                  <path d="M413.719,409.577l1.031,19.078h21.141c1.716,1.031,1.716,2.063,0,3.094h-20.625c0.685,6.876,1.889,12.891,3.609,18.047 c3.778-5.156,6.872-10.313,9.281-15.469c1.716-0.685,2.578-0.169,2.578,1.547c-2.063,5.156-5.503,11.001-10.313,17.531	c3.436,6.876,6.703,11.171,9.797,12.891c2.405,1.716,3.609-2.235,3.609-11.859c0.685-1.374,1.716-1.374,3.094,0	c0.342,11.344-1.894,16.669-6.703,15.984c-4.472-2.063-8.597-7.05-12.375-14.953c-4.125,4.125-9.281,8.077-15.469,11.859	c-2.063,0-2.578-0.862-1.547-2.578c6.53-4.125,11.686-8.25,15.469-12.375c-2.063-5.841-3.44-12.718-4.125-20.625h-17.016v12.891	c3.778-1.374,7.561-2.921,11.344-4.641c2.063,0.347,2.405,1.378,1.031,3.094c-3.44,1.72-7.565,3.44-12.375,5.156v14.953	c0.685,5.156-1.547,7.388-6.703,6.703c-3.094-0.347-6.019-1.204-8.766-2.578c-1.378-1.72-1.031-2.751,1.031-3.094	c8.25,3.437,12.028,3.437,11.344,0V449.28c-4.472,1.72-8.939,3.094-13.406,4.125c-2.063-0.343-2.409-1.374-1.031-3.094	c5.841-1.716,10.655-3.263,14.438-4.641v-13.922h-14.438c-1.378-1.031-1.378-2.063,0-3.094h14.438v-10.828	c-4.472,1.031-8.423,1.72-11.859,2.063c-1.72-0.343-1.894-1.374-0.516-3.094c8.935-1.031,17.358-3.094,25.266-6.188	c1.716,0.347,2.063,1.378,1.031,3.094c-2.409,1.031-6.019,2.235-10.828,3.609v11.344h16.5l-1.031-19.078	C411.656,408.203,412.688,408.203,413.719,409.577z M423,411.64c2.747,3.782,5.325,8.081,7.734,12.891 c-0.347,2.409-1.378,2.751-3.094,1.031c-2.409-4.125-4.987-8.25-7.734-12.375C420.249,410.781,421.28,410.266,423,411.64z"/>
                  <path d="M477.029,446.485c-3.488,0-6.324-2.89-6.324-6.438s2.836-6.438,6.324-6.438c3.484,0,6.324,2.89,6.324,6.438 C483.354,443.597,480.515,446.485,477.029,446.485z"/>
                </g>
                <g id="endTwo">
                  <path d="M509.109,434.843h7.219c3.778,0,5.498,1.72,5.156,5.156v18.047c3.436,6.53,8.419,9.45,14.953,8.766h31.453	c1.373,1.031,1.373,2.063,0,3.094h-31.969c-6.534,0.685-11.859-2.063-15.984-8.25c-3.44,4.468-6.188,7.046-8.25,7.734	c-1.721,0-2.236-0.862-1.547-2.578c3.436-2.063,6.188-4.987,8.25-8.766V441.03c0.342-2.063-0.689-3.094-3.094-3.094h-6.188	C507.731,436.905,507.731,435.874,509.109,434.843z M512.203,412.155c0-1.716,0.857-2.405,2.578-2.063	c3.094,4.813,5.841,9.628,8.25,14.438c-0.347,1.72-1.205,2.235-2.578,1.547C517.013,420.236,514.266,415.596,512.203,412.155z	 M545.203,410.608c1.031-1.374,2.063-1.374,3.094,0v9.281h16.5c1.373,1.031,1.373,2.063,0,3.094h-16.5v12.375h19.078	c1.373,1.031,1.373,2.063,0,3.094h-12.891v18.563c0,2.409,1.031,3.44,3.094,3.094h2.578c2.747,0.688,3.951-2.747,3.609-10.313	c1.031-1.374,2.063-1.374,3.094,0c0.342,9.628-1.721,14.091-6.188,13.406h-4.125c-3.44,0.343-5.156-1.378-5.156-5.156v-19.594	h-11.344c0.342,12.722-3.268,21.141-10.828,25.266c-1.721,0.343-2.409-0.516-2.063-2.578c6.872-3.437,10.139-10.997,9.797-22.688	h-11.344c-1.378-1.031-1.378-2.063,0-3.094h19.594v-12.375h-12.375c-2.063,4.125-4.125,7.565-6.188,10.313	c-1.721,0.688-2.578,0-2.578-2.063c4.467-5.499,7.219-11.859,8.25-19.078c1.373-1.031,2.404-0.858,3.094,0.516	c0,1.72-0.516,4.125-1.547,7.219h11.344V410.608z"/>
                  <path d="M585.938,411.124v11.344h7.219c1.373,1.031,1.373,2.063,0,3.094h-7.219v13.922c1.716-1.031,3.778-2.405,6.188-4.125	c1.716-0.343,2.404,0.347,2.063,2.063c-2.409,2.063-5.156,3.956-8.25,5.672v21.141c0.685,5.156-3.44,6.53-12.375,4.125	c-1.031-1.72-0.689-2.925,1.031-3.609c5.841,2.405,8.592,2.063,8.25-1.031V444.64c-2.752,1.72-5.503,3.094-8.25,4.125	c-1.721-0.343-2.063-1.374-1.031-3.094c2.747-1.031,5.841-2.578,9.281-4.641v-15.469h-8.766c-1.378-1.031-1.378-2.063,0-3.094	h8.766v-11.344C583.875,409.75,584.906,409.75,585.938,411.124z M611.719,438.968c1.031-2.063,2.063-2.063,3.094,0v6.703h15.469	c1.373,1.031,1.373,2.063,0,3.094h-15.469v8.25h19.594c1.373,1.031,1.373,2.063,0,3.094h-19.594v9.281	c-1.031,1.716-2.063,1.716-3.094,0v-9.281h-19.594c-1.721-0.685-1.721-1.716,0-3.094h19.594v-8.25H596.25	c-1.721-0.685-1.721-1.716,0-3.094h15.469V438.968z M594.188,411.64h29.391c4.467,0,6.188,1.72,5.156,5.156	c-1.721,4.125-6.019,8.766-12.891,13.922c7.219,4.125,13.748,6.876,19.594,8.25c0.685,1.378,0.342,2.409-1.031,3.094	c-7.219-2.063-14.269-5.156-21.141-9.281c-6.534,4.125-13.064,7.219-19.594,9.281c-2.063,0-2.409-1.031-1.031-3.094	c6.529-2.063,12.375-4.81,17.531-8.25c-5.156-3.778-9.797-8.419-13.922-13.922c-0.347-1.374,0.342-2.063,2.063-2.063h-4.125	C592.467,413.702,592.467,412.671,594.188,411.64z M622.031,414.733h-23.203c4.467,5.845,9.281,10.485,14.438,13.922	c5.498-4.125,9.107-7.562,10.828-10.313C626.156,415.938,625.467,414.733,622.031,414.733z"/>
                </g>
              </g>
              <g id="beauty" transform='translate(0,240)'>
                <path d="M203.609,509.402h57.75c1.716,1.031,1.716,2.063,0,3.094h-57.75C202.231,511.812,202.231,510.78,203.609,509.402z M215.469,515.59h35.063c4.125,0,6.014,2.063,5.672,6.188v6.188c0.342,3.782-2.063,5.503-7.219,5.156h-13.406v4.125h20.625	c1.374,1.031,1.374,2.063,0,3.094h-20.625v4.125h25.781c1.716,1.031,1.716,2.063,0,3.094h-54.656c-1.378-1.031-1.378-2.063,0-3.094	h25.781v-4.125h-22.688c-1.378-1.031-1.378-2.063,0-3.094h22.688v-4.125h-17.016c-3.783,0.347-5.672-1.374-5.672-5.156v-6.703	C209.797,517.483,211.686,515.59,215.469,515.59z M214.438,489.809H249.5c4.125,0,6.014,2.063,5.672,6.188v4.641	c0.342,4.125-1.72,6.019-6.188,5.672h-34.547c-3.783,0.347-5.672-1.716-5.672-6.188v-4.125	C208.766,491.871,210.655,489.809,214.438,489.809z M250.531,492.902h-35.578c-2.063,0-3.094,1.031-3.094,3.094h40.219	C252.42,493.934,251.905,492.902,250.531,492.902z M252.078,499.09h-40.219c0,3.094,0.685,4.472,2.063,4.125h34.547	C251.216,503.903,252.42,502.53,252.078,499.09z M232.484,518.684h-16.5c-2.063,0-3.094,1.378-3.094,4.125h19.594V518.684z	 M232.484,525.902h-19.594c0,3.094,1.2,4.472,3.609,4.125h15.984V525.902z M250.016,518.684h-14.438v4.125h17.531	C253.452,520.062,252.42,518.684,250.016,518.684z M253.109,525.902h-17.531v4.125H249.5	C252.247,530.374,253.452,528.996,253.109,525.902z"/>
                <path d="M296.938,488.262c1.716-1.374,2.747-1.031,3.094,1.031c-1.031,1.72-2.236,3.609-3.609,5.672h16.5	c4.125,0,6.014,1.72,5.672,5.156v24.234c4.125-5.499,6.872-10.14,8.25-13.922c1.374-1.374,2.405-1.031,3.094,1.031	c-2.063,5.845-5.845,11.69-11.344,17.531v17.016c0.342,2.747-1.378,4.294-5.156,4.641c-3.094,0-6.534-0.688-10.313-2.063	c-1.031-1.72-0.516-2.751,1.547-3.094c7.561,2.747,11.17,2.747,10.828,0v-13.922c-12.375,8.597-26.644,14.265-42.797,17.016	c-1.72-0.688-1.72-1.72,0-3.094c15.811-2.751,29.217-8.077,40.219-15.984c-13.753,1.72-28.359,2.925-43.828,3.609	c-1.378-0.685-1.378-1.716,0-3.094l7.219-0.516v-29.391c0-3.437,1.716-5.156,5.156-5.156h11.344	C294.875,491.871,296.249,489.64,296.938,488.262z M312.406,498.059H282.5c-2.063,0-3.094,1.031-3.094,3.094v4.125H315.5v-4.125	C315.842,499.09,314.811,498.059,312.406,498.059z M315.5,508.371h-36.094v8.25H315.5V508.371z M315.5,519.715h-36.094v9.797	c10.997-0.685,23.03-1.716,36.094-3.094V519.715z"/>
                <path d="M344.891,506.309h39.188c1.716,1.031,1.716,2.063,0,3.094h-18.563v13.406h22.688c1.716,1.031,1.716,2.063,0,3.094h-22.688	v16.5c6.872,2.405,16.669,3.437,29.391,3.094c1.374,1.031,1.374,2.063,0,3.094c-24.065,1.031-40.219-4.472-48.469-16.5	c-2.063,6.876-5.503,12.718-10.313,17.531c-1.72,1.031-2.578,0.516-2.578-1.547c8.25-10.313,12.202-21.483,11.859-33.516	c1.374-1.716,2.405-1.547,3.094,0.516c0,3.44-0.347,7.734-1.031,12.891c4.125,6.534,9.108,11.001,14.953,13.406v-31.969h-17.531	C343.17,508.371,343.17,507.34,344.891,506.309z M362.938,487.746c2.063,2.063,3.436,4.472,4.125,7.219h20.625	c5.841,0.347,6.703,5.156,2.578,14.438c-1.72,1.031-2.578,0.516-2.578-1.547c3.094-6.188,2.747-9.45-1.031-9.797h-42.797	c-2.063,0-3.094,1.031-3.094,3.094v8.25c-1.031,1.72-2.063,1.72-3.094,0v-9.281c0-3.437,1.716-5.156,5.156-5.156h20.625	c-0.689-1.716-1.72-3.437-3.094-5.156C360.013,487.746,360.875,487.062,362.938,487.746z"/>
                <path d="M411.406,489.809c-0.347,2.409-1.031,4.987-2.063,7.734h9.281v-8.25c1.031-1.374,2.063-1.374,3.094,0v8.25h15.984	c1.716,1.031,1.716,2.063,0,3.094h-15.984v8.25h19.594c1.374,1.031,1.374,2.063,0,3.094h-19.594v8.25h10.313	c3.778,0,5.499,1.72,5.156,5.156v14.953c0.342,4.468-1.547,6.703-5.672,6.703c-2.409,0-4.814-0.516-7.219-1.547	c-1.031-1.378-0.689-2.409,1.031-3.094c2.747,1.374,4.641,1.89,5.672,1.547c2.405,0.343,3.436-0.862,3.094-3.609v-13.922	c0.342-2.063-0.689-3.094-3.094-3.094h-9.281v24.75c-1.031,1.374-2.063,1.374-3.094,0v-24.75h-9.281	c-2.063,0-3.094,1.031-3.094,3.094v20.625c-1.031,1.374-2.063,1.374-3.094,0v-21.656c0-3.437,1.716-5.156,5.156-5.156h10.313v-8.25	h-17.531c-1.378-1.031-1.378-2.063,0-3.094h17.531v-8.25h-10.313c-1.031,2.409-2.236,4.641-3.609,6.703	c-1.72,0.688-2.578,0.173-2.578-1.547c3.436-5.499,5.499-10.997,6.188-16.5C409.686,487.919,410.717,488.093,411.406,489.809z	 M457.813,491.355v50.531c0.342,4.81-1.547,7.219-5.672,7.219c-2.063,0-4.814-0.516-8.25-1.547	c-1.378-1.72-1.031-2.751,1.031-3.094c6.872,2.405,10.139,1.547,9.797-2.578v-50.531	C455.75,489.981,456.781,489.981,457.813,491.355z M447.5,494.449v41.25c-1.031,1.72-2.063,1.72-3.094,0v-41.25	C445.438,492.387,446.469,492.387,447.5,494.449z"/>
                <path d="M514.531,490.84c0-2.063,0.857-2.747,2.578-2.063c2.063,3.44,3.609,6.36,4.641,8.766h17.531	c1.716-3.094,2.92-5.841,3.609-8.25c1.716-1.374,2.747-1.031,3.094,1.031c-1.378,3.44-2.409,5.845-3.094,7.219h14.438	c2.063,1.031,2.063,2.063,0,3.094h-25.781v8.25h23.719c2.063,1.031,2.063,2.063,0,3.094h-23.719v7.219h26.813	c1.716,1.031,1.716,2.063,0,3.094h-56.719c-2.063-1.031-2.063-2.063,0-3.094h26.813v-7.219h-22.688	c-2.063-1.031-2.063-2.063,0-3.094h22.688v-8.25h-25.781c-1.721-1.031-1.721-2.063,0-3.094h15.469	C517.109,495.48,515.904,493.249,514.531,490.84z M528.453,525.387c1.031-1.716,2.063-1.716,3.094,0v4.125h26.297	c1.716,1.031,1.716,2.063,0,3.094h-25.781c8.592,7.219,17.357,11.859,26.297,13.922c1.716,1.374,1.547,2.405-0.516,3.094	c-9.628-2.063-18.909-6.876-27.844-14.438c-5.503,7.562-14.784,12.202-27.844,13.922c-2.063-0.688-2.063-1.72,0-3.094	c11.686-1.378,20.278-5.841,25.781-13.406h-24.75c-1.378-0.685-1.378-1.716,0-3.094h25.266V525.387z"/>
                <path d="M567.641,489.809h56.719c1.373,1.031,1.373,2.063,0,3.094h-56.719C566.263,491.871,566.263,490.84,567.641,489.809z	 M576.406,499.09h10.313c4.125,0,6.014,1.894,5.672,5.672v38.156c-0.347,5.499-4.641,6.53-12.891,3.094	c-1.031-2.063-0.516-3.094,1.547-3.094c5.498,2.747,8.25,2.578,8.25-0.516v-37.125c0.342-2.063-0.689-3.094-3.094-3.094h-9.281	c-2.063,0-3.094,1.031-3.094,3.094v41.766c-1.031,2.063-2.063,2.063-3.094,0v-42.797C570.734,500.81,572.623,499.09,576.406,499.09	z M578.469,509.402c3.436,7.565,5.841,13.922,7.219,19.078c-0.689,2.063-1.721,2.235-3.094,0.516	c-1.378-4.468-3.609-10.481-6.703-18.047C575.891,509.233,576.748,508.718,578.469,509.402z M603.734,499.09h11.344	c3.778,0,5.498,1.72,5.156,5.156v37.641c0.342,6.188-4.125,7.734-13.406,4.641c-1.378-1.72-1.031-2.751,1.031-3.094	c6.529,2.405,9.623,1.89,9.281-1.547v-36.609c0.342-2.063-0.689-3.094-3.094-3.094h-9.281c-2.063,0-3.094,0.862-3.094,2.578v42.797	c-1.031,1.716-2.063,1.716-3.094,0v-43.313C598.578,500.81,600.294,499.09,603.734,499.09z M604.25,510.434	c0.342-2.405,1.373-2.747,3.094-1.031c2.747,6.534,4.982,13.063,6.703,19.594c-0.689,2.063-1.721,2.235-3.094,0.516	C608.891,522.981,606.654,516.621,604.25,510.434z"/>
                <path d="M655.813,488.262c1.716,0.688,1.889,1.72,0.516,3.094c-1.721,0.347-4.641,0.862-8.766,1.547v12.375h11.859	c1.373,1.031,1.373,2.063,0,3.094h-11.344c4.125,5.845,7.561,11.69,10.313,17.531c-0.347,2.063-1.378,2.578-3.094,1.547	c-2.063-4.81-4.641-9.281-7.734-13.406v35.063c-1.031,1.374-2.063,1.374-3.094,0v-34.031c-2.752,6.534-6.703,13.063-11.859,19.594	c-2.063,0.688-2.925,0-2.578-2.063c5.156-5.841,9.797-13.922,13.922-24.234h-11.859c-1.378-1.031-1.378-2.063,0-3.094h12.375	v-11.859c-2.409,0.347-5.503,0.862-9.281,1.547c-1.378-0.685-1.547-1.716-0.516-3.094	C643.606,490.497,650.656,489.293,655.813,488.262z M672.828,490.324c-2.752,17.531-6.703,33.173-11.859,46.922	c-0.689,2.063-0.516,2.925,0.516,2.578c8.25-0.685,16.5-1.89,24.75-3.609c-1.031-4.81-2.925-11.171-5.672-19.078	c0-1.716,0.857-2.231,2.578-1.547c4.467,12.032,7.219,22.003,8.25,29.906c-0.689,1.716-1.721,1.89-3.094,0.516	c-0.347-2.409-0.689-4.641-1.031-6.703c-9.281,1.716-18.563,3.094-27.844,4.125c-2.409,0.343-3.268-0.862-2.578-3.609	c6.188-16.153,10.481-32.827,12.891-50.016C670.766,488.777,671.797,488.95,672.828,490.324z"/>		c6.188-16.153,10.481-32.827,12.891-50.016C670.766,488.777,671.797,488.95,672.828,490.324z"/>
                <path d="M726.969,488.262c2.063,3.094,3.436,5.672,4.125,7.734h26.297c1.716,1.031,1.716,2.063,0,3.094h-38.156	c-0.347,4.472-0.689,8.25-1.031,11.344h27.328c4.81,0,7.045,2.063,6.703,6.188c0.342,6.534-0.347,13.753-2.063,21.656	c-1.721,7.219-5.503,10.997-11.344,11.344c-6.877-0.347-12.549-1.547-17.016-3.609c-1.031-1.72-0.516-2.578,1.547-2.578	c5.498,2.063,10.654,3.094,15.469,3.094c4.125-0.347,6.872-3.44,8.25-9.281c1.716-7.562,2.404-14.265,2.063-20.109	c0.342-2.405-1.031-3.609-4.125-3.609h-27.328c-2.063,15.469-8.081,27.328-18.047,35.578c-2.063,0.343-2.752-0.347-2.063-2.063	c11.686-9.966,17.873-25.95,18.563-47.953h-18.563c-1.378-1.031-1.378-2.063,0-3.094H728c-1.031-2.063-2.236-4.125-3.609-6.188	C724.391,487.746,725.248,487.23,726.969,488.262z"/>
              </g>
            </g>

            <g id="wave"  transform='translate(0,150)'>
              <path d="M409.289,376.412c-3.488,0-6.324-2.889-6.324-6.438c0-3.551,2.836-6.438,6.324-6.438c3.487,0,6.324,2.888,6.324,6.438 S412.776,376.412,409.289,376.412z" className="ipsa-point-o"/>
              <path d="M446.029,376.485c-3.488,0-6.324-2.889-6.324-6.438c0-3.549,2.836-6.438,6.324-6.438c3.485,0,6.324,2.89,6.324,6.438 C452.354,373.597,449.515,376.485,446.029,376.485z" className="ipsa-point-i"/>
              <path d="M479.824,376.561c-3.487,0-6.325-2.888-6.325-6.438s2.838-6.44,6.325-6.44c3.485,0,6.322,2.892,6.322,6.44 C486.146,373.673,483.311,376.561,479.824,376.561z" className="ipsa-point-p"/>
              <path d="M513.914,376.646c-3.487,0-6.323-2.891-6.323-6.439s2.836-6.438,6.323-6.438c3.488,0,6.324,2.891,6.324,6.438 C520.24,373.757,517.402,376.646,513.914,376.646z" className="ipsa-point-s"/>
              <path d="M546.993,376.295c-3.487,0-6.323-2.89-6.323-6.438c0-3.552,2.836-6.439,6.323-6.439s6.323,2.889,6.323,6.439 C553.316,373.405,550.48,376.295,546.993,376.295z" className="ipsa-point-a"/>
            </g>
            <g id="suggest" transform='translate(0,200)'>
              <g className="circle circle15">
                <image overflow="visible"  width="250" height="250" xlinkHref="image/me_ex2.png"  transform="matrix(0.3976 0 0 0.3976 -77.752 236.3096)">
                </image>
              </g>
              <g className="circle circle1">
                <image overflow="visible"  width="250" height="250" xlinkHref="image/me_s1.png"  transform="matrix(0.3976 0 0 0.3976 -12.1265 234.7744)">
                </image>
              </g>
              <g className="circle circle2">
                <image overflow="visible"  width="250" height="250" xlinkHref="image/me_ex1.png"  transform="matrix(0.3976 0 0 0.4018 53.2324 234.4165)">
                </image>
              </g>
              <g className="circle circle3">
                <image overflow="visible"  width="250" height="250" xlinkHref="image/me_r1.png"  transform="matrix(0.3976 0 0 0.4018 119.3296 233.752)">
                </image>
              </g>     
              <g className="circle circle10">
                <image overflow="visible"  width="250" height="250" xlinkHref="image/me_ex2.png" transform="matrix(0.3976 0 0 0.4018 184.8862 234.7598)">
                </image>
              </g>
              <g className="circle circle9">
                <image overflow="visible"  width="250" height="250" xlinkHref="image/me_s2.png"  transform="matrix(0.3795 0 0 0.4001 250.7056 234.2671)">
                </image>
              </g>
              <g className="circle circle5">
                <image overflow="visible"  width="250" height="250" xlinkHref="image/me_s2.png"  transform="matrix(0.3795 0 0 0.4001 313.7642 235.3481)">
                </image>
              </g>
              <g className="circle circle8">
                <image overflow="visible"  width="250" height="250" xlinkHref="image/me_s2.png"  transform="matrix(0.3795 0 0 0.4001 377.3862 234.9258)">
                </image>
              </g>
              <g className="circle circle6">
                <image overflow="visible"  width="250" height="250" xlinkHref="image/me_r2.png"  transform="matrix(0.4012 0 0 0.4012 439.4204 234.6064)">
                </image>
              </g>
              <g className="circle circle7">
                <image overflow="visible"  width="250" height="250" xlinkHref="image/me_r2.png"  transform="matrix(0.4012 0 0 0.4012 505.876 235.4121)">
                </image>
              </g>
              <g className="circle circle13">
                <image overflow="visible"  width="250" height="250" xlinkHref="image/me_se1.png"  transform="matrix(0.3941 0 0 0.4064 570.9463 232.9028)">
                </image>
              </g>
              <g className="circle circle11">
                <image overflow="visible"  width="250" height="250" xlinkHref="image/me_ex2.png" transform="matrix(0.3976 0 0 0.3976 636.666 234.9033)">
                </image>
              </g>
              <g className="circle circle4">
                <image overflow="visible"  width="250" height="250" xlinkHref="image/me_r2.png"  transform="matrix(0.4012 0 0 0.4012 702.3232 235.1411)">
                </image>
              </g>
              <g className="circle circle12">
                <image overflow="visible"  width="250" height="250" xlinkHref="image/me_se1.png"  transform="matrix(0.3941 0 0 0.4104 768.9346 232.7275)">
                </image>
              </g>
              <g className="circle circle14">
                <image overflow="visible"  width="250" height="250" xlinkHref="image/me_b1.png"  transform="matrix(0.3496 0 0 0.3496 835.1582 247.7148)">
                </image>
              </g>
              <g className="circle circle16">
                <image overflow="visible"  width="250" height="250" xlinkHref="image/me_b1.png"  transform="matrix(0.3735 0 0 0.349 893.8613 247.7124)">
                </image>
              </g>    
              <g className="circle circle0">
                <image overflow="visible"  width="250" height="250" xlinkHref="image/me_b3.png"  transform="matrix(0.3907 0 0 0.3981 952.8193 235.9766)">
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