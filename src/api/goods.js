import request from '@/utils/request'

export function getGoodsList(curPage, curNum) {
  return request({
    url: '/api/goods/GoodsList',
    method: 'post',
    data: {
      curPage,
      curNum
    }
  })
}
