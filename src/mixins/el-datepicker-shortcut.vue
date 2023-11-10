<script>
import { ref } from 'vue'
export default function datePickerShortcut () {
        const shortcuts = ref([
            {
                text: 'Last week',
                value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                    return [start, end]
                },
            },
            {
                text: 'Last month',
                value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                    return [start, end]
                },
            },
            {
                text: 'Last 3 months',
                value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                    return [start, end]
                },
            },
        ])

        return {
            shortcuts
        }
    
}
</script>