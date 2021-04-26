export const constructChild = (e, that) => {
        e.preventDefault();
        let wasItMenuList = e.target.closest('.menu-list');        
        let data = getStorage('trimble-nav');
        let id = wasItMenuList.id;
        let children = fetchList(data, id)?.children;
        if(children.length > 0) {
            if(wasItMenuList.classList.contains('menu-list') && !wasItMenuList.classList.contains('open')  ) {
                wasItMenuList.classList.add('open');
                let list = (children.length>0) ? `<ul class="sub-menu-wrapper">${children.map((child) => {
                    return `<li><a href="">${child.text}</a></li>`; 
                }).join('')}</ul>` : '';
                wasItMenuList.innerHTML += list;
            } else {
                wasItMenuList.classList.remove('open');
                wasItMenuList.querySelector('.sub-menu-wrapper').remove();
            }
        } else {
            routeHandler(wasItMenuList, that);
        }
        
}

export const storageTest = function (){
    let test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
};

export const setStorage = (key, obj) => {
    if(storageTest() === true) {
        let data = JSON.stringify(obj);
        localStorage.setItem(key, data);
    }
}

export const getStorage = (key) => {
    if(storageTest() === true) {
        let getAppData = localStorage.getItem(key);
        let data = JSON.parse(getAppData);
        return data;        
    }
}
export const fetchList = (arr, id) => {
    const fetchedList = arr.find((list) => { return list.id === parseInt(id); });
    return fetchedList;
}
export const routeHandler = (e, that) => {
    let link = e.querySelector('.menu-list-link');
    let url = e.querySelector('.menu-list-link').dataset.url;
    if (link.target?.target === '_blank') { 
        return null 
    } else { 
        if (that.history?.push) {
            that.history.push(url);
        } else if (that.history?.navigate) {
            that.history.navigate([url], { relativeTo: that.history });
        } else {
            window.history.pushState('', '', url);
        } 
    };
}