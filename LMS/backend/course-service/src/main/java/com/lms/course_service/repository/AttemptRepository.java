package com.lms.course_service.repository;

import com.lms.course_service.entity.Attempt;
import com.lms.course_service.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttemptRepository extends BaseRepository<Attempt> {
    List<Attempt> findAllByUserId(Long id);
}
