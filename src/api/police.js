import request from '@/utils/request'

export function policeIndex (data) {
  return request({
    url: '/dog/t.json',
    method: 'get',
    data,
    baseURL: "http://api.test"
  })
}
