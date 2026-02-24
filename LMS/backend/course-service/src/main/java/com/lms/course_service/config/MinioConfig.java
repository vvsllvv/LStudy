package com.lms.course_service.config;

import io.minio.MinioClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class MinioConfig {
    @Value("${minio.access-key}")
    private String minioAccessKey;

    @Value("${minio.secret-key}")
    private String minioSecretKey;

    @Value("${minio.url}")
    private String minioUrl;

    @Bean
    public MinioClient minioClient() {
        try {
            MinioClient minioClient = MinioClient.builder()
                    .endpoint(minioUrl)
                    .credentials(minioAccessKey, minioSecretKey)
                    .build();
            log.info("MinioClient successfully initialized.");
            return minioClient;
        } catch (Exception e) {
            log.error("Error: {}", e.getMessage());
            throw new RuntimeException("MinioClient initialization failed.");
        }
    }
}
