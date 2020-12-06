<template>
    <div class="sidebar">
        <h2>Фильтр по рубрикам</h2>
        <tags-cloud :categories="categories" />
        <search-bar />
    </div>
</template>

<script>
import TagsCloud from '@/components/sidebar/TagsCloud'
import SearchBar from './SearchBar.vue'
export default {
    components: {
        'tags-cloud': TagsCloud,
        'search-bar': SearchBar,
    },
    props: {
        categories: {
            type: Array,
            required: true,
        },
    },
}
</script>

<style lang="scss">
.sidebar {
    padding: 30px 30px;
    margin: 0 20px 40px 40px;
    width: 380px;
    min-width: 380px;
    height: 100%;
    background-color: #edf4f8;
    border-radius: 8px;
    position: sticky;
    top: 20px;
    @media (max-width: 960px) {
        width: auto;
        top: 0;
    }
    @media (max-width: 460px) {
        margin: 10px;
        padding: 10px;
        min-width: unset;
    }
}
</style>
<style lang="scss" scoped>
h3 {
    margin-top: 0;
    padding-left: 5px;
}
</style>
