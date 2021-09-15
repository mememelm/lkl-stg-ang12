export function buildParams(params: Array<[string, string]>): string {
  let r = ''
  if (params === null) {
    return r
  }
  for (let i = 0, len = params.length; i < len; i++) {
    if (i === 0) {
      r = '?'
    }
    r += params[i][0] + '=' + params[i][1]
    if (i !== len - 1) {
      r += '&'
    }
  }
  return r
}
