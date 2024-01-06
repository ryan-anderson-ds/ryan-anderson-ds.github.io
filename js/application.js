// Your JavaScript

const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.content');
document.querySelector('button').onclick = function () {
  sidebar.classList.toggle('sidebar_small');
  mainContent.classList.toggle('main-content_expanded')
}
