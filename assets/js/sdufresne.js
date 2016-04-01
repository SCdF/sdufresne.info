'use strict';

var sdufresne = {

  greeting: function() {
    var hours = new Date().getHours();
    switch (true) {
      case (hours < 12): return "Good Morning!";
      case (hours < 18): return "Good Afternoon!";
      default: return "Good Evening!";
    }
  },

  reverse: function(s) {
    return s.split("").reverse().join("");
  },

  title: function() {
    var jobTitles = [
      'software developer',
      'software engineer',
      'developer',
      'coder',
      'programmer',
      ];

    //TODO: do something with this
    var sillyJobTitles = [
      'software craftsman',
      'software imagineer',
      'code craftsman',
      'code monkey',
    ];

    return jobTitles[Math.floor(Math.random()*jobTitles.length)];
  }
};
