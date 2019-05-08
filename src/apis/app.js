import fetch from '@/utils/request';

export const LoginSevice = data => {
  return fetch({
    url: '/user/login',
    method: 'post',
    data: data
  });
};

export const logoutSevice = data => {
  return fetch(
    {
      url: '/user/logout',
      method: 'post',
      data: data
    },
    false
  );
};

export const GetRoutes = data => {
  return fetch({
    url: '/user/routes',
    method: 'post',
    data: data
  });
};
