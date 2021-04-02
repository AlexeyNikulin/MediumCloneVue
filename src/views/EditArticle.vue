<template>
    <div>
        <mcv-loading v-if="isLoading" />
        <mcv-article-form
            v-if="initialValues"
            :initial-values="initialValues"
            :errors="validationErrors"
            :is-submitting="isSubmitting"
            @articleSubmit="onSubmit"
        />
    </div>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm'
import McvLoading from '@/components/Loading'
import { mapState } from 'vuex'
import {actionTypes} from '@/store/modules/editArticle'

export default {
    name: 'McvEditArticle',
    components: {
        McvArticleForm,
        McvLoading,
    },
    data() {
        return {
            initialValues: null
        }
    },
    computed: {
        ...mapState({
            validationErrors: state => state.editArticle.validationErrors,
            isSubmitting: state => state.editArticle.isSubmitting,
            isLoading: state => state.editArticle.isLoading,
            article: state => state.editArticle.article,
        }),
    },
    mounted() {
        this.$store.dispatch(actionTypes.getArticle, {
            slug: this.$route.params.slug
        }).then(article => {
            this.initialValues = {
                title: article.title,
                description: article.description,
                body: article.body,
                tagList: article.tagList,
            }
        })
    },
    methods: {
        onSubmit(articleInput) {
            const slug = this.$route.params.slug
            this.$store.dispatch(actionTypes.updateArticle, {slug, articleInput})
                .then(article => {
                    this.$router.push({name: 'article', params: {slug: article.slug}})
                })
        }
    }
}
</script>