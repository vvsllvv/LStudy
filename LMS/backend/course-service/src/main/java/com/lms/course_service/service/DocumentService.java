package com.lms.course_service.service;

import com.lms.course_service.dto.DocumentDto;
import com.lms.course_service.entity.Document;
import com.lms.course_service.entity.Theme;
import com.lms.course_service.exception.DocumentUploadException;
import com.lms.course_service.exception.NotFoundException;
import com.lms.course_service.repository.ThemeRepository;
import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.print.Doc;

@Service
@Slf4j
@RequiredArgsConstructor
public class DocumentService {

    private final MinioClient minioClient;

    private final ThemeRepository themeRepository;

    @Value("${minio.bucket}")
    private String minioBucket;

    @Transactional
    public void uploadDocument(Long id, DocumentDto documentDto) {
        MultipartFile file = documentDto.file();

        log.info("File DTO is empty? {}", documentDto.file());
        log.info("File is empty? {}", file.isEmpty());
        log.info("File name is empty? {}", file.getOriginalFilename());

        Theme theme = themeRepository.findById(id).orElseThrow(() -> new NotFoundException("Theme not found."));

        log.info("Theme is found: {}", theme.getTitle());


        if (file.isEmpty() || file.getOriginalFilename() == null)
            throw new DocumentUploadException("Document can't be empty.");

        String fileName = file.getOriginalFilename();

        try {
            createBucket();
        } catch (Exception e) {
            throw new DocumentUploadException("Document upload failed: " + e.getMessage());
        }

        Document document = Document.builder()
                .title(fileName)
                .theme(theme)
                .path(fileName)
                .build();

        saveDocument(file, fileName);
    }

    @SneakyThrows
    private void createBucket() {
        boolean found = minioClient.bucketExists(BucketExistsArgs.builder()
                .bucket(minioBucket)
                .build());

        log.info("Bucket {} exists? {}", minioBucket, found);

        if (!found) {
            minioClient.makeBucket(MakeBucketArgs.builder()
                    .bucket(minioBucket)
                    .build());
        }
    }

    private void saveDocument(MultipartFile file, String fileName) {
        try {
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(minioBucket)
                            .object(fileName)
                            .stream(file.getInputStream(), file.getSize(), -1)
                            .contentType(file.getContentType())
                            .build());
        }
        catch (Exception e) {
            log.error("Document upload failed: {}", e.getMessage());
            throw new RuntimeException();
        }
    }

}
