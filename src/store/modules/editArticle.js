import articleApi from '@/api/article';

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null,
};

export const mutationTypes = {
  //-----UPDATE_ARTICLE-----
  updateArticleStart: '[editArticle] Update article start',
  updateArticleSuccess: '[editArticle] Update article success',
  updateArticleFailure: '[editArticle] Update article failure',
  //-----GET_ARTICLE-----
  getArticleStart: '[editArticle] Get article start',
  getArticleSuccess: '[editArticle] Get article success',
  getArticleFailure: '[editArticle] Get article failure',
};

export const actionTypes = {
  //-----UPDATE_ARTICLE-----
  updateArticle: '[editArticle] Create article',
  //-----GET_ARTICLE-----
  getArticle: '[editArticle] Get article',
};

const mutations = {
  //-----UPDATE_ARTICLE_MUTATION-----
  [mutationTypes.updateArticleStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.updateArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.updateArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  //-----GET_ARTICLE_MUTATION-----
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.article = payload;
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  //-----UPDATE_ARTICLE_ACTION-----
  [actionTypes.updateArticle](context, {slug, articleInput}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.updateArticleStart);
      articleApi
        .updateArticle(slug, articleInput)
        .then((article) => {
          context.commit(mutationTypes.updateArticleSuccess, article);
          resolve(article);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.updateArticleFailure,
            result.response.data.errors
          );
        });
    });
  },
  //-----GET_ARTICLE_ACTION-----
  [actionTypes.getArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart);
      articleApi
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationTypes.getArticleSuccess, article);
          resolve(article);
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailure);
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
