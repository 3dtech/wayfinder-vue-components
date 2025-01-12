<template>
    <div v-if="path" class="wf-path">
        <slot name="icons">
            <svg
                aria-hidden="true"
                style="position: absolute; width: 0; height: 0; overflow: hidden"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                <symbol id="path-turn-right" viewBox="0 0 32 32">
                    <path style="fill: currentColor" d="M20.9062 0.124997C21.4562 -0.112504 22.0937 -2.8731e-06 22.5312 0.412497L31.5312 8.9125C31.8312 9.19375 32 9.5875 32 10C32 10.4125 31.8312 10.8062 31.5312 11.0875L22.5312 19.5875C22.0937 20 21.4562 20.1125 20.9062 19.875C20.3563 19.6375 20 19.0937 20 18.5L20 13L8 13C6.89375 13 6 13.8937 6 15L6 20C6 21.1062 5.10625 22 4 22L2 22C0.89375 22 -3.90671e-08 21.1062 -8.74228e-08 20L-3.0598e-07 15C-4.99129e-07 10.5812 3.58125 7 8 7L20 7L20 1.5C20 0.899997 20.3562 0.362496 20.9062 0.124997Z"/>
                </symbol>
                <symbol id="path-use-elevator" viewBox="0 0 24 24">
                    <path style="fill: currentColor" d="M6.22031 0.220312L3.22031 3.22031C3.00469 3.43594 2.94375 3.75937 3.05625 4.03594C3.16875 4.3125 3.44531 4.5 3.75 4.5H9.75C10.0547 4.5 10.3266 4.31719 10.4438 4.03594C10.5609 3.75469 10.4953 3.43125 10.2797 3.22031L7.27969 0.220312C6.98906 -0.0703125 6.51094 -0.0703125 6.22031 0.220312ZM3 6C1.34531 6 0 7.34531 0 9V21C0 22.6547 1.34531 24 3 24H21C22.6547 24 24 22.6547 24 21V9C24 7.34531 22.6547 6 21 6H3ZM7.5 10.5C8.09674 10.5 8.66903 10.7371 9.09099 11.159C9.51295 11.581 9.75 12.1533 9.75 12.75C9.75 13.3467 9.51295 13.919 9.09099 14.341C8.66903 14.7629 8.09674 15 7.5 15C6.90326 15 6.33097 14.7629 5.90901 14.341C5.48705 13.919 5.25 13.3467 5.25 12.75C5.25 12.1533 5.48705 11.581 5.90901 11.159C6.33097 10.7371 6.90326 10.5 7.5 10.5ZM3.75 18.75C3.75 17.5078 4.75781 16.5 6 16.5H9C10.2422 16.5 11.25 17.5078 11.25 18.75V19.5C11.25 20.3297 10.5797 21 9.75 21H5.25C4.42031 21 3.75 20.3297 3.75 19.5V18.75ZM12.75 18.75C12.75 17.5078 13.7578 16.5 15 16.5H18C19.2422 16.5 20.25 17.5078 20.25 18.75V19.5C20.25 20.3297 19.5797 21 18.75 21H14.25C13.4203 21 12.75 20.3297 12.75 19.5V18.75ZM14.25 12.75C14.25 12.4545 14.3082 12.1619 14.4213 11.889C14.5343 11.616 14.7001 11.3679 14.909 11.159C15.1179 10.9501 15.366 10.7843 15.639 10.6713C15.9119 10.5582 16.2045 10.5 16.5 10.5C16.7955 10.5 17.0881 10.5582 17.361 10.6713C17.634 10.7843 17.8821 10.9501 18.091 11.159C18.2999 11.3679 18.4657 11.616 18.5787 11.889C18.6918 12.1619 18.75 12.4545 18.75 12.75C18.75 13.0455 18.6918 13.3381 18.5787 13.611C18.4657 13.884 18.2999 14.1321 18.091 14.341C17.8821 14.5499 17.634 14.7157 17.361 14.8287C17.0881 14.9418 16.7955 15 16.5 15C16.2045 15 15.9119 14.9418 15.639 14.8287C15.366 14.7157 15.1179 14.5499 14.909 14.341C14.7001 14.1321 14.5343 13.884 14.4213 13.611C14.3082 13.3381 14.25 13.0455 14.25 12.75ZM16.7203 4.27969C17.0109 4.57031 17.4891 4.57031 17.7797 4.27969L20.7797 1.27969C20.9953 1.06406 21.0562 0.740625 20.9437 0.464062C20.8312 0.1875 20.5547 0 20.25 0H14.25C13.9453 0 13.6734 0.182812 13.5563 0.464062C13.4391 0.745312 13.5047 1.06875 13.7203 1.27969L16.7203 4.27969Z" fill="#0F417C"/>
                </symbol>
                <symbol id='path-turn-left'  viewBox="0 0 32 22">
                    <path style="fill: currentColor" d="M11.0938 0.124997C10.5438 -0.112504 9.90625 -2.8731e-06 9.46875 0.412497L0.468751 8.9125C0.168751 9.19375 5.42568e-07 9.5875 5.24537e-07 10C5.06506e-07 10.4125 0.168751 10.8062 0.46875 11.0875L9.46875 19.5875C9.90625 20 10.5438 20.1125 11.0938 19.875C11.6437 19.6375 12 19.0937 12 18.5L12 13L24 13C25.1063 13 26 13.8937 26 15L26 20C26 21.1062 26.8938 22 28 22L30 22C31.1063 22 32 21.1062 32 20L32 15C32 10.5812 28.4188 7 24 7L12 7L12 1.5C12 0.899997 11.6438 0.362496 11.0938 0.124997Z" fill="#0F417C"/>
                </symbol>
                <symbol id='path-turn-around' style="rotate: -90deg;" viewBox="0 0 32 22">
                    <path style="fill: currentColor" d="M11.0938 0.124997C10.5438 -0.112504 9.90625 -2.8731e-06 9.46875 0.412497L0.468751 8.9125C0.168751 9.19375 5.42568e-07 9.5875 5.24537e-07 10C5.06506e-07 10.4125 0.168751 10.8062 0.46875 11.0875L9.46875 19.5875C9.90625 20 10.5438 20.1125 11.0938 19.875C11.6437 19.6375 12 19.0937 12 18.5L12 13L24 13C25.1063 13 26 13.8937 26 15L26 20C26 21.1062 26.8938 22 28 22L30 22C31.1063 22 32 21.1062 32 20L32 15C32 10.5812 28.4188 7 24 7L12 7L12 1.5C12 0.899997 11.6438 0.362496 11.0938 0.124997Z" fill="#0F417C"/>
                </symbol>
                <symbol id='path-use-stairs' viewBox="0 0 27 22">
                    <path style="fill: currentColor" d="M18 2C18 1.17031 18.6703 0.5 19.5 0.5H25.5C26.3297 0.5 27 1.17031 27 2C27 2.82969 26.3297 3.5 25.5 3.5H21V8C21 8.82969 20.3297 9.5 19.5 9.5H15V14C15 14.8297 14.3297 15.5 13.5 15.5H9V20C9 20.8297 8.32969 21.5 7.5 21.5H1.5C0.670312 21.5 0 20.8297 0 20C0 19.1703 0.670312 18.5 1.5 18.5H6V14C6 13.1703 6.67031 12.5 7.5 12.5H12V8C12 7.17031 12.6703 6.5 13.5 6.5H18V2Z" fill="#0F417C"/>
                </symbol>
                <symbol id='path-walk' viewBox="0 0 320 512">
                    <path style="fill: currentColor" d="M160 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM126.5 199.3c-1 .4-1.9 .8-2.9 1.2l-8 3.5c-16.4 7.3-29 21.2-34.7 38.2l-2.6 7.8c-5.6 16.8-23.7 25.8-40.5 20.2s-25.8-23.7-20.2-40.5l2.6-7.8c11.4-34.1 36.6-61.9 69.4-76.5l8-3.5c20.8-9.2 43.3-14 66.1-14c44.6 0 84.8 26.8 101.9 67.9L281 232.7l21.4 10.7c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L247 287.3c-10.3-5.2-18.4-13.8-22.8-24.5l-9.6-23-19.3 65.5 49.5 54c5.4 5.9 9.2 13 11.2 20.8l23 92.1c4.3 17.1-6.1 34.5-23.3 38.8s-34.5-6.1-38.8-23.3l-22-88.1-70.7-77.1c-14.8-16.1-20.3-38.6-14.7-59.7l16.9-63.5zM68.7 398l25-62.4c2.1 3 4.5 5.8 7 8.6l40.7 44.4-14.5 36.2c-2.4 6-6 11.5-10.6 16.1L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L68.7 398z"/>
                </symbol>
            </svg>
        </slot>
        <!--span class="wf-path-time">{{pathTime}}</span-->
        <div class="wf-path-steps" v-if="showPath2Text">
            <div v-for="(step, index) in steps" :key="index" class="wf-step">
                <svg class="wf-icon" :class='["wf-icon-"+ step.type]' viewbox="0 0 32 32">
                    <use :xlink:href="step.icon"></use>
                </svg>
                <div>
                    <WFTranslate :k="step.translate" :params="[step.value]"></WFTranslate>
                </div>
            </div>
        </div>
        <span>
            <WFTranslate v-if="showDistance" class="wf-path-length" k="path-distance" :params="[path.distance]"></WFTranslate>
            <WFTranslate v-if="showStepCount" class="wf-path-steps" k="path-step-count" :params="[stepCount]"></WFTranslate>
            <label v-if="showTime" class="wf-path-time">{{ timeText }}</label>
        </span>
    </div>
