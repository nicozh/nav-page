{
    let view = {
        el: '#search',
        template: `
        <form method="GET" target="_blank" id="form" name="s" action="https://www.bing.com/search">  
            <input type="text" id="q" name="q" autocomplete="on" value="">
            <input id='s-bing' type="button" class="button"  value="Bing搜索">
            <input id='s-google' type="button" class="button"  value="Google搜索">
        </form>
      `,
        init() {
            this.$el = document.querySelector(this.el)
            this.$el.innerHTML = this.template
            this.$text = document.querySelector('#q')
            this.$bing = document.querySelector('#s-bing')
            this.$google = document.querySelector('#s-google')
        }
    }
    let model = {
        data: {

        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.bindEvents()
        },
        bindEvents() {
            this.view.$bing.onclick = () => {
                console.log(this.view.$text.value)
                window.open('https://www.bing.com/search?q=' + this.view.$text.value, '')
            }
            this.view.$google.onclick = () => {
                window.open('https://www.google.com/search?q=' + this.view.$text.value, '')
            }
        }
    }
    controller.init(view, model)
}