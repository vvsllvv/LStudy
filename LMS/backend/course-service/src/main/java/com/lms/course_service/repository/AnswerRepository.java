package com.lms.course_service.repository;

import com.lms.course_service.dto.AnswerDto;
import com.lms.course_service.entity.Answer;
import com.lms.course_service.repository.base.BaseRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends BaseRepository<Answer> {
}
