package com.lms.course_service.repository;

import com.lms.course_service.entity.Paragraph;
import com.lms.course_service.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParagraphRepository extends BaseRepository<Paragraph> {
    List<Paragraph> findAllByThemeId(Long id);
}
