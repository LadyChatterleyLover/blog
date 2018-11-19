import Vue from 'vue'
import moment from 'moment'
import com from './common'

const digitsRE = /(\d{3})(?=\d)/g

Vue.filter('dateFormat', function (value, param) {
  if (value) {
    return moment(value).format(param || 'YYYY-MM-DD')
  } else {
    return value
  }
})

Vue.filter('monthAge', function (value) {
  if (value) {
    return com.betweenMonths(new Date(value), new Date())
  } else {
    return 0
  }
})

Vue.filter('percentFormat', function (number, digits) {
  var result
  if (digits === null || digits === undefined) {
    digits = 2
  }
  digits = parseInt(digits)
  if (number === null || number === '' || isNaN(number)) {
    result = '-'
  } else {
    result = Math.round(number * Math.pow(10, digits) * 100) / Math.pow(10, digits) + '%'
  }
  return result
})

Vue.filter('money', function (money) {
  if (!money) return 0
  var intPartFormat = money.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return intPartFormat
})

Vue.filter('byteFormat', function (size) {
  var result
  switch (true) {
    case (size === null || size === '' || isNaN(size)):
      result = '-'
      break
    case (size >= 0 && size < 1024):
      result = size + ' B'
      break
    case (size >= 1024 && size < Math.pow(1024, 2)):
      result = Math.round(size / 1024 * 100) / 100 + ' K'
      break
    case (size >= Math.pow(1024, 2) && size < Math.pow(1024, 3)):
      result = Math.round(size / Math.pow(1024, 2) * 100) / 100 + ' M'
      break
    case (size >= Math.pow(1024, 3) && size < Math.pow(1024, 4)):
      result = Math.round(size / Math.pow(1024, 3) * 100) / 100 + ' G'
      break
    default:
      result = Math.round(size / Math.pow(1024, 4) * 100) / 100 + ' T'
  }
  return result
})

Vue.filter('fourSpace', function (value) {
  if (value) {
    return String(value).replace(/\s/g, '').replace(/(.{4})/g, '$1 ')
  } else {
    return ''
  }
})

Vue.filter('trim', function (value) {
  return String(value).replace(/^\s+|\s+$/gm, '')
  // return String(value).trim()
})

Vue.filter('capitalize', function (value) {
  if (!value && value !== 0) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('uppercase', function (value) {
  return (value || value === 0)
    ? value.toString().toUpperCase()
    : ''
})

Vue.filter('lowercase', function (value) {
  return (value || value === 0)
    ? value.toString().toLowerCase()
    : ''
})

Vue.filter('currency', function (value, currency, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '¥'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
})
