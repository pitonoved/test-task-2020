<template>
    <div class="tags-buttons">
        <div v-for="category in categories" :key="category.id">
            <tag-button :category="category" />
        </div>
    </div>
</template>
<script>
import TagButton from './TagButton.vue'
export default {
    components: { 'tag-button': TagButton },
    props: {
        categories: {
            type: Array,
            required: true,
        },
    },
}
</script>
<style lang="scss">
.tags-buttons {
    display: flex;
    flex-wrap: wrap;
}
</style>
