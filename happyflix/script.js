const btns = document.querySelectorAll('.btn');

const links = ['https://hdtoday.tv/movie/watch-avatar-hd-19690', 
'https://hdtoday.tv/movie/watch-avatar-the-way-of-water-hd-79936', 
'https://hdtoday.tv/movie/watch-iron-man-hd-19680',
'https://hdtoday.tv/movie/watch-iron-man-2-hd-19665',
'https://hdtoday.tv/movie/watch-iron-man-3-hd-19562',];

btns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    window.location.href = links[index];
  });
});

