
let $body

if (typeof document !== `undefined`) {
    $body = document.querySelector('html');
}

export default {
    isFirefox: () => {
        if (typeof window === 'undefined') return false

        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1
    },
    scrollPosition: 0,
    instances: [

    ],
    enable(item) {
        if (this.isFirefox) return null

        this.scrollPosition = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0)
        this.instances.push(item)
        $body.style.overflow = 'hidden';
        $body.style.position = 'fixed';
        $body.style.top = `-${this.scrollPosition}px`;
        $body.style.width = '100%';
    },
    disable(item) {
        if (this.isFirefox) return null

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