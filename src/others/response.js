 function sendError(res, message, status = 500) {
    res.status(status).json({
        success: false,
        message: message,
    });
}

function sendResponseOk(res, data, status = 200){
    res.status(status).json({
        success: true,
        data: data
    });
}
const MESSAGE ={
    ERROR_SERVIDOR: "Error en el servidor",
    BAD_REQUEST: "bad request",
}
module.exports = {sendError, MESSAGE, sendResponseOk}