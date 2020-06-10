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
function createRequestProxy<T extends object, U extends Json | StructuredClone = Json>(target: T, createId: () => string): RequestProxy<T, U>
```

### createNotificationProxy

```ts
function createNotificationProxy<T extends object, U extends Json | StructuredClone = Json>(target: T): NotificationProxy<T, U>
```

### applyRequest

```ts
function applyRequest<T extends Json | StructuredClone>(obj: object, request: JsonRpcRequest<T>): JsonRpcSuccess<T> | Promise<JsonRpcSuccess<T>>
```

### applyNotification

```ts
function applyNotification<T extends Json | StructuredClone>(obj: object, notification: JsonRpcNotification<T>): void | Promise<void>
```
