function toggleMenu() {
	var menuItems = document.getElementById("menu-items");
  
	if (menuItems.style.display === "block") {
	  menuItems.style.display = "none";
	} else {
	  menuItems.style.display = "block";
	}
  }
  
  function loadInformations() {
	window.location.href = "informations.html";
  }
  
  function loadGallery() {
	window.location.href = "gallery.html";
  }
  
  function loadVideos() {
	window.location.href = "videos.html";
  }
  
  function loadWallpapers() {
	window.location.href = "wallpapers.html";
  }
  
  document.getElementById("menu-items").addEventListener("click", function(e) {
	if (e.target && e.target.nodeName == "LI") {
	  var menuItem = e.target.textContent.toLowerCase();
	  if (menuItem === "informations") {
		loadInformations();
	  } else if (menuItem === "gallery") {
		loadGallery();
	  } else if (menuItem === "videos") {
		loadVideos();
	  } else if (menuItem === "wallpapers") {
		loadWallpapers();
	  }
	}
  });
  