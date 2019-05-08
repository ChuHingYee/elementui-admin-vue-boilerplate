import fetch from '@/utils/request';

export const GetChartDetail = data => {
  return fetch({
    url: '/chart/detail',
    method: 'post',
    data: data
  });
};

export const GetChartPieOne = data => {
  return fetch({
    url: '/chart/pie',
    method: 'post',
    data: data
  });
};

export const GetChartPieTwo = data => {
  return fetch({
    url: '/chart/pie',
    method: 'post',
    data: data
  });
};

export const GetChartPieThree = data => {
  return fetch({
    url: '/chart/pie',
    method: 'post',
    data: data
  });
};

export const GetHomeHeader = data => {
  return fetch({
    url: '/chart/homeHeader',
    method: 'post',
    data: data
  });
};
