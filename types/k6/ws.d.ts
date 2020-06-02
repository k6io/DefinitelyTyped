/**
 * Open WebSocket connection.
 * https://k6.io/docs/javascript-api/k6-ws/connect-url-params-callback
 * @param url - Request URL.
 * @param callback - Logic to execute with socket.
 * @returns HTTP response to connection request.
 * @public
 */
export function connect(url: string, callback: Executor): Response;

/**
 * Open WebSocket connection.
 * https://k6.io/docs/javascript-api/k6-ws/connect-url-params-callback
 * @param url - Request URL.
 * @param params - Request parameters.
 * @param callback - Logic to execute with socket.
 * @returns HTTP response to connection request.
 * @public
 */
export function connect(url: string, params: Params | null, callback: Executor): Response;

// === Parameters ===
// ------------------

/**
 * Request parameters.
 * @public
 */
export interface Params {
    /** Request headers. */
    headers?: { [name: string]: string };

    /** Response time metric tags. */
    tags?: { [name: string]: string };
}

/**
 * Socket executor.
 * @public
 */
export interface Executor {
    /** @param socket - The opened socket. */
    (socket: Socket): void;
}

// === Response ===
// ----------------

/**
 * HTTP response to connection request.
 * @public
 */
export interface Response {
    /** Fetched URL. May differ from request URL due to redirects. */
    url: string;

    /** HTTP status code. */
    status: number;

    /** Response headers. */
    headers: { [name: string]: string };

    /** Response body. */
    body: string;

    /** Non-HTTP error message. */
    error: string;
}

// === Socket ===
// --------------

/**
 * Created socket.
 * https://k6.io/docs/javascript-api/k6-ws/socket
 * @public
 */
export abstract class Socket {
    protected __brand: never;

    /**
     * Close connection.
     * https://k6.io/docs/javascript-api/k6-ws/socket/socket-close
     * @param code - WebSocket status code.
     */
    close(code?: number): void;

    /**
     * Listen to event.
     * https://k6.io/docs/javascript-api/k6-ws/socket/socket-on-event-callback
     * @param event - Event type.
     * @param handler - Event handler.
     */
    on<ET extends EventType>(event: ET, handler: EventHandler<ET>): void;

    /**
     * Send ping.
     * https://k6.io/docs/javascript-api/k6-ws/socket/socket-ping
     */
    ping(): void;

    /**
     * Send data.
     * https://k6.io/docs/javascript-api/k6-ws/socket/socket-send-data
     * @param data - Data to send.
     */
    send(data: string): void;

    /**
     * Call a function repeatedly, while the WebSocket connection is open.
     * https://k6.io/docs/javascript-api/k6-ws/socket/socket-setinterval-callback-interval
     * @param handler - The function to call every `interval` milliseconds.
     * @param interval - Milliseconds between two calls to `callback`.
     */
    setInterval(handler: TimerHandler, interval: number): void;

    /**
     * Call a function at a later time,
     * if the WebSocket connection is still open then.
     * https://k6.io/docs/javascript-api/k6-ws/socket/socket-settimeout-callback-delay
     * @param handler - The function to call when `delay` has expired.
     * @param delay - Delay in milliseconds.
     */
    setTimeout(handler: TimerHandler, delay: number): void;
}

/**
 * Event type.
 * @public
 */
export type EventType = 'close' | 'error' | 'message' | 'open' | 'ping' | 'pong';

/**
 * Timer handler.
 * @public
 */
export interface TimerHandler {
    (): void;
}

// === Event handlers ===
// ----------------------

/**
 * Event handler. Signature varies with event type.
 * @public
 */
export type EventHandler<ET extends EventType> = ET extends 'close'
    ? CloseEventHandler
    : ET extends 'error'
    ? ErrorEventHandler
    : ET extends 'message'
    ? MessageEventHandler
    : ET extends 'open'
    ? OpenEventHandler
    : ET extends 'ping'
    ? PingEventHandler
    : ET extends 'pong'
    ? PongEventHandler
    : never;

/**
 * Close event handler.
 * @public
 */
export interface CloseEventHandler {
    /** @param code - WebSocket status code. */
    (code: number): void;
}

/**
 * Error event handler.
 * @public
 */
export interface ErrorEventHandler {
    /** @param error - Error object. */
    (error: WebSocketError): void;
}

/**
 * Message event handler.
 * @public
 */
export interface MessageEventHandler {
    /** @param message - Message. */
    (message: string): void;
}

/**
 * Open event handler.
 * @public
 */
export interface OpenEventHandler {
    (): void;
}

/**
 * Ping event handler.
 * @public
 */
export interface PingEventHandler {
    (): void;
}

/**
 * Pong event handler.
 * @public
 */
export interface PongEventHandler {
    (): void;
}

// === Error ===
// -------------

/**
 * Error.
 * @public
 */
export abstract class WebSocketError {
    protected __brand: never;

    /** Error message. */
    error(): string;
}

/**
 * @namespace k6/ws
 *
 * This module provides a WebSocket client implementing the WebSocket protocol.
 * https://k6.io/docs/javascript-api/k6-ws
 */
declare namespace ws {
    /**
     * Open WebSocket connection.
     * https://k6.io/docs/javascript-api/k6-ws/connect-url-params-callback
     * @param url - Request URL.
     * @param callback - Logic to execute with socket.
     * @returns HTTP response to connection request.
     * @public
     */
    function connect(url: string, callback: Executor): Response;

    /**
     * Open WebSocket connection.
     * https://k6.io/docs/javascript-api/k6-ws/connect-url-params-callback
     * @param url - Request URL.
     * @param params - Request parameters.
     * @param callback - Logic to execute with socket.
     * @returns HTTP response to connection request.
     * @public
     */
    function connect(url: string, params: Params | null, callback: Executor): Response;
}

export default ws;
