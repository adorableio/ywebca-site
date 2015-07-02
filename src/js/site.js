'use strict';

var Site = {

  menuToggle: document.getElementById('menu-toggle'),
  menuScreen: document.getElementById('menu-screen'),
  menuItems: document.querySelectorAll('#menu-screen a'),

  init: function() {
    Site.bindUI();
  },

  bindUI: function() {
    Site.menuToggle.addEventListener('click', Site.toggleMenu);

    [].forEach.call(Site.menuItems, (item) => {
      item.addEventListener('click', Site.handleMenuClick);
    });

  },

  toggleMenu: function() {
    Site.menuScreen.classList.toggle('open');
  },

  handleMenuClick: function() {
    Site.toggleMenu();
  }

};

Site.init();
