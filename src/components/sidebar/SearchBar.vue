<template>
    <div class="search__container">
        <input
            class="search__input"
            type="text"
            placeholder="Поиск"
            v-model="search"
            @input="setSearchQuery()"
        />
    </div>
</template>
<script>
export default {
    data() {
        return {
            search: '',
        }
    },
    mounted() {
        if (this.$route.query.search !== undefined) {
            this.search = this.$route.query.search
        }
    },
    methods: {
        setSearchQuery() {
            this.$router.replace({
                path: '',
                query: {
                    ...this.$route.query,
                    search: this.search,
                },
            })
        },
    },
}
</script>
<style lang="scss">
.search {
    &__container {
        padding-top: 10px;
    }
    &__input {
        width: 100%;
        padding: 8px 14px;
        margin: 0 5px;

        background-color: transparent;
        transition: transform 250ms ease-in-out;
        font-size: 14px;
        line-height: 18px;

        color: #1b1b1b;
        background-color: transparent;
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: 18px 18px;
        background-position: 95% center;
        border-radius: 8px;
        border: 1px solid #999;
        transition: all 250ms ease-in-out;
        backface-visibility: hidden;
        transform-style: preserve-3d;

        &::placeholder {
            color: #57575694;
        }

        &:hover,
        &:focus {
            padding: 12px 0;
            outline: 0;
            border: 1px solid transparent;
            border-bottom: 1px solid #575756;
            border-radius: 0;
            background-position: 100% center;
        }
    }
}
</style>
