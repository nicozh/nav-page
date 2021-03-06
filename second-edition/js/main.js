// 1.初始化数据
var keys = {
    '0': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',],
    '1': ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    '2': ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    '3': ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    'length': 4,
}
var hash = {
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
    j: 'jirengu.com',
    a: 'acfun.tv',
    z: 'zhihu.com',
    x: 'xiedaimala.com',
    b: 'bilibili.com',
    m: 'meituan.com',
}
//取出LocalStorage中的bak的hash,并覆盖原始hash
var hashInLocalStorage = getFromLocalStorage('bak')

function getFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name) || 'null');
}
//工具函数创建标签
function tag(tagName) {
    return document.createElement(tagName)
}

if (hashInLocalStorage) {
    hash = hashInLocalStorage
}

function createSpan(textContent) {
    var span = tag('span')
    span.textContent = textContent
    span.className = "text"
    return span
}
function createButton(id) {
    //在<kbd>里面加编辑<button>
    var btnE = tag('button')
    btnE.textContent = 'E'
    btnE.className = 'Edit'
    btnE.id = id    //为每个button添加id

    //点击添加网址
    btnE.onclick = function (shiwo) {
        var btn2 = shiwo['target']
        var key = btn2['id']       //获取对应按钮的id
        var x = prompt('请输入网址')              //保存网址
        hash[key] = x                        //改变hash对应的网址
        localStorage.setItem('bak', JSON.stringify(hash))
        //  console.log(hash)
        //获取输入网址的图标
        var img2 = btn2.previousSibling
        img2.src = "http://" + x + "/favicon.ico"
        img2.onerror = function (xx) {
            xx.target.src = "//i.loli.net/2017/11/14/5a09fd039d5e1.png"
        }
    }
    return btnE
}
function createButton1(id) {
    //添加删除按钮
    var btnD = tag('button')
    btnD.textContent = 'D'
    btnD.className = 'Delete'
    // btnD.id=id   

    //点击删除
    btnD.onclick = function (e) {
        key = e["target"]['previousSibling']["id"]
        console.log(key)
        delete hash[key]
        localStorage.setItem('bak', JSON.stringify(hash))
    }
    return btnD
}
function createImg(website) {
    //添加图标
    var img = tag("img")
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
}

//2.遍历keys,生成kbd
for (var index = 0; index < keys['length']; index = index + 1) {
    var div1 = tag('div')//在onediv里面加<div>

    var row = keys[index]

    for (var index2 = 0; index2 < row['length']; index2 = index2 + 1) {
        var kbd = tag('kbd')//在div里面加<kbd>

        //kbd里添加span
        var span = createSpan(row[index2])

        //在<kbd>里面加编辑<button>   
        var btnE = createButton(row[index2])

        //添加删除按钮
        var btnD = createButton1(row[index2])

        //添加图标
        var img = createImg(hash[row[index2]])

        kbd.appendChild(img)
        kbd.appendChild(btnE)
        kbd.appendChild(btnD)
        kbd.appendChild(span)

        div1.appendChild(kbd)
    }
    onediv.appendChild(div1)
}
//监听用户键盘
document.onkeypress = function (e) {
    var key = e['key']            //获取对应hash
    var website = hash[key]
    if(website){
        window.open('http://' + website, '_blank')//新窗口打开页面
    }
}