function LeftNavButton(props) {
  return (
    <button type="button" aria-label="previous" {...props}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.4714 2.19526C10.7318 2.45561 10.7318 2.87772 10.4714 3.13807L5.60951 8L10.4714 12.8619C10.7318 13.1223 10.7318 13.5444 10.4714 13.8047C10.2111 14.0651 9.78895 14.0651 9.5286 13.8047L4.19526 8.4714C3.93491 8.21105 3.93491 7.78895 4.19526 7.5286L9.5286 2.19526C9.78895 1.93491 10.2111 1.93491 10.4714 2.19526Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}

export default LeftNavButton;
