package com.lms.course_service.repository;

import com.lms.course_service.entity.Theme;
import com.lms.course_service.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ThemeRepository extends BaseRepository<Theme> {
    Optional<Theme> findById(Long id);
}
