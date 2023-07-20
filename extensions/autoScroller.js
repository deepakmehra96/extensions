const autoScrollGit = () => {
  chrome.storage.local.get('applicationIsOn', function(result) {
    var isOn = result.applicationIsOn;
    if(isOn){
      const answerDivs = document.querySelectorAll('.js-timeline-item .js-comment-container');

      // Find the div with the most votes
      let maxVotes = 0;
      let mostLikedDiv = null;
      answerDivs.forEach(div => {
        const reactionItems = div.querySelectorAll('.social-reaction-summary-item');
        let voteCount = 0;
        reactionItems.forEach(item => {
          voteCount += parseInt(item.querySelector('.js-discussion-reaction-group-count')?.textContent.trim(), 10);
        });
        if (voteCount > maxVotes) {
          maxVotes = voteCount;
          mostLikedDiv = div;
        }
      });

      // Print the position of the most liked div
      if (mostLikedDiv) {
        const position = mostLikedDiv.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: position - 120,
          behavior: 'smooth'
        });
        console.log(`The most liked answer is at position ${position}px from the top of the viewport.`);
      } else {
        console.log('No answers found.');
      }
    }
  });
}


window.onload = async function() {

  (function initiate() {
    autoScrollGit()
  })();

  chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    // const counts = document.querySelectorAll('.js-discussion-reaction-group-count')
    // const counts = document.querySelectorAll('.js-timeline-item').forEach(element => {
    //     element
    // })

    // console.log(counts,"countscountscountscounts")

    // const reactionElements = document.querySelectorAll('.social-reaction-summary-item');

    // // Initialize variables to store the maximum count and corresponding element
    // let maxCount = -Infinity;
    // let maxElement;
    
    // // Iterate through each element and find the maximum count and corresponding element
    // for (let i = 0; i < reactionElements.length; i++) {
    //   const countElement = reactionElements[i].querySelector('.js-discussion-reaction-group-count');
    //   const count = parseInt(countElement.textContent.replace(',', ''));
    //   if (count > maxCount) {
    //     maxCount = count;
    //     maxElement = reactionElements[i];
    //   }
    // }
    
    // // Output the most reacted element and its count
    // console.log('Most reacted element:', maxElement);
    // console.log('Count:', maxCount);

    switch (request.action) {
      case 'BUTTON_CLICK':
        if (request.payload === 'Enable') {
          chrome.storage.local.set({ applicationIsOn: false });
        } else {
          chrome.storage.local.set({ applicationIsOn: true });
          autoScrollGit()
        }
        break;
      default:
        break;
    }

  
  })

}
