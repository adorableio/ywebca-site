var Site = {

  menuToggle: document.getElementById("menu-toggle"),
  menuScreen: document.getElementById("menu-screen"),
  menuItems: document.querySelectorAll("#menu-screen a"),

  init: function() {
    Site.bindUI();
  },

  bindUI: function() {
    Site.menuToggle.addEventListener("click", Site.toggleMenu);

    for (var i = 0; i < Site.menuItems.length; i++) {
      Site.menuItems[i].addEventListener("click", Site.handleMenuClick);
    }

  },

  toggleMenu: function() {
    Site.menuScreen.classList.toggle("open");
  },

  handleMenuClick: function() {
    Site.toggleMenu();
  }

};

Site.init();