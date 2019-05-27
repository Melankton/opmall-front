import request from '@/utils/request'

export function getUserList(curPage, curNum) {
  return request({
    url: '/sso/user/getUserList',
    method: 'post',
    data: {
      curPage,
      curNum
    }
  })
}
export function modifyUser(userInfo) {
  return request({
    url: '/sso/user/modifyUser',
    method: 'post',
    data: {
      id: userInfo.id,
      isadmin: userInfo.isadmin,
      username: userInfo.username,
      email: userInfo.email,
      phone: userInfo.phone,
      password: userInfo.password
    }
  })
}
export function deleteUser(userInfo) {
  return request({
    url: '/sso/user/deleteUser',
    method: 'post',
    data: {
      id: userInfo.id
    }
  })
}
export function addUser(userInfo) {
  return request({
    url: '/sso/user/addUser',
    method: 'post',
    data: {
      isadmin: userInfo.isadmin,
      username: userInfo.username,
      email: userInfo.email,
      phone: userInfo.phone,
      password: userInfo.password
    }
  })
}
export function getUserInfo(userId) {
  return request({
    url: '/sso/user/getUserInfo',
    method: 'post',
    data: {
      userId: userId
    }
  })
}
