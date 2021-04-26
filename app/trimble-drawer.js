import { template } from './template';
import { setStorage, constructChild } from './util';
const getData = () => {
    let jsonData = require('./json/data.json');
    return jsonData.data;
};
import './styles/styles.scss';
export class TrimbleDrawer extends HTMLElement {
    constructor() {
        super();
        this.history = null;
        this.data = (this.getAttribute('data') != "null") ? this.getAttribute('data') : getData();
        this.mountRef = this.getAttribute('mountRef');
        this.pushRef = this.getAttribute('pushRef');
        setStorage('trimble-nav', this.data);
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
    }
}