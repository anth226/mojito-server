export class ErrorHandler extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public errors?: any | undefined
    ) {
        super()
    }
}
