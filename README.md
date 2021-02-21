# json-rpc-proxy

The helper functions for JSON-RPC 2.0 requests and notifications.

**The module does not check types, nor convert unsupported types (e.g., `undefined` to `null`). This is to allow JSON-RPC to support as many types and protocols as possible.**

## Install

```sh
npm install --save json-rpc-proxy
# or
yarn add json-rpc-proxy
```

## API

### createRequestProxy

```ts
function createRequestProxy<T extends object, U = unknown>(createId: () => string): RequestProxy<T, U>
```

### createNotificationProxy

```ts
function createNotificationProxy<T extends object, U = unknown>(): NotificationProxy<T, U>
```

### applyRequest

```ts
function applyRequest<T>(callables: object, request: JsonRpcRequest<T>): Promise<JsonRpcResponse<T>>
```

### applyNotification

```ts
function applyNotification<T>(callables: object, notification: JsonRpcNotification<T>): Promise<void>
```
