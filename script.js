const channel = "sitting-on-a-memory"; // Your channel name

// Fetch content from the Are.na channel
fetch('https://api.are.na/v2/channels/' + channel + '/contents')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log("API Response:", data); // Log API response for debugging
        const posts = data.contents.reverse(); // Get latest posts, most recent first

        if (posts.length === 0) {
            console.log("No content found in this channel.");
            return;
        }

        const contentContainer = document.getElementById("content-container");

        // Get the newest post (first one in the reversed array)
        const latestPost = posts[0];

        const postBox = document.createElement("div");
        postBox.classList.add("post-box");

        // Handle text blocks
        if (latestPost.class === "Text" && latestPost.content) {
            const textElement = document.createElement("p");
            textElement.textContent = latestPost.content;
            postBox.appendChild(textElement);
        }

        // Handle image blocks
        if (latestPost.image && latestPost.image.original.url) {
            const imgElement = document.createElement("img");
            imgElement.setAttribute("src", latestPost.image.original.url);
            postBox.appendChild(imgElement);
        }

        // Handle link blocks
        if (latestPost.class === "Link" && latestPost.source && latestPost.source.url) {
            const linkElement = document.createElement("a");
            linkElement.setAttribute("href", latestPost.source.url);
            linkElement.textContent = latestPost.title ? latestPost.title : latestPost.source.url;
            postBox.appendChild(linkElement);
        }

        // Append the post container to the content container
        contentContainer.appendChild(postBox);

        // Get the author's username and the posted time
        const authorUsername = latestPost.user ? latestPost.user.username : "Unknown User";
        const postTime = latestPost.created_at ? new Date(latestPost.created_at).toLocaleString() : "Unknown Time";

        // Create the "Added By" text
        const addedByElement = document.getElementById("added-by");
        addedByElement.textContent = `Added by: ${authorUsername} on ${postTime}`;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });


    // Array of background images
const backgrounds = [
    "background1.jpg", // Your image paths (ensure the images are available)
    "background2.jpg",
    "background3.jpg",
    // Add more image paths here as you upload more images
    "background4.jpg",
    "background5.jpg",
    "background6.jpg",
    "background7.jpg",
    "background8.jpg",
    "background9.jpg",
    "background10.jpg"
    // Add up to 20 or more images as needed
];

// Function to set a random background from the array
function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    document.body.style.backgroundImage = `url(${backgrounds[randomIndex]})`;
}

// Set initial background on load
setRandomBackground();

// Add click event listener to shuffle the background when the user clicks anywhere on the page
document.body.addEventListener('click', setRandomBackground);