</template>
<script>
import { WFTranslate } from '.';

export default {
	name: "Path2Text",
    props: {
		path: {
			type: Object,
			default: null
		},
        showDistance: {
			type: Boolean,
			default: false
		},
        showTime: {
			type: Boolean,
			default: false
		},
		showPath2Text: {
			type: Boolean,
			default: false
		},
		showStepCount: {
			type: Boolean,
			default: false
		},
    },
    mounted () {
        this.$nextTick(() => {
            this.makePath();
        });
    },
    data: function () {
		return {
            timeText: "",
            steps: null,
            stepCount: 0
        }
    },
    watch: {
		path () {
            this.$nextTick(() => {
                this.makePath();
            })
        }
    },
    methods: {
        makeType (step) {
            return step.walk ? "walk" : (step.turn ? "turn" : (step.use ? "use" : "NA"));
        },
        makeValue (step, type) {
            return step[type];
        },
        makeStep (step) {
            var type =  this.makeType(step);
            var value = this.makeValue(step, type);
            return {
                type: type,
                value: value,
                translate: "path-" + (type == "turn" ? type + "-" + value : type),
                icon: "#path-" + (type === "turn" ? "turn-" + value : (type === 'use'? "use" + value : "walk")),
            }
        },
		makePath () {
            if (this.path) {
				var pathTime = this.path.distance / 1.2;
                
                var minutes = Math.floor(pathTime / 60);
                var seconds = Math.ceil(pathTime - Math.floor(pathTime / 60) * 60);
                this.timeText = this.$wayfinder.translator.get("path-time", [minutes, seconds]);
                this.steps = this.path.steps.map(s => this.makeStep(s));
                this.stepCount = Math.round(this.path.distance / 0.9);

				console.log('watch.path', this.path, pathTime,   this.time, this.stepCount);
			}
        }
    }
}
</script>

<style>
.wf-path {

    .wf-step {
        display: flex;
        align-items: center;
    }

    .wf-icon {
        width: 2em;
        height: 2em;
    }
}
</style>