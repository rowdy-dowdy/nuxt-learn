export default defineNuxtPlugin( nuxtApp => {
  nuxtApp.vueApp.directive("click-outside", {
    // beforeMount: function (el, binding, vnode) {
    //   el.clickOutsideEvent = function (event) {
    //     el.clickOutsideEvent = (evt) => {
    //       evt.stopPropagation();
    //       if (!(el === evt.target || el.contains(evt.target))) {
    //         binding.value(evt, el);
    //       }
    //     };
    //     // Wait 1 frame otherwise a potential click that mounted the element will immediately trigger a click-outside event:
    //     window.requestAnimationFrame(() => {
    //       document.addEventListener("click", el.clickOutsideEvent);
    //     });
    //   };
    //   document.body.addEventListener("click", el.clickOutsideEvent);
    // },
    // unmounted: function (el) {
    //   document.body.removeEventListener("click", el.clickOutsideEvent);
    // },
    mounted(el, binding, vnode) {
      el.clickOutsideEvent = function(event) {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(event, el);
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
      document.body.removeEventListener('click', el.clickOutsideEvent);
    }
    
  })
});