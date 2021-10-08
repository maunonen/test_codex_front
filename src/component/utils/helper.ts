export type ColorType = "error" | "warning" | "info" | "success"

export type ErrorMessageObjectType = {
    message : string
    messageType : ColorType | undefined
}

export const showMessage = (message: string, showTime: number, messageType: ColorType, setError : Function) => {
    let messageObject : ErrorMessageObjectType = {
        message , messageType
    };
    setError(messageObject);
    setTimeout(() => {
        setError(undefined);
    }, showTime)
}