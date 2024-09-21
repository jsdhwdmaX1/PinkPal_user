
import service from "@/utils/http"

export function getCategoryAPI () {
  return service({
    url: '/get-category'
  })
}