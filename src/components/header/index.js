import {selectRole} from '../../helpers';

function Header(context) {
  const body = document.body;
  const headerTitle = selectRole('header/title', context);
  const nav = selectRole('header/nav', context);
  const input = selectRole('header/input', context);
  const searchIcon = document.getElementById('search-icon', context);
  const userName = selectRole('header/userName', context);
  const userMenu = selectRole('header/userMenu', context);
  let isOpenBurger, isOpenSearcher = false;

  const burger = selectRole('header/burger', context);

  const showBurger = () => {
    burger.classList.add('active');
    nav.classList.add('active');
    nav.classList.add('white');
    nav.classList.remove('dn');
    body.classList.add('black');
    body.classList.add('lock');
    headerTitle.classList.add('white');
    input.classList.remove('active');
    isOpenBurger = true;
  };

  const closeBurger = () => {
    burger.classList.remove('active');
    nav.classList.remove('active');
    nav.classList.remove('white');
    body.classList.remove('black');
    body.classList.remove('lock');
    headerTitle.classList.remove('white');
    searchIcon.classList.remove('active');
    isOpenBurger = false;
  };


  burger.addEventListener('click', function () {
    isOpenBurger ? closeBurger() : showBurger();
  });

  const showSearcher = () => {
    input.classList.add('active');
    searchIcon.classList.add('active');
    nav.classList.add('dn');
    isOpenSearcher = true;
  };

  const closeSearcher = () => {
    input.classList.remove('active');
    searchIcon.classList.remove('active');
    nav.classList.remove('dn');
    isOpenSearcher = false;
  };

  searchIcon.addEventListener('click', function () {
    isOpenSearcher ? closeSearcher() : showSearcher();
  });

  userName.addEventListener('click', () => {
    userMenu.classList.toggle('active');
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.header-profile-name') && (!event.target.closest('.header-profile-menu'))) {
      userMenu.classList.remove('active');
    }
  });
}

export default Header;
