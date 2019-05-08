import fetch from '@/utils/request';

export const GetTableList = data => {
  return fetch({
    url: '/table/list',
    method: 'post',
    data: data
  });
};

export const EditTable = data => {
  return fetch({
    url: '/table/edit',
    method: 'post',
    data: data
  });
};

export const DelTable = data => {
  return fetch({
    url: '/table/del',
    method: 'post',
    data: data
  });
};

export const GetSelect = data => {
  return fetch(
    {
      url: '/table/select',
      method: 'post',
      data: data
    },
    false
  );
};
