package com.lms.course_service.service;

import com.lms.course_service.dto.QuestionDto;
import com.lms.course_service.entity.Answer;
import com.lms.course_service.entity.Question;
import com.lms.course_service.exception.NotFoundException;
import com.lms.course_service.mapper.AnswerMapper;
import com.lms.course_service.mapper.QuestionMapper;
import com.lms.course_service.repository.QuestionRepository;
import com.lms.course_service.repository.TestRepository;
import com.lms.course_service.service.base.CustomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class QuestionService extends CustomService<Question, QuestionDto> {

    private final QuestionMapper questionMapper;
    private final QuestionRepository questionRepository;
    private final TestRepository testRepository;
    private final AnswerMapper answerMapper;
    private final AnswerService answerService;


    public QuestionService(QuestionRepository questionRepository, QuestionMapper questionMapper,
                           TestRepository testRepository, AnswerMapper answerMapper, AnswerService answerService) {
        super(questionRepository, questionMapper);
        this.questionMapper = questionMapper;
        this.questionRepository = questionRepository;
        this.testRepository = testRepository;
        this.answerMapper = answerMapper;
        this.answerService = answerService;
    }

    public void create(Long id, QuestionDto questionDto) {
        Question question = Question.builder()
                .description(questionDto.description())
                .method(questionDto.method())
                .test(testRepository.findById(id).orElseThrow(() -> new NotFoundException("Object not found.")))
                .build();

        questionRepository.save(question);
        log.info("Question is created.");

        questionDto.answer().forEach(a -> answerService.create(question.getId(), a));
    }

    @Override
    public void update(Long id, QuestionDto questionDto) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Object not found."));

        if (questionDto.description() != null)
            question.setDescription(questionDto.description());

        if (questionDto.method() != null)
            question.setMethod(questionDto.method());

        if (questionDto.answer() != null) {
            List<Answer> newAnswers = answerMapper.toEntity(questionDto.answer());
            question.getAnswer().addAll(newAnswers);
        }

        questionRepository.save(question);
        log.info("Question is updated.");
    }

    public List<QuestionDto> readAllById(Long id) {
        List<Question> allTests = questionRepository.findAllByTestId(id);
        return allTests.stream().map(o -> questionMapper.toDto(o)).collect(Collectors.toList());
    }
}
