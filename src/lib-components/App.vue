<template>
  <div class="wf-app" v-touch:start='onTouch' :class="{'wf-screensaving': screensaver}">
    <slot/>
  </div>
</template>

<script>
const urls = {
  api: {
    live: "//wayfinder-cdn.com/api",
    enterprise: "../../../api/",
    dev: "//api.3dwayfinder.com",
    snapshot: "../../../api/"
  },
  assets: {
    live: "https://wayfinder-cdn.com/shared/",
    dev: "//static.3dwayfinder.com/shared/",
    enterprise: "../../../shared/",
    snapshot: "../../../shared/"
  },
  js: {
    live: "https://wayfinder-cdn.com/",
    dev: "//static.3dwayfinder.com",
    enterprise: "../../../",
    snapshot: "../../../"
  }
}

export default {
    data () {
        return {
            lastClick: false,
            landscape: false,
			screensaver: false,
			maxInActivity: 30
        }
    },
    mounted () {
		this.resize();

		window.onresize = () => {
			this.resize();
		}

		this.$wayfinder.events.on("data-loaded", () => {
			this.maxInActivity = this.$wayfinder.settings.getInt("kiosk.max-inactivity", 30);
		})

		this.lastClick = setTimeout(() => { // Start screensaver
			this.$emit("screensaving");
			this.screensaver = true;
		}, this.maxInActivity * 1000);
	},
    methods: {
		onTouch (e) {
			clearTimeout(this.lastClick);
			this.$emit("touched", e);
            this.screensaver = false;
            this.$wayfinder.run();

			this.lastClick = setTimeout(() => { // Start screensaver
				this.$emit("screensaving");
                this.screensaver = true;
				this.$wayfinder.showKiosk();
				this.$wayfinder.restoreDefaultState();
				setTimeout(() => {
					this.$wayfinder.pause();
				}, 1000);

				this.$store.dispatch('wf/SET_RESET', Date.now());
				
			}, this.maxInActivity * 1000);
			return false;
		},
        resize () {
			let _l = window.matchMedia("(orientation: landscape)");
			let _pm = window.matchMedia("(max-height: 1024px) and (orientation: portrait)");
			let _lm = window.matchMedia("(max-width: 1024px) and (orientation: landscape)");
			this.landscape = _l ? _l.matches : false;
			let mobile = (_pm ? _pm.matches : false) || (_lm ? _lm.matches : false);
			this.$store.dispatch('wf/SET_LANDSCAPE', this.landscape);
			this.$store.dispatch('wf/SET_PORTRAIT', !this.landscape);
			this.$store.dispatch('wf/SET_MOBILE', mobile);
		},
		getURL(_env, type) {
			return urls[type][_env];
		},
		loadScript(url, callback) {
			var s = document.createElement('script');
			s.type = 'text/javascript';
			s.async = true;
			
			var x = document.getElementsByTagName('head')[0];
			x.appendChild(s);
			if (typeof callback == "function") {
				s.onload = callback;
				s.src = url;
			}
		}
    }
}
</script>

<style>

</style>