import articleApi from '@/api/article';

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  //-----GET_ARTICLE-----
  getArticleStart: '[article] Get article start',
  getArticleSuccess: '[article] Get article success',
  getArticleFailure: '[article] Get article failure',
  //-----DELETE_ARTICLE-----
  deleteArticleStart: '[article] Get delete start',
  deleteArticleSuccess: '[article] Get delete success',
  deleteArticleFailure: '[article] Get delete failure',
};

export const actionTypes = {
  //-----GET_ARTICLE-----
  getArticle: '[article] Get article',
  //-----DELETE_ARTICLE-----
  deleteArticle: '[article] delete article',
};

const mutations = {
  //-----GET_ARTICLE_MUTATION-----
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false;
  },
  //-----DELETE_ARTICLE_MUTATION-----
  [mutationTypes.deleteArticleStart]() {},
  [mutationTypes.deleteArticleSuccess]() {},
  [mutationTypes.deleteArticleFailure]() {},
};

const actions = {
  //-----GET_ARTICLE_ACTION-----
  [actionTypes.getArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart, slug);
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
  //-----DELETE_ARTICLE_ACTION-----
  [actionTypes.deleteArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.deleteArticleStart, slug);
      articleApi
        .deleteArticle(slug)
        .then(() => {
          context.commit(mutationTypes.deleteArticleSuccess);
          resolve();
        })
        .catch(() => {
          context.commit(mutationTypes.deleteArticleFailure);
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
