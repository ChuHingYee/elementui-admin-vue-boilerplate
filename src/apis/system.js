import fetch from '@/utils/request';

export const UploadPic = data => {
  return fetch({
    url: '/system/upload',
    method: 'post',
    data: data
  });
};
