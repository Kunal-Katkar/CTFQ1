// Select the hidden button and the "show" button
let hiddenBtn = document.getElementById('openLinkBtn');



// Add a click event listener to the hidden button
hiddenBtn.addEventListener('click', () => {
    // Open Google in a new tab
    window.open('https://drive.google.com/file/d/1-MingRG4D294xIVFAyOy28QCFsObKMjT/view?usp=sharing', '_blank');
});
