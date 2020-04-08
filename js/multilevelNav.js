// 单例模式
class MultiNav {
    constructor(container, data) {
        // 导航容器
        this.container = container;
        // 导航数据
        this.data = data;
        // 控制js的选择器
        this.wrapperJs = 'MultiNav-wrapper-js';
        // wrapper元素
        this.wrapperDom;
        this.url = '';
        // 当前选中元素
        this.activeDom;
        // 当前选中文件层级
        this.level = 0;
        this.build();

    }
    build() {
        // 添加结构
        this.html();
        // 绑定事件
        this.bind();
    }
    html() {
        const html = [];
        html.push('<div class="MultiNav-wrapper-css ' + this.wrapperJs + '">');
        html.push(this.render().join('').trim());
        html.push('</div>');
        this.container.innerHTML = html.join('').trim();
        this.wrapperDom = this.container.querySelector('.' + this.wrapperJs);
        return this;
    }
    render() {
        const html = [];
        // 递归
        function recursion(children, type) {
            // 一级菜单样式不一样
            if (type === 'first') html.push('<ul class="MultiNav-level-equal MultiNav-level-first">');
            else html.push('<ul class="MultiNav-level-equal MultiNav-level-rest">');
            children.forEach(item => {
                if (!item.hidden) {
                    html.push('<li class="MultiNav-li-equal MultiNav-off">')
                    if (item.children) {
                        html.push('<h3 class="MultiNav-h3-equal" data-dirname="' + item.dirname + '">' + item.name + '</h3>')
                        recursion(item.children, '');
                    } else {
                        html.push('<h3 data-filename="' + item.filename + '" data-clickeble>' + item.name + '</h3>')
                    }
                    html.push('</li>')
                }
            })
            html.push('</ul>');
        }
        recursion(this.data.children, 'first');

        return html;
    }
    bind() {
        const lis = Array.from(this.wrapperDom.querySelectorAll('li'));
        const enter = (e) => {
            const current = e.currentTarget;
            // 打开隐藏的li
            current.classList.replace('MultiNav-off', 'MultiNav-on');
        };
        const leave = (e) => {
            const current = e.currentTarget;
            // 关闭隐藏的li
            current.classList.replace('MultiNav-on', 'MultiNav-off');
        }
        lis.forEach(item => {
            // 鼠标进入
            item.addEventListener('mouseenter', enter);
            // 鼠标离开
            item.addEventListener('mouseleave', leave);
        })
        const click = (e) => {
            const current = e.currentTarget;
            // 如果相等那么不能点击
            if (current === this.activeDom) return false;
            // 获取被点击文件目录
            let li, h3 = current, path = '';
            do {
                path = '/' + (h3.dataset.filename ? h3.dataset.filename + '.html' : h3.dataset.dirname) + path;
                li = h3.parentElement.parentElement.parentElement;
                h3 = li.querySelector('h3');
            }
            while (li !== this.wrapperDom)
            // 计算实际相对路径
            path = '../'.repeat(this.level) + path.replace(/^\//,'');
            debugger
            // 跳转该路径
            window.location.href = path;
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
        // 可点击h3
        const h3s = Array.from(this.wrapperDom.querySelectorAll('h3[data-clickeble]'))
        h3s.forEach(item => {
            item.addEventListener('click', click);
        })
    }
    active(filename) {
        // 当前选中h3
        this.activeDom = document.querySelectorAll('h3[data-filename=' + filename + ']');
        if (this.activeDom.length !== 1) throw new TypeError('filename is empty or replace');
        this.activeDom = this.activeDom[0];
        let h3 = this.activeDom;
        let li = null;
        do {
            h3.classList.add('MultiNav-active');
            li = h3.parentElement.parentElement.parentElement;
            h3 = li.querySelector('h3');
            h3.classList.add('MultiNav-active');
            // 记录层级
            this.level++;
        }
        while (li !== this.wrapperDom)

    }
    // 获取数据
    getData() {
        return this.data;
    }
}
