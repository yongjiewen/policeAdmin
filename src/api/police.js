import request from '@/utils/request'
const baseURL = "http://192.168.199.185:3002"
export function policeIndex(params) {
  return request({
    url: '/api/getPolice',
    method: 'get',
    params,
    baseURL
  })
}

export function addPolice(data) {
  return request({
    url: '/api/addPolice',
    method: 'post',
    data,
    baseURL
  })
}

export function editPolice(data) {
  return request({
    url: '/api/editPolice',
    method: 'post',
    data,
    baseURL
  })
}

export function delPolice(data) {
  return request({
    url: '/api/delPolice',
    method: 'post',
    data,
    baseURL
  })
}

export function exportExcel(params) {
  return request({
    url: '/api/exportExcel',
    method: 'get',
    params,
    baseURL,
    responseType: 'arraybuffer'
  })
} exportExcel
