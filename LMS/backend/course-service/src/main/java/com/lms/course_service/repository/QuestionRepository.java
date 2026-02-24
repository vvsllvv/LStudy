package com.lms.course_service.repository;

import com.lms.course_service.entity.Question;
import com.lms.course_service.repository.base.BaseRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends BaseRepository<Question> {
    List<Question> findAllByTestId(Long id);
}
