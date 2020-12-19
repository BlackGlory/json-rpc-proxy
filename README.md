# json-rpc-proxy

The helper functions for JSON-RPC 2.0 requests and notifications.

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
function applyRequest<T>(obj: object, request: JsonRpcRequest<T>): JsonRpcSuccess<T> | Promise<JsonRpcSuccess<T>>
```

### applyNotification

```ts
function applyNotification<T>(obj: object, notification: JsonRpcNotification<T>): void | Promise<void>
```
