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
export function upload(params) {
  return request({
    url: '/image',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: params
  })
}
export function deleteCat(form) {
  return request({
    url: '/api/goodsCat/deleteCat',
    method: 'post',
    data: {
      id: form.id
    }
  })
}

export function modifyCat(form) {
  return request({
    url: '/api/goodsCat/modifyCat',
    method: 'post',
    data: {
      id: form.id,
      text: form.text
    }
  })
}
