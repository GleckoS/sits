
let $body

if (typeof document !== `undefined`) {
    $body = document.querySelector('html');
}

export default {
    scrollPosition: 0,
    instances: [

    ],
    enable(item) {
        this.scrollPosition = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0)
        this.instances.push(item)
        $body.style.overflow = 'hidden';
        $body.style.position = 'fixed';
        $body.style.top = `-${this.scrollPosition}px`;
        $body.style.width = '100%';
    },
    disable(item) {
        if (this.instances.includes(item)) {
            this.instances = this.instances.filter(el => el !== item)
            if (!this.instances.length && item) {
                $body.style.removeProperty('overflow');
                $body.style.removeProperty('position');
                $body.style.removeProperty('top');
                $body.style.removeProperty('width');
                window.scrollTo(0, this.scrollPosition);
            }
        }
    }
}