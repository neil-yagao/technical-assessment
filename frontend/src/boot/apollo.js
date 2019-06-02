import apolloClient from './apollo-client'

export default async ({ Vue }) => {
  Vue.prototype.$apollo = apolloClient;
};
