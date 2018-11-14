
exports.paramsConstructor = function (info) {
 // [info.date, info.issuer,info.receiver,info.subject]
 return [info.date, info.issuer,info.receiver,info.subject];
}