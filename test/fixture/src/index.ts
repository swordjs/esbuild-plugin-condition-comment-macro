// @ifdef server || woker || aliyun
const test = 1
// @endif
// @ifdef aliyun
const a = 1
// @endif
// @ifndef aliyun || server
const b = 1
// @endif