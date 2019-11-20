import request from '@/utils/request'

export function getOwnerInfo(data) {
  var data = {
    nstatus: data.nstatus,
    phone: data.phone,
    username: data.username,
    carNo: data.carNo,
    pageNum: data.currentPage,
    pageSize: data.pageSize
  }
  return request({
    url: '/api/getOwnerInfo',
    method: 'post',
    data
  })
}
