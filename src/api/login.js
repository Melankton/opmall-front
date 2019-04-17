import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/sso/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// 检查用户名是否存在
export function register(userForm) {
  return request({
    url: '/sso/user/register',
    method: 'post',
    data: {
      username: userForm.username,
      password: userForm.password,
      email: userForm.email,
      phone: userForm.phone
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/sso/user/info/' + token,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
