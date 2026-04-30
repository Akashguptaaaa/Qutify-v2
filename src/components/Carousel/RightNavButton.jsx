function RightNavButton(props) {
  return (
    <button type="button" aria-label="next" {...props}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.5286 13.8047C5.26825 13.5444 5.26825 13.1223 5.5286 12.8619L10.3905 8L5.5286 3.13807C5.26825 2.87772 5.26825 2.45561 5.5286 2.19526C5.78895 1.93491 6.21105 1.93491 6.4714 2.19526L11.8047 7.5286C12.0651 7.78895 12.0651 8.21105 11.8047 8.4714L6.4714 13.8047C6.21105 14.0651 5.78895 14.0651 5.5286 13.8047Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}

export default RightNavButton;
