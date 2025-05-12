
let tagS = document.querySelector(".main-tags")
let postS = document.querySelector('.posts');

let links = 'https://dummyjson.com/posts';
function Posts(url) {
    postS.innerHTML = " "
    fetch(url)
        .then((res) => { return res.json() })
        .then((data) => {
            let posts = data.posts;
            posts.map((post) => {
                let postTags = post.tags;
                postS.innerHTML += `
            <div class="post-card">
                <p class="post-content">${post.body}</p>
                <div class="post-tags">
                ${postTags.map((tag) => `<span class="tag">#${tag}</span>`).join(' ')}
                </div>
                <div class="data">
                    <div class="views">
                        <i class="fa-solid fa-eye"></i>
                        <span class="count">${post.views}</span>
                    </div>
                    <div class="likes">
                        <i class="fa-solid fa-heart"></i>
                        <span class="count">${post.reactions.likes}</span>
                    </div>
                    <div class="dislikes">
                        <i class="fa-solid fa-thumbs-down"></i>
                        <span class="count">${post.reactions.dislikes}</span>
                    </div>
                </div>
            </div>
        `;
            })

        });
}

Posts(links)

function getCategories() {
    fetch('https://dummyjson.com/posts/tags')
        .then((res) => { return res.json() })
        .then((data) => {
            data.map((tag) => {
                tagS.innerHTML += `
            <span class="main-tag" onclick="Posts('${tag.url}')">#${tag.slug}</span>
        `;
            })

        })
}
getCategories()

let search = document.querySelector(".search")
search.addEventListener("keyup", () => {
    let searchValue = search.value
    postS.innerHTML = " "
    let searchLink = `https://dummyjson.com/posts/search?q=${searchValue}`
    Posts(searchLink)

})