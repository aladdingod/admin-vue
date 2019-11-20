import request from '@/utils/request'

export function login(data) {
  var data = {
    username: 'admin',
    password: 'admin'
  }
  return request({
    url: '/api/users/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  var data = {
    token: token
  }
  return request({
    url: '/api/users/info',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/users/logout',
    method: 'post'
  })
}
