<template>
    <label class="tag">
        <input
            class="tag__input"
            type="checkbox"
            :id="category.id"
            v-model="checked"
            @click="buttonPressed()"
        />
        <span class="tag__name">{{ category.name }}</span>
    </label>
</template>
<script>
export default {
    props: {
        category: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            categoryId: null,
            checked: false,
        }
    },
    mounted() {
        this.categoryId = String(this.category.id)
        this.checkButtonStatus()
    },
    methods: {
        checkButtonStatus() {
            let oldQuery = this.$route.query
            if (typeof oldQuery.categories == 'string') {
                if (oldQuery.categories == this.categoryId) {
                    this.checked = true
                } else {
                    this.checked = false
                }
            } else if (typeof oldQuery.categories == 'object') {
                if (oldQuery.categories.includes(this.categoryId)) {
                    this.checked = true
                } else {
                    this.checked = false
                }
            }
        },
        buttonPressed() {
            if (this.$route.query.categories == undefined) {
                this.createCategoryQuery()
            } else {
                this.checkForExisting()
            }
        },
        createCategoryQuery() {
            this.$router.replace({
                query: {
                    ...this.$route.query,
                    categories: this.category.id,
                },
            })
        },
        checkForExisting() {
            let oldQuery = JSON.parse(JSON.stringify(this.$route.query))
            let categoryQuery = [this.categoryId]
            if (typeof oldQuery.categories == 'string') {
                if (oldQuery.categories !== this.categoryId) {
                    categoryQuery.unshift(oldQuery.categories)
                } else {
                    categoryQuery = []
                }
            } else if (typeof oldQuery.categories == 'object') {
                if (oldQuery.categories.includes(this.categoryId)) {
                    oldQuery.categories.splice(
                        oldQuery.categories.indexOf(this.categoryId),
                        1
                    )
                    categoryQuery = oldQuery.categories
                } else {
                    categoryQuery.unshift(...oldQuery.categories)
                }
            }
            this.changeCategoryToUrl(categoryQuery)
        },
        changeCategoryToUrl(categoryQuery) {
            this.$router.push({
                path: '',
                query: {
                    ...this.$route.query,
                    categories: categoryQuery,
                },
            })
        },
    },
}
</script>
<style lang="scss">
.tag {
    display: inline-block;
    margin: 5px;
    user-select: none;
    position: relative;

    &__input {
        z-index: -1;
        opacity: 0;
        display: block;
        width: 0;
        height: 0;
        &:checked + span {
            background: #b1e4a7;
        }
    }

    &__name {
        display: inline-block;
        cursor: pointer;
        padding: 0px 10px;
        line-height: 30px;
        border: 1px solid #999;
        border-radius: 8px;
        &:hover {
            border: 1px solid #16500b;
        }
    }
}
</style>
