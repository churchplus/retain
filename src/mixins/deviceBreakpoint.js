import { onMounted, ref } from "vue"
import breakpoint from "../services/user/deviceWidth.js"

const deviceBreakpoint = () => {
    const xsOnly = ref(breakpoint.only() == 'xsOnly')
    const lgAndUp = ref(breakpoint.up() == 'lgAndUp')
    const xlAndUp = ref(breakpoint.up() == 'xlAndUp')
    const mdAndUp = ref(breakpoint.up() == 'mdAndUp')

    onMounted(() => {
        window.addEventListener("resize", () => {
            lgAndUp.value = breakpoint.up() == 'lgAndUp'
            xlAndUp.value = breakpoint.up() == 'xlAndUp'
            mdAndUp.value = breakpoint.up() == 'mdAndUp'
            xsOnly.value = breakpoint.only() == 'xsOnly'
          });
    })

    return {
        lgAndUp,
        xlAndUp,
        mdAndUp,
        xsOnly
    }
}

export default deviceBreakpoint;