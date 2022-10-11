export const scrollToPosition = (position) => {
  window.scrollTo({ top: position, behavior: 'smooth' });
};

export const disableScroll = (isMenuOpen) => {
  if (isMenuOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
};
