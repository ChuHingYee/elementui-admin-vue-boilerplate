import fetch from '@/utils/request';

export const GetTreeList = data => {
  return fetch({
    url: '/tree/list',
    method: 'post',
    data: data
  });
};
