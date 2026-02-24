package com.lms.course_service.repository;

import com.lms.course_service.entity.Test;
import com.lms.course_service.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestRepository extends BaseRepository<Test> {
    List<Test> findAllByThemeId(Long id);
}
