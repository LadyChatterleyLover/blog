export default {
  input: [
    { required: true, message: '请输入' }
  ],
  select: [
    { required: true, message: '请选择' }
  ],
  money: [
    { required: true, message: '请输入金额' },
    { pattern: /^\d+(\.\d+)?$/, message: '请输入合理的金额' }
  ]
}
