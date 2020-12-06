<template>
    <div class="book-card">
        <div class="book-card__image">
            <img :src="book.image" />
        </div>
        <div class="book-card__body">
            <div class="book-card__name">
                <h2 v-html="toHighlight(book.name)"></h2>
            </div>
            <div class="book-card__description">
                <p v-html="toHighlight(book.description)"></p>
            </div>
            <div class="book-card__footer">
                <a v-html="toHighlight(book.author)"></a>,
                <a v-html="toHighlight(book.year)"></a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        book: {
            type: Object,
            required: true,
        },
    },
    computed: {},
    methods: {
        toHighlight(text) {
            if (this.$route.query.search !== undefined) {
                let sought = new RegExp(this.$route.query.search, 'gi')
                return text.replace(sought, `<highlight>$&</highlight>`)
            } else {
                return text
            }
        },
    },
}
</script>
<style lang="scss">
.book-card {
    margin: 20px;
    margin-top: 0;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    display: flex;

    &__image {
        padding-right: 10px;
        height: 300px;
        img {
            width: 200px;
            height: 100%;
            object-fit: cover;
            border-radius: 8px 0px 0px 8px;
            @media (max-width: 460px) {
                border-radius: unset;
                object-fit: contain;
                width: 100%;
            }
        }
    }

    &__body {
        display: flex;
        flex-direction: column;
        padding: 0 10px;
    }

    &__name {
        color: #333;
    }

    &__description {
        color: #999;
        -webkit-line-clamp: 7;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;

        &:hover {
            -webkit-line-clamp: unset;
        }
    }
    &__footer {
        margin-top: auto;
        padding-top: 20px;
        padding-bottom: 20px;
        color: #777;
    }
    highlight {
        background-color: rgba(238, 191, 130, 0.562);
    }
    @media (max-width: 460px) {
        flex-direction: column-reverse;
        margin: 10px;
    }
}
</style>
