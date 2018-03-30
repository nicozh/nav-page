{
    let view = {
        el: '#onediv',
        init() {
            this.$onediv = document.querySelector(this.el)
        }
    }
    let model = {
        keys: {
            '0': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',],
            '1': ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
            '2': ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            '3': ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
            'length': 4,
        },
        hash: {
            3: '360.com',
            5: '51job.com',
            q: 'qq.com',
            w: 'weibo.com',
            e: 'ele.me',
            r: 'renren.com',
            t: 'tmall.com',
            y: 'youtube.com',
            u: 'freebuff.com',
            i: 'imooc.com',
            o: 'office.com',
            p: 'photoshop.com',
            j: 'jd.com',
            a: 'acfun.tv',
            d: 'douban.com',
            z: 'zhihu.com',
            x: 'xiaomi.com',
            b: 'bilibili.com',
            m: 'meituan.com',
            v: 'vuejs.org',
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.getFromLocalStorage()
            this.createKbd()
            this.bindEvents()
        },
        getFromLocalStorage() {
            let hashInLocalStorage = JSON.parse(localStorage.getItem('bak') || 'null');
            if (hashInLocalStorage) {
                this.model.hash = hashInLocalStorage
            }
        },
        tag(tagName) {
            return document.createElement(tagName)
        },
        createSpan(textContent) {
            let span = this.tag('span')
            span.textContent = textContent
            span.className = "text"
            return span
        },
        createButton(id) {
            //在<kbd>里面加编辑<button>
            let btnE = this.tag('button')
            btnE.textContent = 'E'
            btnE.className = 'Edit'
            btnE.id = id    //为每个button添加id

            //点击添加网址
            btnE.onclick = (e) => {
                let btn2 = e.target
                let key = btn2['id']       //获取对应按钮的id
                let x = prompt('请输入网址')              //保存网址
                this.model.hash[key] = x                        //改变hash对应的网址
                localStorage.setItem('bak', JSON.stringify(this.model.hash))
                //获取输入网址的图标
                let img2 = btn2.previousSibling
                img2.src = "//" + x + "/favicon.ico"
                img2.onerror = function (xx) {
                    xx.target.src = "//i.loli.net/2017/11/14/5a09fd039d5e1.png"
                }
            }
            return btnE
        },
        createButton1(id) {
            //添加删除按钮
            let btnD = this.tag('button')
            btnD.textContent = 'D'
            btnD.className = 'Delete'

            //点击删除
            btnD.addEventListener('click', function (e) {
            })
            btnD.onclick = (e) => {
                key = e.target.previousSibling.id
                delete this.model.hash[key]
                localStorage.setItem('bak', JSON.stringify(this.model.hash))
            }
            return btnD
        },
        createImg(website) {
            //添加图标
            let img = this.tag("img")
            if (website) {
                img.src = "http://" + website + "/favicon.ico"
            } else {
                img.src = "//i.loli.net/2017/11/14/5a09fd039d5e1.png"
            }
            //加载出错替换
            img.onerror = function (xxx) {
                xxx.target.src = "//i.loli.net/2017/11/14/5a09fd039d5e1.png"
            }
            return img
        },
        createKbd() {
            for (let i = 0; i < this.model.keys.length; i++) {
                let div1 = this.tag('div')//在onediv里面加<div>

                let row = this.model.keys[i]

                row.map((ele, index2) => {
                    let kbd = this.tag('kbd')//在div里面加<kbd>

                    //kbd里添加span
                    let span = this.createSpan(row[index2])

                    //在<kbd>里面加编辑<button>   
                    let btnE = this.createButton(row[index2])

                    //添加删除按钮
                    let btnD = this.createButton1(row[index2])

                    //添加图标
                    let img = this.createImg(this.model.hash[row[index2]])

                    kbd.appendChild(img)
                    kbd.appendChild(btnE)
                    kbd.appendChild(btnD)
                    kbd.appendChild(span)

                    div1.appendChild(kbd)
                })
                this.view.$onediv.appendChild(div1)
            }
        },
        bindEvents() {
            var isSearch = false
            var search = document.querySelector('#q')
            search.addEventListener('focus', function (e) {
                isSearch = true
            }, true)
            search.addEventListener('blur', function () {
                isSearch = false
            }, true)

            document.onkeypress = (e) => {  //监听键盘
                key = e['key']            //获取对应hash
                website = this.model.hash[key]
                if (website === undefined && isSearch === false) {
                    alert('请先设置此快捷键')
                } else {
                    if (!isSearch) {
                        window.open('http://' + website, '_blank')//新窗口打开页面
                    }
                }

            }
        }

    }
    controller.init(view, model)
}