import request from '@/utils/http'

export const RegisterStore = ({name,address,ownerName,ownerPhone,ownerEmail,ownerIdCard}) => {
  return request({
    url: '/add-pendingStore',
    method: 'POST',
    data: {
        name,
        address,
        ownerName,
        ownerPhone,
        ownerEmail,
        ownerIdCard
    }
  })
}