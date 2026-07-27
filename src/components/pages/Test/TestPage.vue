<template>
  <section class="scrollSection">
    <div ref="root" class="card">
      <slot></slot>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import anime from "animejs";
import { onIntersect } from "../composables/onIntersect";
import transitions from "./trans";

export default {
  props: {
    transition: {
      type: String,
      default: "fade",
    },
  },
  setup(props) {
    let hasEnteredOnce = false;

    const _ = {
      observer: {},
      motion: {},
    };

    const root = ref(null);

    const animeTransition = transitions[`${props.transition}`]["in"];

    onMounted(() => {
      // init our Observer instance
      _.observer = onIntersect(root.value, onEnter, {
        outCallback: onExit,
        once: false,
        options: {
          threshold: 0.1,
        },
      });

      // init our anime object.
      _.motion = anime({
        targets: root.value,
        // by default animejs will run the transition on load.
        autoplay: false,
        duration: 1500,
        easing: "easeOutExpo",
        // here we spread in our custom transition properties
        // based on the transition prop provided.
        ...animeTransition,
      });
    });

    onUnmounted(() => {
      _.observer.disconnect();
    });

    const onEnter = () => {
      if (hasEnteredOnce) {
        // clean up from the exit transition
        _.motion.pause(); // if the exit transition is currently running, pause it.
        _.motion.reverse(); // change the direction back to the original
      }
      _.motion.play(); // run the transition

      if (!hasEnteredOnce) {
        // allow exit transitions to run.
        hasEnteredOnce = true;
      }
    };

    const onExit = () => {
      // keeps exit transition from running before the first entrance.
      if (hasEnteredOnce) {
        _.motion.pause(); // if the enter transition is currently running, pause it.
        _.motion.reverse(); // change the direction of the transition
        _.motion.play(); // run the new reversed transition.
      }
    };

    return {
      root,
    };
  },
};
</script>

<style>
.scrollSection {
  display: grid;
  height: 100vh;
  place-items: center;
  width: 100vw;
}
.card {
  align-items: center;
  background: #fff;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
  border-radius: 25px;
  display: inline-flex;
  flex-direction: column;
  height: 300px;
  justify-content: center;
  margin: 0 auto 45px;
  max-height: 20vw;
  max-width: 40vw;
  padding: 60px 60px;
  width: 300px;
}
</style>
