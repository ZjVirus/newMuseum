
export const getMsg = (state, payload) => {
    state.msg = payload.msg
}
export const setZhantingId = (state, value) => {
    state.zhantingID = value
}
export const setLoggerSn = (state, value) => {
    state.LoggerSn = value
}
export const setPrimaryColor = (state, value) => {
    state.PrimaryColor = value
}
export const setDate = (state, date) => {
    state.loggerDate = date
}
export const setAllZhanting = (state, data) => {
    state.allZhanting = data
}