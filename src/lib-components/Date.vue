<template>
  <div class="wf-date">
    {{ datestr }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

function loadScript(url, callback) {
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

export default {
    name: "Date",
    props: {
		format: {type: String, default: "DD.MM" },
	},
    data () {
        return {
            time: new Date(),
            locales: {}
        }
    },
    mounted() {
        setTimeout(this.addDate, 1000);
        if(typeof dayjs === "undefined") {
            console.warn("WFDate dayjs is not loaded")
        }
        this.loadLocale(this.language);
    },
    computed: {
        ...mapState('wf', ['language']),
        datestr() {
            if (typeof dayjs !== "undefined") {
                return dayjs(this.time).format(this.format);
            }
            else {
                return this.time.toLocaleString(this.language, {"dateStyle": "long"});
            }
            
        },
    },
    watch: {
		language () {
            this.time = new Date();
			if (typeof dayjs !== "undefined") {
                if(!this.locales[this.language]) {
                    this.loadLocale(this.language);
                }
				dayjs.locale(this.language);
			}
		},
    },
    methods: {
        addDate() {
            this.time = new Date();
            setTimeout(this.addDate, 60*1000);
        },
        loadLocale (locale) {
            loadScript(this.$wayfinder.options.assetsLocation + "/dayjs/locale/" + locale + ".js", (a) => {
                this.locales[locale] = true;
                if (this.language == locale && typeof dayjs !== "undefined") {
                    console.log('locale.set', locale, this.language, "dayjs", typeof dayjs)
                    dayjs.locale(this.language);
                }
            });
        }
    }
}
</script>

<style>

</style>