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

export function search(form) {
  return request({
    url: '/search',
    method: 'post',
    data: {
      queryString: form.keyword,
      page: form.page,
      rows: form.rows
    }
  })
}
export function addGoods(form) {
  return request({
    url: '/item/add',
    method: 'post',
    data: {
      barcode: form.barcode,
      childcid: form.childcid,
      parcid: form.parcid,
      image: form.image,
      keyword: form.keyword,
      num: form.num,
      status: form.status,
      title: form.title,
      price: form.price
    }
  })
}
export function modifyGoods(form) {
  return request({
    url: '/item/add',
    method: 'post',
    data: {
      barcode: form.barcode,
      childcid: form.childcid,
      parcid: form.parcid,
      image: form.image,
      keyword: form.keyword,
      num: form.num,
      status: form.status,
      title: form.title,
      price: form.price,
      id: form.id
    }
  })
}
export function deleteGoods(form) {
  return request({
    url: '/item/delete',
    method: 'post',
    data: {
      id: form.id
    }
  })
}

export function getGoodsById(id) {
  return request({
    url: '/item/' + id,
    method: 'get'
  })
}
