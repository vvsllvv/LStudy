FROM gradle:jdk25-alpine AS builder
WORKDIR /app
COPY --chown=gradle:gradle . /app
RUN gradle build -x test --no-daemon

FROM eclipse-temurin:25-jre-alpine
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
COPY --from=builder /app/src/main/resources /app/
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]