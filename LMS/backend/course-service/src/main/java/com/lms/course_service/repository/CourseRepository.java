package com.lms.course_service.repository;

import com.lms.course_service.entity.Course;
import com.lms.course_service.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends BaseRepository<Course> {
    List<Course> findAllByModuleId(Long id);
}
