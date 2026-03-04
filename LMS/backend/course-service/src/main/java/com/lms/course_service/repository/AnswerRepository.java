package com.lms.course_service.repository;

import com.lms.course_service.dto.AnswerDto;
import com.lms.course_service.entity.Answer;
import com.lms.course_service.repository.base.BaseRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnswerRepository extends BaseRepository<Answer> {

//    @Query("SELECT a FROM answers ")
//    Optional<Integer> isCorrectAnswer(@Param("id") Long id);
}
