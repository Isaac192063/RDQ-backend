 function sendError(res, message, status) {
    res.status(status).json({
        success: false,
        message: message,
    });
}
const MESSAGE ={
    ERROR_SERVIDOR: "Error en el servidor",
    BAD_REQUEST: "bad request",
}
module.exports = {sendError, MESSAGE}