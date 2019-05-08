import fetch from '@/utils/request';

export const GetBrandList = data => {
  return fetch({
    url: '/brand/pagelist',
    method: 'post',
    data: data
  });
};
