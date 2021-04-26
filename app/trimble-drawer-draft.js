export class TrimbleDrawer extends HTMLElement {
    constructor() {
        super();
        this.history = null;
        this.data = (this.getAttribute('data') != "null") ? this.getAttribute('data') : getData();
        this.mountRef = this.getAttribute('mountRef');
        this.pushRef = this.getAttribute('pushRef');
        // this.attachShadow({ mode: 'open' });
        // this.addEventListener('drawerChanged', (e) => {
        //     this.history = e.detail.history;
        //     if (e.detail.button) {
        //         this.shadowRoot.querySelector('.drawer-placement-left').show();
        //     } else {
        //         this.shadowRoot.querySelector('.drawer-placement-left').hide();
        //     }
        // });
        // this.shadowRoot.appendChild(template.content.cloneNode(true));
        // this.innerHTML = template;   
        setStorage('trimble-nav', this.data); 
        // this.querySelector('ul').innerHTML = this.data.map((item) => {
        //     return `<li id=${item.id} class="menu-list"><a href=${item.url} data-url=${item.url} class="menu-list-link">
        //         ${item.icon ?
        //             `<span class=${item.icon.class}></span>`
        //             : ``}
        //     <span class="label">${item.text}</span> 
        //     ${item.children.length > 0 ?
        //             `<span class="trimble-nav-arrow-down"></span>`
        //             : ``}
        //     </a></li>`
        //     // return `<li><a data-list='menu' target=${(item.self) ? '_self' : '_blank'} data-url=${item.url} href=${item.url}>${item.text}</a></li>`
        // }).join('');        
    }
    connectedCallback() {
        this.innerHTML = template;   
        this.querySelector('ul').innerHTML = this.data.map((item) => {
            return `<li id=${item.id} class="menu-list"><a href=${item.url} data-url=${item.url} class="menu-list-link">
                ${item.icon ?
                    `<span class=${item.icon.class}></span>`
                    : ``}
            <span class="label">${item.text}</span> 
            ${item.children.length > 0 ?
                    `<span class="trimble-nav-arrow-down"></span>`
                    : ``}
            </a></li>`
            // return `<li><a data-list='menu' target=${(item.self) ? '_self' : '_blank'} data-url=${item.url} href=${item.url}>${item.text}</a></li>`
        }).join('');   
        this.querySelector('#hamburger').addEventListener('click', (e) => {
            let retrieveMini = e.currentTarget.closest('.trimble-drawer');
            if (retrieveMini.classList.contains('mini')) {
                retrieveMini.classList.remove('mini')
            } else {
                retrieveMini.classList.add('mini')
            }
            document.querySelector(this.pushRef).style = `left: ${document.querySelector('.trimble-drawer').offsetWidth}px; width: calc(100% - ${document.querySelector('.trimble-drawer').offsetWidth}px)`;
            
        });
        this.querySelector('.menu').addEventListener('click', (e) => constructChild(e, this));
        //     this.shadowRoot.querySelector('ul').addEventListener('click', (e) => {
                // if (e.target.target === '_blank') { 
                //     return null 
                // } else { 
                //     e.preventDefault();
                //     if (this.history?.push) {
                //         this.history.push(e.target.dataset.url);
                //     } else if (this.history?.navigate) {
                //         this.history.navigate([e.target.dataset.url], { relativeTo: this.history });
                //     } else {
                //         window.history.pushState('', '', e.target.dataset.url);
                //     } 
                // };
        //         console.log('clicked', e.target.dataset.list === 'menu');

        //         this.shadowRoot.querySelector('.drawer-placement-left').hide();

        //     })
    }
}


const mountComponent = (mountContainer, pushContainer, data = getData()) => {
    window.pushContainer = pushContainer;
    const el = document.querySelector(mountContainer);
    el.appendChild(new TrimbleDrawer(data));    
    document.querySelector(window.pushContainer).style = `left: ${document.querySelector('.trimble-drawer').offsetWidth}px; width: calc(100% - ${document.querySelector('.trimble-drawer').offsetWidth}px)`;
}
window.mountComponent = mountComponent;