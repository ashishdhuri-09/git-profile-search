const APIURL = "https://api.github.com/users/";        //  add apiurl to get value of url

const main = document.getElementById("main");    // calling fun main
const form = document.getElementById("form");     // call fun form
const search = document.getElementById("search");  // call to search fun

getUser("ashishdhuri-09");     // git username to get default on screen

async function getUser(username) {            //fun shows user name data by searching url
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();

    createUserCard(respData);

    getRepos(username);
}

async function getRepos(username) {         // fun for get repo of user
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();

    addReposToCard(respData);
}

function createUserCard(user) {         // fun for ui that show all information of user like bio follower etc 
    const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;  //add to the main form of html
}

function addReposToCard(repos) {           //this for serach user 
    const reposEl = document.getElementById("repos");

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}

form.addEventListener("submit", (e) => {   //arrow fun to search the user through search box
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = "";   //keep value null that can add by search user
    }
});