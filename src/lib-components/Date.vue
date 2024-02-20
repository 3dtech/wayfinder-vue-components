<template>
  <div class="wf-date">
    {{ date }}
  </div>
</template>

<script>
import dayjs from 'dayjs';


export default {
    props: {
		format: {type: String, default: "DD.MM" },
	},
    data() {
        return {
            time: new Date()
        }
    },
    mounted() {
        setTimeout(this.addDate, 1000);
        import('dayjs/locale/et').then(() => {
            console.log('locale.loaded');
            dayjs.locale("et");
        })
    },
    computed: {
        date() {
            return dayjs().locale("et").format(this.format);
        },
    },
    methods: {
        addDate() {
            console.log('addDate.locale', dayjs.locale());
            this.time = dayjs().locale("et").format(this.format);
            setTimeout(this.addDate, 60*1000);
        }
    }
}
</script>

<style>

</style>