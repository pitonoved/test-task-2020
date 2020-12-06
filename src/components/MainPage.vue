<template>
    <div>
        <h1>Книжная подборка</h1>
        <div class="section-main">
            <sidebar :categories="categories" />
            <books-section :categoriesIds="categoriesIds" />
        </div>
    </div>
</template>

<script>
import { api } from '@/api.js'
import TheSidebar from '@/components/sidebar/TheSidebar'
import BooksSection from './content/BooksSection.vue'
export default {
    components: {
        sidebar: TheSidebar,
        'books-section': BooksSection,
    },
    data() {
        return {
            categories: [],
            categoriesIds: [],
        }
    },
    mounted() {
        this.getCategories()
    },
    methods: {
        getCategories() {
            api.post('/book/categories')
                .then(response => {
                    this.categories = response.data.data.list
                    this.collectCategoriesIds()
                })
                .catch(error => console.log(error))
        },
        collectCategoriesIds() {
            this.categories.forEach(category => {
                this.categoriesIds.push(category.id)
            })
        },
    },
}
</script>

<style lang="scss">
.section-main {
    display: flex;
    height: 100%;
    @media (max-width: 960px) {
        flex-direction: column;
    }
}
</style>
<style lang="scss" scoped>
h1 {
    padding: 20px 40px;
}
</style>
