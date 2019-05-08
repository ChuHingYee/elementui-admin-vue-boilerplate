import fetch from '@/utils/request';

export const GetArticledetail = data => {
  return fetch({
    url: '/article/detail',
    method: 'post',
    data: data
  });
};
