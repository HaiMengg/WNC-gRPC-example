# WNC-gRPC-example
## Running the server
```powershell
cd client
npm start
```
## Running the client
```powershell
cd server
npm start
```
## Adding gRPC methods
Read this guide for adding new object and method to the proto files: https://grpc.io/docs/what-is-grpc/introduction/.

After finishing modifying the proto files, do (in both **client** and **server** directories):
```powershell
npm run proto:gen
```