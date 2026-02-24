package com.lms.course_service.service;

import com.lms.course_service.dto.AnswerDto;
import com.lms.course_service.entity.Answer;
import com.lms.course_service.exception.NotFoundException;
import com.lms.course_service.mapper.AnswerMapper;
import com.lms.course_service.repository.AnswerRepository;
import com.lms.course_service.repository.QuestionRepository;
import com.lms.course_service.service.base.CustomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class AnswerService extends CustomService<Answer, AnswerDto> {

    private final AnswerMapper answerMapper;
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;

    public AnswerService(AnswerRepository answerRepository, AnswerMapper answerMapper,
                         QuestionRepository questionRepository) {
        this.answerMapper = answerMapper;
        this.answerRepository = answerRepository;
        super(answerRepository,answerMapper);
        this.questionRepository = questionRepository;
    }

    @Override
    public void update(Long id, AnswerDto answerDto) {

    }

    public void create(Long id, AnswerDto answerDto) {
        Answer answer = Answer.builder()
                .content(answerDto.content())
                .isRight(answerDto.isRight())
                .question(questionRepository.findById(id).orElseThrow(
                        () -> new NotFoundException("Question not found.")))
                .build();

        answerRepository.save(answer);
        log.info("Answer is saved.");
    }
}
