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

  const changeSearcherClass= () => {
    input.classList.add('active');
  }

  const showSearcher = () => {
    input.classList.add('db');
    window.requestAnimationFrame(changeSearcherClass)
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

  const clickSearcher = () => {
    isOpenSearcher ? closeSearcher() : showSearcher();
  }

  const clickUserName = () => {
    userMenu.classList.toggle('active');
  }

  const closeUserMenu = ({ target }) => {
    if (!target.closest('.header-profile-name') && (!target.closest('.header-profile-menu'))) {
      userMenu.classList.remove('active');
    }
  }

  const bindEvents = () => {
    searchIcon.addEventListener('click', clickSearcher);
    userName.addEventListener('click', clickUserName);
    document.addEventListener('click', closeUserMenu);
  }

  const unBindEvents = () => {
    searchIcon.removeEventListener('click', clickSearcher);
    userName.removeEventListener('click', clickUserName);
    document.removeEventListener('click', closeUserMenu);
  }

  const init = () => {
    bindEvents();
  }

  const destroy = () => {
    unBindEvents();
  }

  init();

  return {
    init,
    destroy
  };
}

export default Header;
