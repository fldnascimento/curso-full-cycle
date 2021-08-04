FROM golang AS builder

WORKDIR /go/src/codeeducation

RUN apt-get update && apt-get install -y upx

COPY main.go .

RUN go build -ldflags '-w -s' main.go && \
    upx --best --lzma main

FROM scratch
COPY --from=builder /go/src/codeeducation .
CMD ["/main"]