const app = {
    show: new Event('show'),
    init: function () {
        history.replaceState({}, 'Login', '#Login');
        window.addEventListener('popstate', app.poppin);
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', app.nav);
        });
    },
    //when user clicks on a bitton or a link this function gets him to the right page
    nav: function (ev) {
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        let openTemplate = document.querySelector(`#${currentPage}`).content;
        const contentDiv = document.querySelector('#content');
        contentDiv.replaceChildren(openTemplate.cloneNode(true));
        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
    },
    //checkes what is the current page 
    poppin: function (ev) {
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#', '');
        console.log(document.querySelector(`#${hash}`).content);

        console.log(hash);
        if (hash === 'Login' || hash === 'Sign-Up' || hash === 'Todo') {
            document.getElementById(hash).dispatchEvent(app.show);
        }
        let openTemplate = document.querySelector(`#${hash}`).content;
        const contentDiv = document.querySelector('#content');
        contentDiv.replaceChildren(openTemplate.cloneNode(true));

    },

}
document.addEventListener('DOMContentLoaded', app.init);