import fetch from '@/utils/request';

export const GetRouterList = data => {
  return fetch({
    url: '/router/list',
    method: 'post',
    data: data
  });
};
