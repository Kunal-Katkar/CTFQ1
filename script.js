// Select the hidden button and the "show" button
let hiddenBtn = document.getElementById('openLinkBtn');



// Add a click event listener to the hidden button
hiddenBtn.addEventListener('click', () => {
    // Open Google in a new tab
    window.open('https://image-site-one.vercel.app/', '_blank');
});
