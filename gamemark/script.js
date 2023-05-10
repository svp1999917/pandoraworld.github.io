const btns = document.querySelectorAll('.btn');

const links = ['https://apkpure.com/pubg-mobile-for-android/com.tencent.ig/download', 
'https://translate.google.lk/?sl=en&tl=si&op=translate', 
'https://apkpure.com/pubg-mobile-for-android'];

btns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    window.location.href = links[index];
  });
});

