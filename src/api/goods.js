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
    url: '/item/modifyGoods',
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

export function getHisAdd(userId) {
  return request({
    url: '/order/getHisAdd',
    method: 'post',
    data: {
      userId: userId
    }
  })
}

export function setOrder(total_count, orderNum, addForm, cart, userId) {
  return request({
    url: '/order/setOrder',
    method: 'post',
    data: {
      userId: userId,
      total_count: total_count,
      orderNum: orderNum,
      addForm: addForm,
      cart: cart
    }
  })
}
export function createPayUrl(total_amount, out_trade_no) {
  return request({
    url: '/order/createPayUrl',
    method: 'post',
    data: {
      total_amount: total_amount,
      out_trade_no: out_trade_no,
      subject: 'Opmall在线商城'
    }
  })
}
// export function createPay(url, total_amount, out_trade_no) {
//   return request({
//     url: url,
//     method: 'post',
//     data: {
//       total_amount: total_amount,
//       out_trade_no: out_trade_no,
//       subject: 'Opmall在线商城'
//     }
//   })
// }

export function queryOrder(orderNum) {
  return request({
    url: '/pay/queryOrder',
    method: 'post',
    data: {
      orderNum: orderNum
    }
  })
}

export function getUserOrder(userId, page, rows, orderStatus) {
  return request({
    url: '/order/getUserOrder',
    method: 'post',
    data: {
      userId: userId,
      page: page,
      rows: rows,
      orderStatus: orderStatus
    }
  })
}

export function getOrderItem(orderId) {
  return request({
    url: '/order/getOrderItem',
    method: 'post',
    data: {
      orderId: orderId
    }
  })
}

export function getOrderAdd(orderId) {
  return request({
    url: '/order/getOrderAdd',
    method: 'post',
    data: {
      orderId: orderId
    }
  })
}

