import request from '@/utils/request'

export function getNavList(username, password) {
  return request({
    url: '/api/goods/headerNav',
    method: 'get'
  })
}
export function getGoodsByCatId(goodsCatId, nums, page) {
  return request({
    url: '/api/goods/getGoodsByCatId',
    method: 'POST',
    data: {
      goodsCatId: goodsCatId,
      nums: nums,
      page: page
    }
  })
}
