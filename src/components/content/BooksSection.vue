<template>
    <div class="content" :class="{ 'content_is-loading': isLoading }">
        <div class="books-items">
            <div class="lds-spinner"></div>
            <div
                class="book-container"
                v-for="book in booksWithFilter.slice(0, perPage)"
                :key="book.id"
            >
                <book-item :book="book" />
            </div>
            <button
                v-if="checkButtonStatus"
                class="btn-download-more"
                @click="addBooksToView()"
            >
                Загрузить еще
            </button>
        </div>
    </div>
</template>

<script>
import { api } from '@/api.js'
import BookItem from '@/components/content/BookItem'
export default {
    components: {
        'book-item': BookItem,
    },
    props: {
        categoriesIds: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            books: [],
            perPage: 10,
            buttonStatus: false,
            isLoading: false,
        }
    },
    computed: {
        checkButtonStatus() {
            return (
                this.booksWithFilter.length > 10 &&
                this.booksWithFilter.length >= this.perPage
            )
        },
        booksWithFilter() {
            if (this.$route.query.search == undefined) {
                return this.books
            } else {
                this.resetPerPage()
                let search = String(this.$route.query.search).toLowerCase()
                return this.books.filter(book => {
                    if (
                        String(book.author)
                            .toLowerCase()
                            .includes(search)
                    ) {
                        return true
                    } else if (
                        String(book.name)
                            .toLowerCase()
                            .includes(search)
                    ) {
                        return true
                    } else if (
                        String(book.description)
                            .toLowerCase()
                            .includes(search)
                    ) {
                        return true
                    } else if (
                        String(book.id)
                            .toLowerCase()
                            .includes(search)
                    ) {
                        return true
                    } else if (
                        String(book.year)
                            .toLowerCase()
                            .includes(search)
                    ) {
                        return true
                    }
                })
            }
        },
    },
    mounted() {
        this.getBooks()
    },
    watch: {
        $route(to, from) {
            if (
                JSON.stringify(to.query.categories) !==
                JSON.stringify(from.query.categories)
            ) {
                this.getBooks()
            }
        },
    },
    methods: {
        getBooks() {
            this.books = []
            if (
                this.$route.query.categories !== undefined &&
                this.$route.query.categories.length > 0
            ) {
                let categories = this.normalizeQueryForRequest(
                    this.$route.query.categories
                )

                this.requestToServer(categories)
            } else {
                this.requestToServer(this.categoriesIds)
            }
        },
        async requestToServer(categories) {
            let params = {
                categories: categories,
                page: 1,
            }
            let pagesEnded = false
            while (!pagesEnded) {
                await api
                    .post('/book/list', params)
                    .then(response => {
                        if (response.data.data.next) {
                            this.isLoading = true
                            params.page++
                            this.books.push(...response.data.data.list)
                        } else {
                            this.books.push(...response.data.data.list)
                            pagesEnded = true
                            this.isLoading = false
                        }
                    })
                    .catch(error => console.log(error))
            }
        },
        normalizeQueryForRequest(query) {
            let queryNormalized = []
            if (typeof query == 'string') {
                let queryHowNumber = Number.parseInt(query)
                queryNormalized.push(queryHowNumber)
            } else if (typeof query == 'object') {
                let queryHowNumbers = query.map(function(item) {
                    return Number.parseInt(item)
                })
                queryNormalized.push(...queryHowNumbers)
            }
            return queryNormalized
        },
        addBooksToView() {
            this.perPage += 10
        },
        resetPerPage() {
            this.perPage = 10
        },
    },
}
</script>

<style lang="scss">
.content {
    width: 100%;
    padding-left: 20px;
    &_is-loading {
        opacity: 0.3;
    }
    @media (max-width: 460px) {
        padding-left: 0;
    }
}
.books-items {
    display: flex;
    flex-wrap: wrap;
}
.book-container {
    flex: 33%;
    max-width: 33%;
    @media (max-width: 1950px) {
        flex: 50%;
        max-width: 50%;
    }
    @media (max-width: 1430px) {
        flex: 100%;
        max-width: 100%;
    }
}
.btn-download-more {
    display: inline-block;
    width: 100%;
    color: #507cbe;
    background: white;
    font-weight: 700;
    padding: 15px 20px;
    margin: 20px 20px 40px 20px;
    outline: none;
    border: 3px solid;
    border-radius: 8px;
    transition: 0.2s;
    &:hover {
        background: #edf4f8;
    }
    &:active {
        color: rgb(25, 119, 45);
    }
}
</style>
